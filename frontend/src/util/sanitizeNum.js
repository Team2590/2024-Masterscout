export const sanitizeNum = (num) => {
    if (!isNaN(num) && num != undefined) return num
    else return 0
}