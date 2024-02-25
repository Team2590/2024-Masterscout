'use client'
import { combine } from '@/util/combine'
import { fetcher } from '@/util/fetchers'
import { TeamDataUtil2024 } from '@/util/teamDataUtil2024'
import { Box, Grid, Stack, Item, TableContainer, Paper, TableHead, Table, TableCell, Divider, TableBody } from '@mui/material'
import React, { useMemo } from 'react'
import useSWR from 'swr'

export default function Page({ params }) {
    const { data, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL_2024}/api/${params.competition}/${params.team}`, fetcher)

    if (data) {
        const teamData = new TeamDataUtil2024(data)
        console.log(data)
        return (
            <>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <h1 style={{ textAlign: 'center', fontSize: '2rem' }}>{decodeURI(params.team)}</h1>
                    {/* <img src='https://placehold.co/400x400' style={{
                        borderRadius: '0.25rem',
                        height: '400',
                        width: '400',
                        margin: 'auto'
                    }} /> */}
                </div>
                <Divider style={{ maxWidth: '90vw', marginInline: 'auto' }} />
                <div style={{ marginInline: 'auto' }}>
                    <h2 style={{ textAlign: 'center' }}>Amp</h2>
                    <TableContainer sx={{ maxWidth: 1200, marginInline: 'auto' }} component={Paper}>
                        <Table>
                            <TableHead>
                                <TableCell align='center'>Min Auto</TableCell>
                                <TableCell align='center'>Min Auto Greater Than 0</TableCell>
                                <TableCell align='center'>Min Teleop</TableCell>
                                <TableCell align='center'>Min Teleop Greater Than 0</TableCell>
                                <TableCell align='center'>Average Auto</TableCell>
                                <TableCell align='center'>Average Teleop</TableCell>
                                <TableCell align='center'>Total Auto</TableCell>
                                <TableCell align='center'>Total Teleop</TableCell>
                                <TableCell align='center'>Scored Last Match Auto</TableCell>
                                <TableCell align='center'>Scored Last Match Teleop</TableCell>
                                <TableCell align='center'>Accuracy Auto</TableCell>
                                <TableCell align='center'>Accuracy Teleop</TableCell>
                            </TableHead>
                            <TableBody>
                                <TableCell align='center'>{teamData.getMinAmpAtn()}</TableCell>
                                <TableCell align='center'>{teamData.getMinAmpAtnGtr0()}</TableCell>
                                <TableCell align='center'>{teamData.getMinAmpTp()}</TableCell>
                                <TableCell align='center'>{teamData.getMinAmpTpGtr0()}</TableCell>
                                <TableCell align='center'>{teamData.getAvgAmpAtn()}</TableCell>
                                <TableCell align='center'>{teamData.getAvgAmpTp()}</TableCell>
                                <TableCell align='center'>{teamData.getTotalAmpAtn()}</TableCell>
                                <TableCell align='center'>{teamData.getTotalAmpTp()}</TableCell>
                                <TableCell align='center'>{teamData.getLastAmpAtn()}</TableCell>
                                <TableCell align='center'>{teamData.getLastAmpTp()}</TableCell>
                                <TableCell align='center'>{teamData.getAccuracyAmpAtn()}</TableCell>
                                <TableCell align='center'>{teamData.getAccuracyAmpTp()}</TableCell>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{ marginInline: 'auto', marginTop: '4rem' }}>
                    <h2 style={{ textAlign: 'center' }}>Speaker</h2>
                    <TableContainer sx={{ maxWidth: 1200, marginInline: 'auto' }} component={Paper}>
                        <Table>
                            <TableHead>
                                <TableCell align='center'>Min Auto</TableCell>
                                <TableCell align='center'>Min Auto Greater Than 0</TableCell>
                                <TableCell align='center'>Min Teleop</TableCell>
                                <TableCell align='center'>Min Teleop Greater Than 0</TableCell>
                                <TableCell align='center'>Average Auto</TableCell>
                                <TableCell align='center'>Average Teleop</TableCell>
                                <TableCell align='center'>Total Auto</TableCell>
                                <TableCell align='center'>Total Teleop</TableCell>
                                <TableCell align='center'>Scored Last Match Auto</TableCell>
                                <TableCell align='center'>Scored Last Match Teleop</TableCell>
                                <TableCell align='center'>Accuracy Auto</TableCell>
                                <TableCell align='center'>Accuracy Teleop</TableCell>
                            </TableHead>
                            <TableBody>
                                <TableCell align='center'>{teamData.getMinSpeakerAtn()}</TableCell>
                                <TableCell align='center'>{teamData.getMinSpeakerAtnGtr0()}</TableCell>
                                <TableCell align='center'>{teamData.getMinSpeakerTp()}</TableCell>
                                <TableCell align='center'>{teamData.getMinSpeakerTpGtr0()}</TableCell>
                                <TableCell align='center'>{teamData.getAvgSpeakerAtn()}</TableCell>
                                <TableCell align='center'>{teamData.getAvgSpeakerTp()}</TableCell>
                                <TableCell align='center'>{teamData.getTotalSpeakerAtn()}</TableCell>
                                <TableCell align='center'>{teamData.getTotalSpeakerTp()}</TableCell>
                                <TableCell align='center'>{teamData.getLastSpeakerAtn()}</TableCell>
                                <TableCell align='center'>{teamData.getLastSpeakerTp()}</TableCell>
                                <TableCell align='center'>{teamData.getAccuracySpeakerAtn()}</TableCell>
                                <TableCell align='center'>{teamData.getAccuracySpeakerTp()}</TableCell>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{ marginInline: 'auto', marginTop: '4rem' }}>
                    <h2 style={{ textAlign: 'center' }}>Trap</h2>
                    <TableContainer sx={{ maxWidth: 800, marginInline: 'auto' }} component={Paper}>
                        <Table>
                            <TableHead>
                                <TableCell align='center'>Min</TableCell>
                                <TableCell align='center'>Min Greater Than 0</TableCell>
                                <TableCell align='center'>Average</TableCell>
                                <TableCell align='center'>Total</TableCell>
                                <TableCell align='center'>Scored Last Match</TableCell>
                            </TableHead>
                            <TableBody>
                                <TableCell align='center'>{teamData.getMinTrap()}</TableCell>
                                <TableCell align='center'>{teamData.getMinTrapGtr0()}</TableCell>
                                <TableCell align='center'>{teamData.getAvgTrap()}</TableCell>
                                <TableCell align='center'>{teamData.getTotalTrap()}</TableCell>
                                <TableCell align='center'>{teamData.getLastTrap()}</TableCell>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </>
        )
    } else {
        return (
            <p>fuck</p>
        )
    }
}
