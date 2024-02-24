'use client'
import { Autocomplete, Container, TextField, Snackbar, IconButton, InputAdornment, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Search } from '@mui/icons-material';
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import Loading from '@/app/loading';

export default function Page() {
    const router = useRouter()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const options = [
        { label: '2590', id: 1 },
        { label: '1712', id: 2 },
        { label: '1492', id: 3 },
    ]

    const handleSubmit = (e, value) => {
        setLoading(true)
        console.log(options.some(option => option.label == value))
        if (options.some(option => option.label == value)) {
            router.push(`./teams/${value}`)
        } else {
            setError(true)
            setLoading(false)
        }
    }

    return (
        <Container>
            <Autocomplete
                disablePortal
                freeSolo
                id="combo-box-demo"
                options={options}
                sx={{ maxWidth: 600, marginTop: '2rem', marginInline: 'auto' }}
                onChange={handleSubmit}
                renderInput={(params) =>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Search sx={{ color: 'action.active', mr: 1, mt: 2 }} />
                        <TextField {...params} label="Team" variant='standard' onSubmit={handleSubmit} />
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
            {loading && <Loading />}
        </Container>
    )
}
