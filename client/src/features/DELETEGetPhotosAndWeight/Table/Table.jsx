import AppTable from '../../../components/AppTable'
//import usePhotosAndWeightContext from '../hooks/usePhotosAndWeightContext'

const Table = () => {

    //const { contextValue } = usePhotosAndWeightContext()
    //console.log(contextValue);

    return (
        <AppTable>
            <thead>
                <tr>
                    <th scope="col">Гос. номер</th>
                    <th scope="col">Тип</th>
                </tr>
            </thead>
            {
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                </tbody>
            }
        </AppTable>
    )
}

export default Table