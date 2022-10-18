import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../Spinner'
import BottomBar from './BottomBar'
import useHttp from '../../hooks/useHttp'
import AppAlert from '../AppAlert'

const CreateUpdateItem = ({ children, fetchUrl, data, variant, updateOptions }) => {

    const { request, loading, error, clearError } = useHttp()
    const navigate = useNavigate()

    const { id } = useParams()

    const cancelHandler = () => {
        navigate(-1)
    }

    const saveHandler = async () => {

        let res

        if (variant === 'update') {
            res = await request(fetchUrl, 'put', { ...data, id })
        }

        if (variant === 'create') {
            res = await request(fetchUrl, 'post', data)
        }

        if (res) {
            navigate(-1)
        }
    }



    useEffect(() => {

        const fetchItem = async () => {
            if (variant !== 'update') return
            const data = await request(`${fetchUrl}/${id}`, 'get', {})
            updateOptions.forEach(option => option.setState(data[option.field]))
        }

        fetchItem()

    }, [fetchUrl, id, request, updateOptions, variant])


    if (loading) return <Spinner />

    return (
        <>
            <AppAlert show={!!error} clear={clearError} title='Ошибка' text={error} />
            {children}
            <BottomBar cancelHandler={cancelHandler} saveHandler={saveHandler} isSaving={loading} />
        </>
    )
}

export default CreateUpdateItem