export const combine = {
    objNums: (arr, prop) => {
        let total = 0
        arr.forEach(obj => {
            total += obj[prop]
        })
        return total
    },

    objStrings: (arr, prop) => {
        let total = []
        arr.forEach(obj => {
            total.push(obj[prop])
        })
        return total
    },

    objByProp: (arr, prop) => {
        return
    }
}