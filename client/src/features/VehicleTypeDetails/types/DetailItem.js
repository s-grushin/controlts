import uuid from "react-uuid"


class DetailItem {

    id
    number = ''
    photoUrl = ''
    vehicleTypeId

    constructor() {
        this.id = uuid()
    }
}

export default DetailItem