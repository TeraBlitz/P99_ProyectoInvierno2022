export function getFixedDate(date) {
    return new Date(date.getTime() + (date.getTimezoneOffset()*60000) + (-6*60*60000))

} 