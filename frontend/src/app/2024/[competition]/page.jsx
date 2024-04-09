import React from 'react'
import TruePage from './truePage'

const getData = async (comp) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_2024}/api/${comp}/all/raw`, { cache: 'no-cache' })
    return response.json()
}


export default async function Page({ params }) {
    let data = await getData(params.competition)
    
    data = data.map(d => {
        const totalGamePieces = d.spkrMade_atn + d.spkrMade_tp + d.ampMade_atn + d.ampMade_tp
        const spkrAtnEff = d.spkrMade_atn / d.spkrMissed_atn
        const spkrTpEff = d.spkrMade_tp / d.spkrMissed_tp
        const ampAtnEff = d.ampMade_atn / d.ampMissed_atn
        const ampTpEff = d.ampMade_tp / d.ampMissed_tp
        return { ...d, totalGamePieces, spkrAtnEff, spkrTpEff, ampAtnEff, ampTpEff }
    })

    return (
        <TruePage data={data} />
    )
}
