import { redirect } from 'next/navigation'
import React from 'react'

export default async function Page({ params }) {
    redirect(`/2024/${params.competition}/ranking`)
}
