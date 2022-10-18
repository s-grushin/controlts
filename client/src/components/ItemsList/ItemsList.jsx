import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ItemsTable from './ItemsTable'
import useHttp from '../../hooks/useHttp'
import Spinner from '../Spinner'
import Topbar from './Topbar'
// import Pagination from './Pagination'
import ConfirmModal from '../ConfirmModal'

const itemsQtyOnPage = 20
const currentPage = 1

const ItemsList = ({ fetchUrl, path, fields, presentationField }) => {

    const { request, loading } = useHttp()
    const [items, setItems] = useState([])
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

    useEffect(() => {
        const fetchItems = async () => {
            const data = await request(fetchUrl, 'get', {})
            setItems(data.rows)
        }
        fetchItems()
    }, [request, fetchUrl])


    const selecteditemName = selectedItemId ? items.find(item => item.id === selectedItemId)[presentationField] : 'Не выбрано'


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
            {/* <Pagination /> */}
            <ConfirmModal show={showModal} handleClose={closeModalHandler} loading={loading}>
                <p>
                    Удалить <b>{selecteditemName}</b> ?
                </p>
            </ConfirmModal>
        </>
    )
}

ItemsList.defaultProps = {
    presentationField: 'name'
}

export default ItemsList