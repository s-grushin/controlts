class EntityContext {
    constructor(mode = 'create') {

        this.mode = mode // create or update

        this.state = {
            isLoading: false,
            isSaving: false,
            error: ''
        }

        this.handlers = {
            saveAndCloseHandler() { }
        }
    }
}

export default EntityContext