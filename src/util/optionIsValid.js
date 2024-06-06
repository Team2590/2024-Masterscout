export const optionIsValid = (option) => {
    if (option == null || option == undefined || isNaN(Number(option)) || option == 0) return false
    return true
}