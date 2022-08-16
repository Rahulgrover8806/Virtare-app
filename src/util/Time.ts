import moment from 'moment'

const DEFAULT_FORMAT = "MMM d,YYYY"
export const format = (date = new Date().getTime() , format = DEFAULT_FORMAT) => {
    return moment.unix(date).format(format)
}
export const now = (format = DEFAULT_FORMAT) => {
    return moment().format(format)
}


