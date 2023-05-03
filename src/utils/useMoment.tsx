import moment from "moment/moment"
import uuid from 'react-uuid'

export const getCurrentTimeStamp = (timeFormat: any) => {
    return moment().format('LLL')

}

export const getUniqueId = () => {
    let id = uuid()
    return id
}