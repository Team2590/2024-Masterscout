'use client'
import { fetcher } from '@/util/fetchers'
import { Search } from '@mui/icons-material'
import { Box, CircularProgress, Autocomplete, TextField } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import useSWR from 'swr'

export default function Layout({ children }) {
    const params = useParams()
    const router = useRouter()
    const teamData = useSWR(`${process.env.NEXT_PUBLIC_API_URL_2024}/api/${params.competition}/all/teams`, fetcher)

    const handleSubmit = (e, value) => {
        e.preventDefault()
        router.push(`/2024/${params.competition}/compare/${value.join('/')}`)
    }

    if (teamData.isLoading) {
        return (
            <div style={{ height: 'calc(100vh - 64px)', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </div>
        )
    } else if (teamData.data) {
        const options = Array.from(new Set(teamData.data.map(({ teamNum }) => {
            // const id = teamData.data.findIndex(a => a.teamNum == teamNum)
            // return { label: teamNum.toString(), id }
            return teamNum
        })))
        const defaultValue = Array.from(new Set(params.teams))
        return (
            <>
                <Autocomplete
                    multiple
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ maxWidth: 600, marginTop: '2rem', marginInline: 'auto' }}
                    onChange={handleSubmit}
                    defaultValue={defaultValue}
                    renderInput={(params) =>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Search sx={{ color: 'action.active', mr: 1, mt: 2 }} />
                            <TextField {...params} label="Teams" variant='standard' />
                        </Box>
                    }
                />
                {children}
            </>
        )
    } else {
        return (
            <p>Error</p>
        )
    }
}