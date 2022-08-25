import { useCallback } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function useCreateUpdate(initState, isUpdateMode, create, update, getOne, onMountHandler = null) {

    const [formData, setFormData] = useState(initState)
    const navigate = useNavigate()

    // states using for load existing entity in form
    const [isLoading, setIsLoading] = useState(isUpdateMode ? true : false)

    //states using for saving entity
    const [isSaving, setIsSaving] = useState(false)

    // for errors
    const [error, setError] = useState('')

    const { id } = useParams()

    async function saveAndCloseHandler() {
        setIsSaving(true)
        try {
            if (isUpdateMode) {
                await update(formData)
            } else {
                await create(formData)
            }
            navigate(-1)
        } catch (error) {
            alert(error.message)
            setError(error.message)
        } finally {
            setIsSaving(false)
        }
    }

    const loadEntity = useCallback(async () => {
        try {
            const response = await getOne(id)
            setFormData(response)
            if (onMountHandler) {
                onMountHandler(response)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }, [])


    useEffect(() => {

        if (!isUpdateMode) {
            return
        }
        loadEntity()

    }, [loadEntity, isUpdateMode])



    return [formData, setFormData, isLoading, saveAndCloseHandler, isSaving, error]
}


export default useCreateUpdate