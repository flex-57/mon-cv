export const ucFirst = (str) => {
    return !str ? str : str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export const capitalizeName = (str) => {
    return !str ? str : str.split(' ').map(ucFirst).join(' ')
}
