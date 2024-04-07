'use client'
import { Autocomplete, Container, TextField, Snackbar, IconButton, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Search } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import React, { useLayoutEffect, useState, createContext } from 'react'
import Loading from '@/app/loading'
import useSWR from 'swr'
import { fetcher } from '@/util/fetchers'
import { optionIsValid } from '@/util/optionIsValid'
import { getOptions } from '@/util/getOptions'

export const TabsIndexContext = createContext(0)

export default function Layout({ params, children }) {
    const router = useRouter()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState([])
    const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL_2024}/api/${params.competition}/all/teams`, fetcher)
    const [tabIndex, setTabIndex] = useState(0)

    useLayoutEffect(() => {
        if (data) {
            setOptions(getOptions(data))
        }
    }, [data])

    const handleSubmit = (e, value) => {
        if (typeof value == 'number' || typeof value == 'string') {
            value = { label: value.toString(), id: options.indexOf(option => option.label == value) }
        }
        setLoading(true)
        if (value == null) {
            router.push(`/2024/${params.competition}/teams`)
        } else if (options.some(option => { return option == value.label })) {
            router.push(`/2024/${params.competition}/teams/${value.label}`)
        } else {
            setError(true)
            setLoading(false)
        }
    }

    return (
        <TabsIndexContext.Provider value={[tabIndex, setTabIndex]}>
            <Container>
                <Autocomplete
                    disablePortal
                    freeSolo
                    id="combo-box-demo"
                    options={options}
                    sx={{ maxWidth: 600, marginTop: '2rem', marginInline: 'auto' }}
                    onChange={handleSubmit}
                    onSubmit={handleSubmit}
                    renderInput={(params) =>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Search sx={{ color: 'action.active', mr: 1, mt: 2 }} />
                            <TextField {...params} label="Team" variant='standard' />
                        </Box>
                    }
                />
                <Snackbar
                    open={error}
                    autoHideDuration={6000}
                    onClose={() => setError(false)}
                    message="Error, team not in competition"
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={() => setError(false)}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                />
            </Container>
            {children}
        </TabsIndexContext.Provider>
    )
}
