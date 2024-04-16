import React from 'react'
import TruePage from './truePage'
import { combine } from '@/util/combine'

const getData = async (comp) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_2024}/api/${comp}/all/raw`, { cache: 'no-cache' })
    return response.json()
}

const getAccuracies = (data) => {
    const getAccuracy = (location, time) => {
        const accuracy = parseFloat(data[`${location}Made_${time}`] / (data[`${location}Made_${time}`] + data[`${location}Missed_${time}`])).toFixed(2)
        if (isNaN(accuracy)) return 0
        return accuracy
    }
    const spkrAtnAccuracy = getAccuracy('spkr', 'atn')
    const spkrTpAccuracy = getAccuracy('spkr', 'tp')
    const ampAtnAccuracy = getAccuracy('amp', 'atn')
    const ampTpAccuracy = getAccuracy('amp', 'tp')
    return { spkrAtnAccuracy, spkrTpAccuracy, ampAtnAccuracy, ampTpAccuracy }
}

export default async function Page({ params }) {
    let data = await getData(params.competition)

    data = data.map(d => {
        const totalGamePieces = d.spkrMade_atn + d.spkrMade_tp + d.ampMade_atn + d.ampMade_tp
        const { spkrAtnAccuracy, spkrTpAccuracy, ampAtnAccuracy, ampTpAccuracy } = getAccuracies(d)
        return { ...d, totalGamePieces, spkrAtnAccuracy, spkrTpAccuracy, ampAtnAccuracy, ampTpAccuracy }
    })

    return (
        <TruePage data={data} />
    )
}
