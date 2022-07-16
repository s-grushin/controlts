class EntityListContext {
    constructor(columns) {

        this.entities = []

        this.titlePropName = 'name'

        this.columns = columns.map((col, index) => new EntityListColumn(index + 1, col.name, col.title))


        this.handlers = {
            addEntity: null,
            deleteEntity: null,
            editEntity: null
        }

        this.state = {
            selectedEntities: [],
            setSelectedEntities: null
        }

        this.modals = {
            delete: {
                show: false,
                isDeleting: false
            }
        }

        this.pagination = {
            currentPage: 1,
            setCurrentPage: null,
            itemsQtyAll: 0,
            itemsQtyOnPage: 0,
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