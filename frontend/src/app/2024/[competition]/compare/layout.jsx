'use client'
import { fetcher } from '@/util/fetchers'
import { Search } from '@mui/icons-material'
import { Box, CircularProgress, Autocomplete, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import useSWR from 'swr'

export default function Layout({ params }) {

    const teamData = useSWR(`${process.env.NEXT_PUBLIC_API_URL_2024}/api/${params.competition}/all/teams`, fetcher)

    useEffect(() => {
        sessionStorage.setItem('compare-teams', JSON.stringify(teams))
    }, [teams])

    const handleSubmit = (e, value) => {
        e.preventDefault()
        setTeams(prevTeams => {
            if (prevTeams) {
                return [...prevTeams, 123]
            } else {
                return [123]
            }
        })
    }

    const dataToTeamsArr = (data) => {
        return Array.from(new Set(data.map(d => { return d.teamNum })))
    }

    if (teamData.isLoading) {
        return (
            <div style={{ height: 'calc(100vh - 64px)', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </div>
        )
    } else if (teamData.data) {
        const options = teamData.data.map(({ teamNum }) => {
            const id = teamData.data.findIndex(a => a.teamNum == teamNum)
            return { label: teamNum.toString(), id }
        })
        return (
            <>
                <Autocomplete
                    multiple
                    disablePortal
                    freeSolo
                    id="combo-box-demo"
                    options={options}
                    sx={{ maxWidth: 600, marginTop: '2rem', marginInline: 'auto' }}
                    onChange={handleSubmit}
                    defaultValue={teams}
                    renderInput={(params) =>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Search sx={{ color: 'action.active', mr: 1, mt: 2 }} />
                            <TextField {...params} label="Teams..." variant='standard' />
                        </Box>
                    }
                />
            </>
        )
    } else {
        return (
            <p>Error</p>
        )
    }
}