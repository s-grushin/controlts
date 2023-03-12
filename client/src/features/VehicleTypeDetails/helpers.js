import uuid from "react-uuid"
import DetailItem from "./types/DetailItem";

export const mapCameraDataToMoveDetails = (cameraData) => {

    return cameraData.map(item => {
        const di = new DetailItem()
        di.id = uuid()
        di.number = item.number
        di.photoUrl = item.photoUrl
        di.vehicleTypeId = item.regPhotoSettingItem.vehicleTypeId
        return di
    })
}