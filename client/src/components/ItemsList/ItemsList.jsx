import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import ItemsTable from './ItemsTable'
import useHttp from '../../hooks/useHttp'
import Spinner from '../Spinner'
import Topbar from './Topbar'
import Pagination from '../Pagination'
import ConfirmModal from '../ConfirmModal'

const itemsQtyOnPage = 20

const ItemsList = ({ fetchUrl, path, fields, presentationField }) => {

    const { request, loading } = useHttp()
    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsQtyAll, setItemsQtyAll] = useState(0) // quantity of all rows in db table
    const [selectedItemId, setSelectedItemId] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const navigate = useNavigate()


    const selectRowHandler = (id) => {
        setSelectedItemId(id)
    }

    // back
    const backHandler = () => {
        navigate(-1)
    }


    // create
    const createHandler = () => {
        navigate(`${path}/create`)
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

    //const response = await getAll(itemsOnPage, currentPage * itemsOnPage - itemsOnPage)


    useEffect(() => {
        const fetchItems = async () => {
            const limit = itemsQtyOnPage
            const offset = currentPage * itemsQtyOnPage - itemsQtyOnPage
            const data = await request(`${fetchUrl}/?limit=${limit}&offset=${offset}`, 'get', {})
            setItems(data.rows)
            setItemsQtyAll(data.count)
        }
        fetchItems()
    }, [request, fetchUrl, currentPage])

    const getSelecteditemName = () => {
        if (selectedItemId) {
            const item = items.find(item => item.id === selectedItemId)
            if (item) return item[presentationField]
        }
    }

    const paginationOptions = useMemo(() => ({ currentPage, setCurrentPage, itemsQtyAll, itemsQtyOnPage }), [currentPage, itemsQtyAll])

    if (loading) return <Spinner />

    return (
        <>
            <Topbar
                itemSelected={!!selectedItemId}
                backHandler={backHandler}
                createHandler={createHandler}
                editHandler={editHandler}
                deleteHandler={deleteHandler}
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
    presentationField: 'name'
}

export default ItemsList