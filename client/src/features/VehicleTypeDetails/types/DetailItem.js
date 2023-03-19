import uuid from "react-uuid"


class DetailItem {

    id
    number = ''
    photoUrl = ''
    vehicleTypeId
    isNew = false

    constructor() {
        this.id = uuid()
    }
}

export default DetailItem