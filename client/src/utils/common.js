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
