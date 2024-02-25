'use server'
import React from 'react'
import TrueLayout from './trueLayout'
import { notFound } from 'next/navigation'

const checkComp = async (comp) => {
    const response = await fetch(`${process.env.API_URL_2024}/api/${comp}/all/teams`).catch(notFound)
    if (!response.ok) {
        return false
    } else {
        return true
    }
}

export default async function Layout(props) {
    const compExists = await checkComp(props.params.competition)
    if (compExists) {
        return (
            <TrueLayout {...props} />
        )
    } else {
        return notFound()
    }
}
