import { combine } from "./combine"

export const teamUtil = {
    getAvgAmpAtn: (data) => {
        return combine.objPropNums(data, 'ampMade_atn') / data.length
    },

    getAvgSpeakerAtn: (data) => {
        return combine.objPropNums(data, 'ampMade_tp') / data.length
    },

    getAvgTrap: (data) => {
        return combine.objPropNums(data, 'trap') / data.length
    },

    getTotalAmpAtn: (data) => {
        return combine.objPropNums(data, 'ampMade_atn')
    },

    getTotalSpeakerAtn: (data) => {
        return combine.objPropNums(data, 'spkrMade_atn')
    },

    getTotalAmpTp: (data) => {
        return combine.objPropNums(data, 'ampMade_tp')
    },

    getTotalSpeakerTp: (data) => {
        return combine.objPropNums(data, 'spkrMade_tp')
    },

    getTotalTrap: (data) => {
        return combine.objPropNums(data, 'trap')
    },

    getAccuracyAmpAtn: function (data) {
        const missed = combine.objPropNums(data, 'ampMissed_atn')
        return this.getTotalAmpAtn(data) / missed
    },

    getAccuracySpeakerAtn: function (data) {
        const missed = combine.objPropNums(data, 'spkrMissed_atn')
        return this.getTotalSpeakerAtn(data) / missed
    },

    getMinAmpAtn: (data) => {
        return Math.min(...(combine.objPropNumsToArr(data, 'ampMade_atn')))
    },

    getMinSpeakerAtn: (data) => {
        return Math.min(...(combine.objPropNumsToArr(data, 'spkrMade_atn')))
    },

    getMinAmpTp: (data) => {
        return Math.min(...(combine.objPropNumsToArr(data, 'ampMade_tp')))
    },

    getMinSpeakerTp: (data) => {
        return Math.min(...(combine.objPropNumsToArr(data, 'spkrMade_tp')))
    },

    getMinTrap: (data) => {
        return Math.min(...(combine.objPropNumsToArr(data, 'trap')))
    },

    getMinAmpAtnGtr0: function (data) {
        if (this.getMinAmpAtn(data) == 0) {
            const scores = combine.objPropNumsToArr(data, 'ampMade_atn')
            scores.sort((a, b) => a - b)
            return scores[1]
        } else {
            return this.getMinAmpAtn(data)
        }
    },

    getMinSpeakerAtnGtr0: function (data) {
        if (this.getMinSpeakerAtn(data) == 0) {
            const scores = combine.objPropNumsToArr(data, 'spkrMade_atn')
            scores.sort((a, b) => a - b)
            return scores[1]
        } else {
            return this.getMinSpeakerAtn(data)
        }
    },

    getMinAmpTpGtr0: function (data) {
        if (this.getMinAmpTp(data) == 0) {
            const scores = combine.objPropNumsToArr(data, 'ampMade_tp')
            scores.sort((a, b) => a - b)
            return scores[1]
        } else {
            return this.getMinAmpTp(data)
        }
    },

    getMinSpeakerTpGtr0: function (data) {
        if (this.getMinSpeakerTp(data) == 0) {
            const scores = combine.objPropNumsToArr(data, 'spkrMade_tp')
            scores.sort((a, b) => a - b)
            return scores[1]
        } else {
            return this.getMinSpeakerTp(data)
        }
    },

    getMinTrapGtr0: function (data) {
        if (this.getMinTrap(data) == 0) {
            const scores = combine.objPropNumsToArr(data, 'trap')
            scores.sort((a, b) => a - b)
            return scores[1]
        } else {
            return this.getMinTrap(data)
        }
    },

    getLastAmpAtn: (data) => {
        const dataCopy = Array.of(...data)
        const sorted = dataCopy.sort((a, b) => a['ampMade_atn'] - b['ampMade_atn'])
        return sorted[sorted.length - 1]
    },

    getLastSpeakerAtn: (data) => {
        const dataCopy = Array.of(...data)
        const sorted = dataCopy.sort((a, b) => a['spkrMade_atn'] - b['spkrMade_atn'])
        return sorted[sorted.length - 1]
    },

    getLastAmpTp: (data) => {
        const dataCopy = Array.of(...data)
        const sorted = dataCopy.sort((a, b) => a['ampMade_tp'] - b['ampMade_tp'])
        return sorted[sorted.length - 1]
    },

    getLastSpeakerTp: (data) => {
        const dataCopy = Array.of(...data)
        const sorted = dataCopy.sort((a, b) => a['spkrMade_atn'] - b['spkrMade_atn'])
        return sorted[sorted.length - 1]
    },

    getLastTrap: (data) => {
        const dataCopy = Array.of(...data)
        const sorted = dataCopy.sort((a, b) => a['trap'] - b['trap'])
        return sorted[sorted.length - 1]
    }
}