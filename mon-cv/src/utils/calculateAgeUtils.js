export const calculateAge = (dateString) => {
    const birthDate = new Date(dateString)
    const today = new Date()

    const yearDiff = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    const dayDiff = today.getDate() - birthDate.getDate()

    return monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0) ? yearDiff : yearDiff - 1
}
