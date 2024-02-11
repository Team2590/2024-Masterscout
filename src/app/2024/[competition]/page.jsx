'use client'
import React, { useEffect } from 'react'
import useSWR from 'swr'
import { twentyFourFetcher } from '@/app/twentyFourFetcher'

export default function Page() {
    const { isLoading, data, error } = useSWR(`${process.env.NEXT_BACKEND_URL}`, twentyFourFetcher)

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div>
            <p>Hello world! {process.env.NEXT_BACKEND_URL}</p>
        </div>
    )
}
