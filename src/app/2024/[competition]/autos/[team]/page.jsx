'use client'
import Loading from '@/app/loading'
import { fetcher } from '@/util/fetchers'
import { TableContainer, Paper, TableHead, Table, TableCell, TableBody, TableRow } from '@mui/material'
import useSWR from 'swr'
import { interpolate } from 'd3'

const keys = ['preloadNote', 'autoNote1', 'autoNote2', 'autoNote3', 'autoNote4', 'autoNote5', 'autoNote6', 'autoNote7', 'autoNote8', 'autoNote9', 'autoNote10', 'autoNote11']
const getShade = interpolate('#3f0000', '#00cc00')

export default function Page({ params }) {
    const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL_2024}/api/${params.competition}/${params.team}`, fetcher)

    const getAccuracy = (key) => {
        const filtered = data.map(d => d[key])
        console.log(filtered)
        const made = filtered.filter(val => val == 'Made').length
        const missed = filtered.filter(val => val == 'Missed').length
        const accuracy = made / missed
        return accuracy == Infinity ? 1 : 0
    }


    if (data) {
        return (
            <>
                <>
                    <div style={{ marginInline: 'auto', marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2rem', marginBottom: '-1rem', textAlign: 'center' }}>{decodeURI(params.team)}</h1>
                        <h2 style={{ textAlign: 'center' }}>Auto Data</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                            <img src='/field-image.png' style={{ maxWidth: '900px', height: 'auto' }} />
                        </div>
                        <TableContainer sx={{ maxWidth: '90vw', marginInline: 'auto' }} component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {keys.map(key => {
                                            return <TableCell key={key}>{key}</TableCell>
                                        })}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.sort((a, b) => a.matchNum - b.matchNum).map(d => {
                                        const filtered = keys.map(key => d[key])
                                        return (
                                            <TableRow key={d.id}>
                                                {filtered.map((value, index) => {
                                                    return <TableCell key={index}>{value}</TableCell>
                                                })}
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TableContainer sx={{ maxWidth: '90vw', marginInline: 'auto', marginTop: '1rem' }} component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {keys.map(key => {
                                            return <TableCell key={key}>Accuracy</TableCell>
                                        })}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {keys.map(key => {
                                        const accuracy = getAccuracy(key)
                                        const shade = getShade(accuracy)
                                        return (
                                            <TableCell sx={{ bgcolor: shade }} key={key}>{accuracy * 100}%</TableCell>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </>
            </>
        )
    } else {
        return <Loading />
    }
}
