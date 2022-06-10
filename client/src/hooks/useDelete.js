import { useState } from 'react'

function useDelete(id, deleteFunc) {

    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState('')
    const [modalShow, setModalShow] = useState(false)

    async function _delete() {
        try {
            setIsDeleting(true)
            deleteFunc(id)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsDeleting(false)
        }
    }

    return [_delete, isDeleting, error, modalShow, setModalShow]
}

export default useDelete