export function formatDate(date, options = {}) {

    if (!date) {
        return ''
    }

    let withTime = options.withTime === undefined ? true : options.withTime
    let withSeconds = options.withSeconds || false

    let dateAsObject

    if (typeof date === 'string') {
        dateAsObject = new Date(date)
    } else {
        dateAsObject = date
    }

    const dateString = dateAsObject.toLocaleDateString()
    let timeString = ''
    if (withTime) {
        if (withSeconds) {
            timeString = ' ' + dateAsObject.toLocaleTimeString()
        } else {
            timeString = ' ' + dateAsObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    }

    return dateString + timeString

}

export const today = () => {
    //return start of current day in local TZ
    return startOfDateLocale()
}

export const dateToLocaleISO = (date = new Date()) => {
    //возвращает дату в формате ISO в текущей таймзоне
    return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000).toISOString()
}

export const startOfDateLocale = (date = new Date()) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export const endOfDateLocale = (date = new Date()) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
}


export function subtractFromDate(date = new Date(), { ms }) {
    const result = new Date(date.getTime() - ms)
    return result
}

export function formatAxiosError(axiosError) {

    const messageFromBackend = axiosError?.response?.data?.message || ''

    if (messageFromBackend) {
        return `${axiosError.message}: ${messageFromBackend}`
    } else {
        return axiosError.message
    }

}

export const getObjectValueByPath = (from, ...selectors) =>
    [...selectors].map(s =>
        s
            .replace(/\[([^[\]]*)\]/g, '.$1.')
            .split('.')
            .filter(t => t !== '')
            .reduce((prev, cur) => prev && prev[cur], from)
    )