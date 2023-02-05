import Topbar from './Topbar'
import Table from './Table'
import { Column, Cell, Row } from './Table/classes'
import AppTableContextProvider from './AppTableContextProvider'

const AppTable = ({ columns, initItems, handlers, options }) => {

  return (
    <AppTableContextProvider
      columns={columns}
      initItems={initItems}
      options={options}
      handlers={handlers}
    >
      {
        options.withTopbar && <Topbar />
      }
      <Table />
    </AppTableContextProvider>
  )
}

AppTable.defaultProps = {

  columns: [
    new Column('number', '#'),
    new Column('first', 'First name'),
    new Column('last', 'Last name'),
    new Column('handle', 'Handle'),
  ],

  initItems: [
    new Row(new Cell('Mark', 'Mark'), new Cell('Otto', 'Otto'), new Cell('@mdo', '@mdo')),
    new Row(new Cell('Jacob', 'Jacob'), new Cell('Thornton', 'Thornton'), new Cell('@fat', '@fat')),
    new Row(new Cell('Larry the Bird', 'Larry the Bird'), new Cell(null, 'none'), new Cell('@twitter', '@twitter'))
  ],

  handlers: {
    onItemAdded: () => { },
    onSave: () => { }
  },

  options: {
    withTopbar: true
  }

}

export default AppTable