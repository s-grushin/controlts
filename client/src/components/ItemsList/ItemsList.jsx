import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ItemsTable from './ItemsTable'
import useHttp from '../../hooks/useHttp'
import Spinner from '../Spinner'
import Topbar from './Topbar'
import Pagination from '../Pagination'
import ConfirmModal from '../ConfirmModal'
import { STORAGE_KEYS } from '../../constants/appConstants'

const itemsQtyOnPage = 20


//fetchUrl - [required] - backend path
//path -     [required] - frontend path
//fields -   [required] - field to visualize
//presentationField - field which presentate item
//oneToMany - needed for oneToManys.
const ItemsList = ({
    fetchUrl,
    path,
    fields,
    presentationField,
    relationType,
    fkName,
    setSelectedOneId,
    selectedOneId,
    showButtonBack }) => {

    const { request, loading } = useHttp()
    const [items, setItems] = useState([])
    const [selectedItemId, setSelectedItemId] = useState(null)
    const [currentPage, setCurrentPage] = useState(() => parseInt(localStorage.getItem(STORAGE_KEYS.catalogPage)) || 1)
    const [itemsQtyAll, setItemsQtyAll] = useState(0) // quantity of all rows in db table
    const [showModal, setShowModal] = useState(false)

    const navigate = useNavigate()

    const selectRowHandler = useCallback((id) => {
        setSelectedItemId(id)

        if (relationType === 'one') {
            localStorage.setItem(STORAGE_KEYS.catalogSelectedRowId, id)
            setSelectedOneId(id)
        }

        if (relationType === null) {
            localStorage.setItem(STORAGE_KEYS.catalogSelectedRowId, id)
        }

    }, [relationType, setSelectedOneId])

    const setCurrentPageHandler = useCallback((currPage) => {
        localStorage.setItem(STORAGE_KEYS.catalogPage, currPage)
        setCurrentPage(currPage)
    }, [])

    // back
    const backHandler = () => {
        navigate(-1)
    }

    // create
    const createHandler = () => {
        const link = `${path}/create${relationType === 'many' ? `?${fkName}=${selectedOneId}` : ''}`
        navigate(link)
    }

    // edit
    const editHandler = () => {
        navigate(`${path}/${selectedItemId}`)
    }

    // delete
    const deleteHandler = () => {
        setShowModal(true)
    }

    // close modal
    const closeModalHandler = async (action) => {
        if (action === 'cancel') {
            return setShowModal(false)
        }

        if (action === 'ok') {
            const res = await request(fetchUrl, 'delete', { id: selectedItemId })
            if (res) {
                //deleted successfully
                setShowModal(false)
                setItems(items.filter(item => item.id !== selectedItemId))
                setSelectedItemId(null)
            }
        }
    }

    useEffect(() => {
        const fetchItems = async () => {

            if (relationType === 'many' && !selectedOneId) {
                return
            }

            let cachedId
            if (relationType === null || relationType === 'one') {
                cachedId = parseInt(localStorage.getItem(STORAGE_KEYS.catalogSelectedRowId))
            }

            if (cachedId) {
                selectRowHandler(cachedId)
            }


            const limit = itemsQtyOnPage
            const offset = currentPage * itemsQtyOnPage - itemsQtyOnPage
            //fkfilter used only for oneToMany (one to many visualization)
            const fkfilter = fkName ? `${fkName}=${selectedOneId}` : ''
            const data = await request(`${fetchUrl}/?${fkfilter}&limit=${limit}&offset=${offset}`, 'get', {})
            setItems(data.rows)
            setItemsQtyAll(data.count)

        }

        fetchItems()

    }, [request, fetchUrl, currentPage, fkName, relationType, selectedOneId, selectRowHandler])

    const getSelecteditemName = () => {
        if (selectedItemId) {
            const item = items.find(item => item.id === selectedItemId)
            if (item) return item[presentationField]
        }
    }

    const paginationOptions = useMemo(() => ({ currentPage, setCurrentPage: setCurrentPageHandler, itemsQtyAll, itemsQtyOnPage }), [currentPage, itemsQtyAll, setCurrentPageHandler])

    if (loading) return <Spinner />

    return (
        <>
            <Topbar
                itemSelected={!!selectedItemId}
                backHandler={backHandler}
                createHandler={createHandler}
                editHandler={editHandler}
                deleteHandler={deleteHandler}
                showButtonBack={showButtonBack}
            />
            <ItemsTable
                items={items}
                selected={{ selectedItemId, selectRowHandler }}
                fields={fields}
                itemsQtyOnPage={itemsQtyOnPage}
                currentPage={currentPage}
            />
            <Pagination options={paginationOptions} />
            <ConfirmModal show={showModal} handleClose={closeModalHandler} loading={loading}>
                <p>
                    Удалить <b>{getSelecteditemName()}</b> ?
                </p>
            </ConfirmModal>
        </>
    )
}

ItemsList.defaultProps = {
    presentationField: 'name',
    showButtonBack: true,
    relationType: null
}

export default ItemsList