import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function useCreateUpdate(initState, isUpdateMode, create, update, getOne) {

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
            setError(error.message)
        } finally {
            setIsSaving(false)
        }
    }

    async function loadEntity() {
        try {
            const response = await getOne(id)
            setFormData(response)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {

        if (!isUpdateMode) {
            return
        }
        loadEntity()
        //eslint-disable-next-line
    }, [])



    return [formData, setFormData, isLoading, saveAndCloseHandler, isSaving, error]
}


export default useCreateUpdate