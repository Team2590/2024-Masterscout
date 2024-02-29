import { combine } from "./combine"

export class TeamDataUtil2024 {
    constructor(data) {
        this.data = data
    }

    getAvgAmpAtn() {
        return parseFloat(combine.objPropNums(this.data, 'ampMade_atn') / this.data.length).toFixed(2)
    }

    getAvgSpeakerAtn() {
        return parseFloat(combine.objPropNums(this.data, 'ampMade_tp') / this.data.length).toFixed(2)
    }

    getAvgAmpTp() {
        return parseFloat(combine.objPropNums(this.data, 'ampMade_tp') / this.data.length).toFixed(2)
    }

    getAvgSpeakerTp() {
        return parseFloat(combine.objPropNums(this.data, 'spkrMade_tp') / this.data.length).toFixed(2)
    }

    getAvgTrap() {
        return parseFloat(combine.objPropNums(this.data, 'trap') / this.data.length).toFixed(2)
    }

    getTotalAmpAtn() {
        return combine.objPropNums(this.data, 'ampMade_atn')
    }

    getTotalSpeakerAtn() {
        return combine.objPropNums(this.data, 'spkrMade_atn')
    }

    getTotalAmpTp() {
        return combine.objPropNums(this.data, 'ampMade_tp')
    }

    getTotalSpeakerTp() {
        return combine.objPropNums(this.data, 'spkrMade_tp')
    }

    getTotalTrap() {
        return combine.objPropNums(this.data, 'trap')
    }

    getAccuracyAmpAtn() {
        const missed = combine.objPropNums(this.data, 'ampMissed_atn')
        const scored = this.getTotalAmpAtn()
        return parseFloat(scored / (scored + missed)).toFixed(2)
    }

    getAccuracySpeakerAtn() {
        const missed = combine.objPropNums(this.data, 'spkrMissed_atn')
        const scored = this.getTotalSpeakerAtn()
        return parseFloat(scored / (scored + missed)).toFixed(2)
    }

    getAccuracyAmpTp() {
        const missed = combine.objPropNums(this.data, 'ampMissed_tp')
        const scored = this.getTotalAmpTp()
        return parseFloat(scored / (scored + missed)).toFixed(2)
    }

    getAccuracySpeakerTp() {
        const missed = combine.objPropNums(this.data, 'spkrMissed_tp')
        const scored = this.getTotalSpeakerTp()
        return parseFloat(scored / (scored + missed)).toFixed(2)
    }

    getMinAmpAtn() {
        return Math.min(...(combine.objPropNumsToArr(this.data, 'ampMade_atn')))
    }

    getMinSpeakerAtn() {
        return Math.min(...(combine.objPropNumsToArr(this.data, 'spkrMade_atn')))
    }

    getMinAmpTp() {
        return Math.min(...(combine.objPropNumsToArr(this.data, 'ampMade_tp')))
    }

    getMinSpeakerTp() {
        return Math.min(...(combine.objPropNumsToArr(this.data, 'spkrMade_tp')))
    }

    getMinTrap() {
        return Math.min(...(combine.objPropNumsToArr(this.data, 'trap')))
    }

    getMinAmpAtnGtr0() {
        if (this.getMinAmpAtn() == 0) {
            const scores = combine.objPropNumsToArr(this.data, 'ampMade_atn')
            scores.sort((a, b) => a - b)
            return scores[1]
        } else {
            return this.getMinAmpAtn()
        }
    }

    getMinSpeakerAtnGtr0() {
        if (this.getMinSpeakerAtn() == 0) {
            const scores = combine.objPropNumsToArr(this.data, 'spkrMade_atn')
            scores.sort((a, b) => a - b)
            return scores[1]
        } else {
            return this.getMinSpeakerAtn()
        }
    }

    getMinAmpTpGtr0() {
        if (this.getMinAmpTp() == 0) {
            const scores = combine.objPropNumsToArr(this.data, 'ampMade_tp')
            scores.sort((a, b) => a - b)
            return scores[1]
        } else {
            return this.getMinAmpTp()
        }
    }

    getMinSpeakerTpGtr0() {
        if (this.getMinSpeakerTp() == 0) {
            const scores = combine.objPropNumsToArr(this.data, 'spkrMade_tp')
            scores.sort((a, b) => a - b)
            return scores[1]
        } else {
            return this.getMinSpeakerTp()
        }
    }

    getMinTrapGtr0() {
        if (this.getMinTrap() == 0) {
            const scores = combine.objPropNumsToArr(this.data, 'trap')
            scores.sort((a, b) => a - b)
            return scores[1]
        } else {
            return this.getMinTrap()
        }
    }

    getLastAmpAtn() {
        const sorted = this.data.sort((a, b) => a['ampMade_atn'] - b['ampMade_atn'])
        return sorted[sorted.length - 1].ampMade_atn
    }

    getLastSpeakerAtn() {
        const sorted = this.data.sort((a, b) => a['spkrMade_atn'] - b['spkrMade_atn'])
        return sorted[sorted.length - 1].spkrMade_atn
    }

    getLastAmpTp() {
        const sorted = this.data.sort((a, b) => a['ampMade_tp'] - b['ampMade_tp'])
        return sorted[sorted.length - 1].ampMade_tp
    }

    getLastSpeakerTp() {
        const sorted = this.data.sort((a, b) => a['spkrMade_tp'] - b['spkrMade_tp'])
        return sorted[sorted.length - 1].spkrMade_tp
    }

    getLastTrap() {
        const sorted = this.data.sort((a, b) => a['trap'] - b['trap'])
        return sorted[sorted.length - 1].trap
    }
}