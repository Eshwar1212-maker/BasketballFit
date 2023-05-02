import moment from "moment/moment"

export const getCurrentTimeStamp = (timeFormat: any) => {
    return moment().format('LLL')

}