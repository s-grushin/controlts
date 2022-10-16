import { useNavigate } from 'react-router-dom'
import BottomBar from './BottomBar'
import useHttp from '../../hooks/useHttp'
import AppAlert from '../AppAlert'

const CreateUpdateItem = ({ children, fetchUrl, data, variant }) => {

    const { request, loading, error, clearError } = useHttp()
    const navigate = useNavigate()

    const cancelHandler = () => {
        navigate(-1)
    }

    const saveHandler = async () => {
        const res = await request(fetchUrl, 'post', data)
        if (res) {
            navigate(-1)
        }
    }

    return (
        <>
            <AppAlert show={!!error} clear={clearError} title='Ошибка' text={error} />
            {children}
            <BottomBar cancelHandler={cancelHandler} saveHandler={saveHandler} isSaving={loading} />
        </>
    )
}

export default CreateUpdateItem