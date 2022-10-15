import ItemsList from '../../../components/ItemsList/ItemsList'

const UsersList = () => {

    const fieldsDisplay = [
        { id: 1, name: 'username', title: 'Имя для входа' },
        { id: 2, name: 'fullName', title: 'Полное имя' },
        { id: 3, name: 'role', title: 'Роль' },
        { id: 4, name: 'isActive', title: 'Активный' },
    ]

    return (
        <ItemsList fetchUrl='/users/' fields={fieldsDisplay} presentationField='username' />
    )
}

export default UsersList