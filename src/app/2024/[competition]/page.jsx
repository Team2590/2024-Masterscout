import React from 'react'
import TruePage from './truePage'
import { TeamDataUtil2024 } from '@/util/teamDataUtil2024'
import { groupBy } from 'lodash'

const getData = async (comp) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_2024}/api/${comp}/all/raw`, { cache: 'no-cache' })
    return response.json()
}

const getAccuracy = (data, location, time) => {
    const accuracy = parseFloat(data[`${location}Made_${time}`] / (data[`${location}Made_${time}`] + data[`${location}Missed_${time}`])).toFixed(2)
    if (isNaN(accuracy)) return 0
    return accuracy
}

const getAccuracies = (data) => {
    const spkrAtnAccuracy = getAccuracy(data, 'spkr', 'atn')
    const spkrTpAccuracy = getAccuracy(data, 'spkr', 'tp')
    const ampAtnAccuracy = getAccuracy(data, 'amp', 'atn')
    const ampTpAccuracy = getAccuracy(data, 'amp', 'tp')
    return { spkrAtnAccuracy, spkrTpAccuracy, ampAtnAccuracy, ampTpAccuracy }
}

export default async function Page({ params }) {
    let data = await getData(params.competition)
    const rawData = data
    data = data.filter(({ teamNum }) => teamNum != null)

    data = data.map(d => {
        const totalGamePieces = d.spkrMade_atn + d.spkrMade_tp + d.ampMade_atn + d.ampMade_tp
        const { spkrAtnAccuracy, spkrTpAccuracy, ampAtnAccuracy, ampTpAccuracy } = getAccuracies(d)
        return { ...d, totalGamePieces, spkrAtnAccuracy, spkrTpAccuracy, ampAtnAccuracy, ampTpAccuracy }
    })

    data = groupBy(data, ({ teamNum }) => teamNum)

    for (let team in data) {
        data[team] = new TeamDataUtil2024(data[team])
    }

    data = Object.values(data).map(d => {
        return {
            teamNum: d.getTeamNum(),
            totalGamePieces: d.getTotalGamePieces(),
            avgFed: d.getAvgFed(),
            notesFed: d.getTotalFed(),
            spkrAvgAtn: d.getAvgSpeakerAtn(),
            ampAvgAtn: d.getAvgAmpAtn(),
            spkrAvgTp: d.getAvgSpeakerTp(),
            ampAvgTp: d.getAvgAmpTp(),
            spkrAtnAccuracy: d.getAccuracySpeakerAtn(),
            spkrTpAccuracy: d.getAccuracySpeakerTp(),
            ampAtnAccuracy: d.getAccuracyAmpAtn(),
            ampTpAccuracy: d.getAccuracyAmpTp(),
            spkrMade_atn: d.getTotal('spkrMade_atn'),
            spkrMissed_atn: d.getTotal('spkrMissed_atn'),
            ampMade_atn: d.getTotal('ampMade_atn'),
            ampMissed_atn: d.getTotal('ampMissed_atn'),
            spkrMade_tp: d.getTotal('spkrMade_tp'),
            spkrMissed_tp: d.getTotal('spkrMissed_tp'),
            ampMade_tp: d.getTotal('ampMade_tp'),
            ampMissed_tp: d.getTotal('ampMissed_tp'),
            canClimb: d.canClimb()
        }
    })

    return (
        <TruePage data={data} rawData={rawData} />
    )
}
