export const combine = {
    objPropNums: (arr, prop) => {
        return arr.reduce((total, obj) => { return total + obj[prop] }, 0)
    },

    objPropStrings: (arr, prop) => {
        let total = []
        arr.forEach(obj => {
            total.push(obj[prop])
        })
        return total
    },

    objPropNumsToArr: (arr, prop) => {
        return arr.map(obj => {
            return obj[prop]
        })
    },

    total: (arr) => {
        return arr.reduce((a, b) => { return a + b }, 0)
    }
}