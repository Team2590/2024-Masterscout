export const combine = {
    objPropNums: (arr, prop) => {
        return arr.reduce((total, obj) => { return total + obj[prop] })
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
    }
}