import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../Spinner'
import BottomBar from './BottomBar'
import useHttp from '../../hooks/useHttp'
import AppAlert from '../AppAlert'

//data - данные формы которые нужно отправлять на сервер
//updateOptions - массив, где каждый элемент это имя поля данных формы и функция setState
//oneSetter - функция setState. Используется для связи one-to-many для подгрузки one. Например при создании новой модели, в форму нужно подгрузить бренд
//oneFetchUrl - Строка URL откуда получить one. На примере бренда-моделей, это адрес подгрузки бренда
const CreateUpdateItem = ({ children, fetchUrl, data, variant, updateOptions, oneSetter, oneFetchUrl }) => {

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
            if (variant === 'create' && oneSetter) {
                const data = await request(oneFetchUrl)
                console.log(data);
                oneSetter(data)
            }
            if (variant === 'update') {
                const data = await request(`${fetchUrl}/${id}`, 'get', {})
                updateOptions.forEach(option => option.setState(data[option.field] || ''))
            }
        }

        fetchItem()

    }, [fetchUrl, id, request, updateOptions, variant, oneSetter, oneFetchUrl])


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