import React from 'react'
import TruePage from './truePage'

const getData = async (comp) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_2024}/api/${comp}/all/raw`, { cache: 'no-cache' })
    return response.json()
}

export default async function Page({ params }) {
    const data = await getData(params.competition)

    return (
        <TruePage data={data} />
    )
}
