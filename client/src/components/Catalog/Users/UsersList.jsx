import ItemsList from '../../../components/ItemsList/ItemsList'

const UsersList = () => {

    const fieldsDisplay = [
        { id: 1, path: 'username', title: 'Имя для входа' },
        { id: 2, path: 'fullName', title: 'Полное имя' },
        { id: 3, path: 'role', title: 'Роль' },
        { id: 4, path: 'isActive', title: 'Активный' },
    ]

    return (
        <ItemsList
            fetchUrl='/users/'
            path='/catalog/users'
            fields={fieldsDisplay}
            presentationField='username'
        />
    )
}

export default UsersList