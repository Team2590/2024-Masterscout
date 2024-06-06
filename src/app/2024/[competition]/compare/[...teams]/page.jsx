import React from 'react'
import TruePage from './truePage'

const getTeamData = async (params) => {
    const teams = Array.from(new Set(params.teams))
    const teamsData = await Promise.all(teams.map(async (team) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_2024}/api/${params.competition}/${team}`, { cache: 'no-cache' })
        return response.json()
    }))
    return teamsData
}

export default async function Page({ params }) {
    const teamsData = await getTeamData(params)

    return (
        <>
            <TruePage teamsData={teamsData} />
        </>
    )
}
