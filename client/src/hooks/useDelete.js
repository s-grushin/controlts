import { useState } from 'react'

function useDelete(deleteFunc) {

    const [isDeleting, setIsDeleting] = useState(false)
    const [showModal, setShowModal] = useState(false)

    async function deleteEntity(id) {

        if (!id) {
            alert('no id provided')
            return
        }

        try {
            setIsDeleting(true)
            await deleteFunc(id)
        } catch (error) {
            alert(error.message)
        } finally {
            setIsDeleting(false)
        }
    }

    return [deleteEntity, isDeleting, showModal, setShowModal]
}

export default useDelete