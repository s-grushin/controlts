class EntityListContext {
    constructor(columns) {

        this.entities = []

        this.titlePropName = 'name'

        this.columns = columns.map((col, index) => new EntityListColumn(index + 1, col.name, col.title))

        this.topBar = {
            handlers: {
                addEntity() { },
                deleteEntity() { }
            }
        }

        this.table = {
            handlers: {
                openEntity() { }
            }
        }

        this.state = {
            selectedEntities: [],
            setSelectedEntities() { }
        }

        this.modals = {
            delete: {
                show: false,
                isDeleting: false
            }
        }
    }



}

class EntityListColumn {
    constructor(id, name, title) {
        this.id = id
        this.name = name
        this.title = title
    }
}

export default EntityListContext