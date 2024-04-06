export const optionIsValid = (option) => {
    if (option == null || option == undefined || isNaN(Number(option))) return false
    return true
}