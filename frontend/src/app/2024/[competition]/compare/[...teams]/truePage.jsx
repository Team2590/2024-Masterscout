'use client'
import Loading from '@/app/loading'
import { TeamDataUtil2024 } from '@/util/teamDataUtil2024'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useMemo } from 'react'

export default function TruePage({ teamsData }) {
    const params = useParams()
    const teamsDataUtil = useMemo(() => {
        return teamsData.map(team => {
            return new TeamDataUtil2024(team)
        })
    }, [teamsData])

    if (teamsData) {
        return (
            <>
                <div style={{ marginInline: 'auto', marginTop: '4rem' }}>
                    <h2 style={{ textAlign: 'center' }}>Amp</h2>
                    <TableContainer sx={{ maxWidth: 1200, marginInline: 'auto' }} component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>Team</TableCell>
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {teamsDataUtil.map(teamData => {
                                    const { teamNum } = teamData.data[0]
                                    return (
                                        <TableRow key={teamNum}>
                                            <TableCell align='center' sx={{ fontSize: '1.25rem' }}>
                                                <Link
                                                    href={`/2024/${params.competition}/teams/${teamNum}`}
                                                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                                                >
                                                    {teamNum}
                                                </Link>
                                            </TableCell>
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
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{ marginInline: 'auto', marginTop: '4rem' }}>
                    <h2 style={{ textAlign: 'center' }}>Speaker</h2>
                    <TableContainer sx={{ maxWidth: 1200, marginInline: 'auto' }} component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>Team</TableCell>
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {teamsDataUtil.map(teamData => {
                                    const { teamNum } = teamData.data[0]
                                    return (
                                        <TableRow key={teamNum}>
                                            <TableCell align='center' sx={{ fontSize: '1.25rem' }}>
                                                <Link
                                                    href={`/2024/${params.competition}/teams/${teamNum}`}
                                                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                                                >
                                                    {teamNum}
                                                </Link>
                                            </TableCell>
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
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{ marginInline: 'auto', marginTop: '4rem', paddingBottom: '2rem' }}>
                    <h2 style={{ textAlign: 'center' }}>Trap</h2>
                    <TableContainer sx={{ maxWidth: 800, marginInline: 'auto' }} component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>Team</TableCell>
                                    <TableCell align='center'>Min</TableCell>
                                    <TableCell align='center'>Min Greater Than 0</TableCell>
                                    <TableCell align='center'>Average</TableCell>
                                    <TableCell align='center'>Total</TableCell>
                                    <TableCell align='center'>Scored Last Match</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {teamsDataUtil.map(teamData => {
                                    const { teamNum } = teamData.data[0]
                                    return (
                                        <TableRow key={teamNum}>
                                            <TableCell align='center' sx={{ fontSize: '1.25rem' }}>
                                                <Link
                                                    href={`/2024/${params.competition}/teams/${teamNum}`}
                                                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                                                >
                                                    {teamNum}
                                                </Link>
                                            </TableCell>
                                            <TableCell align='center'>{teamData.getMinTrap()}</TableCell>
                                            <TableCell align='center'>{teamData.getMinTrapGtr0()}</TableCell>
                                            <TableCell align='center'>{teamData.getAvgTrap()}</TableCell>
                                            <TableCell align='center'>{teamData.getTotalTrap()}</TableCell>
                                            <TableCell align='center'>{teamData.getLastTrap()}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </>
        )
    } else {
        return (
            <Loading />
        )
    }
}
