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

export function dateRangeToISO(from, to) {
    return {
        from: subtractTzOffset(new Date(from)).toISOString(),
        to: getEndOfDayLocale(new Date(to)).toISOString()
    }
}

export function subtractTzOffset(date = new Date()) {
    // Функция вычитает из переданной даты количество миллисекунд timeZone offset
    const tzMs = getTimezoneOffsetMs(date)
    const substracted = subtractFromDate(date, { ms: tzMs })
    return substracted
}

export function subtractFromDate(date = new Date(), { ms }) {
    const result = new Date(date.getTime() + ms)
    return result
}

export function getTimezoneOffsetMs(date = new Date()) {
    return date.getTimezoneOffset() * 60 * 1000
}

export function getEndOfDayLocale(date = new Date()) {
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)
    return endOfDay
}

export function calculateDiffBwDates(fromDate, toDate = new Date(), period = 'days') {

    const diffMs = toDate.getTime() - fromDate.getTime()
    if (period === 'days') {
        return diffMs / (1000 * 60 * 60 * 24)
    } else {
        return 0
    }
}

export function formatAxiosError(axiosError) {

    const messageFromBackend = axiosError?.response?.data?.message || ''

    if (messageFromBackend) {
        return `${axiosError.message}: ${messageFromBackend}`
    } else {
        return axiosError.message
    }

}