import { combine } from "./combine"

export class TeamDataUtil2024 {
    constructor(data) {
        this.data = data
    }

    #getAverage(key) {
        return parseFloat(combine.objPropNums(this.data, key) / this.data.length).toFixed(2)
    }

    #getTotal(key) {
        return combine.objPropNums(this.data, key)
    }

    #getAccuracy(location, time) {
        const missed = combine.objPropNums(this.data, `${location}Missed_${time}`)
        const scored = this.#getTotal(`${location}Made_${time}`)
        const accuracy = parseFloat(scored / (scored + missed)).toFixed(2)
        if (isNaN(accuracy)) {
            return 0
        } else {
            return accuracy
        }
    }

    #getMin(key) {
        return Math.min(...(combine.objPropNumsToArr(this.data, key)))
    }

    #getMinAmpAtnGtr0(key) {
        if (this.#getMin(key) == 0) {
            const scores = combine.objPropNumsToArr(this.data, key)
            scores.sort((a, b) => a - b)
            return scores[1]
        } else {
            return this.#getMin(key)
        }
    }

    #getLast(key) {
        const sorted = this.data.sort((a, b) => a.matchNum - b.matchNum)
        return sorted[sorted.length - 1][key]
    }

    #getScores(key) {
        return this.data.sort((a, b) => a.matchNum - b.matchNum).map(d => {
            return d[key]
        })
    }

    #getEfficiency(location, time) {
        const scored = this.#getTotal(`${location}Made_${time}`)
        const missed = this.#getTotal(`${location}Missed_${time}`)
        return parseFloat(scored / missed).toFixed(2)
    }

    getAvgAmpAtn() {
        return this.#getAverage('ampMade_atn')
    }

    getAvgSpeakerAtn() {
        return this.#getAverage('spkrMade_atn')
    }

    getAvgAmpTp() {
        return this.#getAverage('ampMade_tp')
    }

    getAvgSpeakerTp() {
        return this.#getAverage('spkrMade_tp')
    }

    getAvgTrap() {
        return this.#getAverage('trap')
    }

    getTotalAmpAtn() {
        return this.#getTotal('ampMade_atn')
    }

    getTotalSpeakerAtn() {
        return this.#getTotal('spkrMade_atn')
    }

    getTotalAmpTp() {
        return this.#getTotal('ampMade_tp')
    }

    getTotalSpeakerTp() {
        return this.#getTotal('spkrMade_tp')
    }

    getTotalTrap() {
        return this.#getTotal('trap')
    }

    getTotalFed() {
        const total = this.#getTotal('notesFed')
        if (isNaN(total)) {
            return 'N/A'
        } else {
            return this.#getTotal('notesFed')
        }
    }

    getAccuracyAmpAtn() {
        return this.#getAccuracy('amp', 'atn')
    }

    getAccuracySpeakerAtn() {
        return this.#getAccuracy('spkr', 'atn')
    }

    getAccuracyAmpTp() {
        return this.#getAccuracy('amp', 'tp')
    }

    getAccuracySpeakerTp() {
        return this.#getAccuracy('spkr', 'tp')
    }

    getMinAmpAtn() {
        return this.#getMin('ampMade_atn')
    }

    getMinSpeakerAtn() {
        return this.#getMin('spkrMade_atn')
    }

    getMinAmpTp() {
        return this.#getMin('ampMade_tp')
    }

    getMinSpeakerTp() {
        return this.#getMin('spkrMade_tp')
    }

    getMinTrap() {
        return this.#getMin('trap')
    }

    getMinAmpAtnGtr0() {
        return this.#getMinAmpAtnGtr0('ampMade_atn')
    }

    getMinSpeakerAtnGtr0() {
        return this.#getMinAmpAtnGtr0('spkrMade_atn')
    }

    getMinAmpTpGtr0() {
        return this.#getMinAmpAtnGtr0('ampMade_tp')
    }

    getMinSpeakerTpGtr0() {
        return this.#getMinAmpAtnGtr0('spkrMade_tp')
    }

    getMinTrapGtr0() {
        return this.#getMinAmpAtnGtr0('trap')
    }

    getLastAmpAtn() {
        return this.#getLast('ampMade_atn')
    }

    getLastSpeakerAtn() {
        return this.#getLast('spkrMade_atn')
    }

    getLastAmpTp() {
        return this.#getLast('ampMade_tp')
    }

    getLastSpeakerTp() {
        return this.#getLast('spkrMade_tp')
    }

    getLastTrap() {
        return this.#getLast('trap')
    }

    getTotalGamePieces() {
        let total = 0
        this.data.forEach(d => {
            const sum = d.spkrMade_atn + d.spkrMade_tp + d.ampMade_atn + d.ampMade_tp
            total += sum
        })
        return total
    }

    getMatchNums() {
        return this.data.map(d => {
            return d.matchNum
        }).sort((a, b) => a - b)
    }

    getNumOfMatchesPlayed() {
        return this.getMatchNums().length
    }

    getAmpAutoScores() {
        return this.#getScores('ampMade_atn')
    }

    getAmpTeleopScores() {
        return this.#getScores('ampMade_tp')
    }

    getSpeakerAutoScores() {
        return this.#getScores('spkrMade_atn')
    }

    getSpeakerTeleopScores() {
        return this.#getScores('spkrMade_tp')
    }

    getAllAmpScores() {
        return this.getAmpAutoScores().map((val, i) => {
            return val += this.getAmpTeleopScores()[i]
        })
    }

    getAllSpeakerScores() {
        return this.getSpeakerAutoScores().map((val, i) => {
            return val += this.getSpeakerTeleopScores()[i]
        })
    }

    getTotalNumOfMatches() {
        return this.data.length
    }

    getSpkrAutoEff() {
        return this.#getEfficiency('spkr', 'auto')
    }

    getSpkrTeleopEff() {
        return this.#getEfficiency('spkr', 'teleop')
    }

    getAmpAutoEff() {
        return this.#getEfficiency('amp', 'auto')
    }

    getAmpTeleopEff() {
        return this.#getEfficiency('amp', 'teleop')
    }

    canClimb() {
        const cimbLvls = this.data.map(({ climbLvl }) => {
            return climbLvl
        })

        if (cimbLvls.includes('Climb')) return true
        else return false
    }
}