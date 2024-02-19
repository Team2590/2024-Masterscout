'use client'
import { twentyFourFetcher } from '@/app/fetchers'
import { Button, Box, CircularProgress } from '@mui/material'
import { useQueryState } from 'nuqs'
import React, { useEffect, useMemo } from 'react'
import useSWR from 'swr'

export default function Page() {
    const [teams, setTeams] = useQueryState('teams', {
        parse: (team) => JSON.parse(team),
        serialize: (value) => JSON.stringify(value)
    })

    const handleClick = () => {
        setTeams(prevTeams => {
            if (prevTeams) {
                return [...prevTeams, 123]
            } else {
                return [123]
            }
        })
    }

    const { isLoading, data, error } = useSWR('https://jsonplaceholder.typicode.com/posts', twentyFourFetcher)

    useEffect(() => {
        sessionStorage.setItem('compare-teams', JSON.stringify(teams))
    }, [teams])

    if (isLoading) {
        return (
            <div style={{ height: 'calc(100vh - 64px)', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </div>
        )
    } else if (data) {
        return (
            <>
                <Button onClick={handleClick} variant='contained'>Click me!</Button>
                <Box>
                    {teams ? teams.map(team => {
                        return (
                            <p key={team}>{team}</p>
                        )
                    }) : undefined}
                </Box>
            </>
        )
    } else {
        return (
            <p>Fuck</p>
        )
    }
}