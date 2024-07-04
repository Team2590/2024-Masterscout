'use client'
import { fetcher } from '@/util/fetchers'
import { getOptions } from '@/util/getOptions'
import { Search } from '@mui/icons-material'
import { Box, CircularProgress, Autocomplete, TextField, Container } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import React, { useState, createContext, useLayoutEffect } from 'react'
import useSWR from 'swr'

export const TabsIndexContext = createContext(0)

export default function Layout({ children }) {
    const params = useParams()
    const router = useRouter()
    const teamData = useSWR(`${process.env.NEXT_PUBLIC_API_URL_2024}/api/${params.competition}/all/raw`, fetcher)
    const [tabsIndex, setTabsIndex] = useState(0)
    const [selected, setSelected] = useState([])

    const handleSubmit = (e, value) => {
        e.preventDefault()
        const options = getOptions(teamData.data)
        console.log('options', options)
        console.log('values', value)
        const filtered = value.filter(val => {
            return options.includes(val)
        })
        setSelected(filtered)
        router.push(`/2024/${params.competition}/compare/${filtered.join('/')}`)
    }

    useLayoutEffect(() => {
        if (selected.length == 0 && params.teams) setSelected(params.teams)
    }, [])

    if (teamData.isLoading) {
        return (
            <div style={{ height: 'calc(100vh - 64px)', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </div>
        )
    } else if (teamData.data) {
        const options = getOptions(teamData.data)
        const defaultValue = Array.from(new Set(params.teams))
        return (
            <TabsIndexContext.Provider value={[tabsIndex, setTabsIndex]}>
                <Container sx={{ marginBottom: '1rem' }}>
                    <Autocomplete
                        multiple
                        disablePortal
                        options={options}
                        value={selected}
                        sx={{ maxWidth: 600, marginTop: '2rem', marginInline: 'auto' }}
                        onChange={handleSubmit}
                        freeSolo
                        renderInput={(params) =>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Search sx={{ color: 'action.active', mr: 1, mt: 2 }} />
                                <TextField {...params} label="Teams" variant='standard' />
                            </Box>
                        }
                    />
                </Container>
                {children}
            </TabsIndexContext.Provider>
        )
    } else {
        return (
            <p>Error</p>
        )
    }
}