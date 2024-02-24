'use client'
import { fetcher } from '@/util/fetchers'
import { Box, Grid } from '@mui/material'
import React, { useMemo } from 'react'
import useSWR from 'swr'

export default function Page({ params }) {
    const { data, isLoading, error } = useSWR(`${process.env.API_URL_2024}/${params.competition}/${process.env.team}`, fetcher)

    return (
        <Grid container marginTop={'2rem'} justifyContent={'center'}>
            <Grid item xs={4} xl={3}>
                <p style={{ margin: 0, padding: 0, textAlign: 'center', fontSize: '1.5rem' }}>{decodeURI(params.team)}</p>
                <img src='https://placehold.co/400x400' style={{
                    borderRadius: '0.25rem',
                    height: '100%',
                    width: '100%',
                    margin: 0,
                    padding: 0
                }} />
            </Grid>
            <Grid item xs={8} xl={7} sx={{ textAlign: 'center' }}>
                <p>Hello world!</p>
            </Grid>
        </Grid>
    )
}
