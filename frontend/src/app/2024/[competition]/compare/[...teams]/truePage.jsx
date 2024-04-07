'use client'
import Loading from '@/app/loading'
import { TeamDataUtil2024 } from '@/util/teamDataUtil2024'
import { Box, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material'
import { BarChart } from '@mui/x-charts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useMemo, useContext } from 'react'
import { TabsIndexContext } from '../layout'

export default function TruePage({ teamsData }) {
    const params = useParams()
    const teamsDataUtil = useMemo(() => {
        return teamsData.map(team => {
            return new TeamDataUtil2024(team)
        })
    }, [teamsData])
    const [tabIndex, setTabIndex] = useContext(TabsIndexContext)

    const getAllMatchNums = () => {
        if (teamsDataUtil) {
            return teamsDataUtil.map(teamData => {
                return teamData.data.map(data => {
                    return data.matchNum
                })
            }).flat().flat().sort((a, b) => { return a - b })
        }
        return 0
    }

    const getAllMatchNumsNormalized = () => {
        return new Array(Math.max(...getAllMatchNums())).fill(0).map((val, index) => { return index })
    }

    const getMaxMatches = () => {
        const teamsNumOfMatches = teamsDataUtil.map(teamData => {
            return teamData.getTotalNumOfMatches()
        })

        return Math.max(...teamsNumOfMatches)
    }

    const getMaxMatchesAsArray = () => {
        return new Array(getMaxMatches()).fill(0).map((_, index) => {
            return `${index + 1}`
        })
    }

    if (teamsData) {
        return (
            <>
                <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)} sx={{ marginTop: '0.5rem' }}>
                    <Tab label='Tables' sx={{ marginInline: 'auto', width: '100%' }} />
                    <Tab label='Charts' sx={{ marginInline: 'auto', width: '100%' }} />
                </Tabs>
                {tabIndex == 0 && (
                    <>
                        <div style={{ marginInline: 'auto', marginTop: '4rem' }}>
                            <TableContainer sx={{ width: 'fit-content', marginInline: 'auto' }} component={Paper}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>Team</TableCell>
                                        <TableCell align='center'>Total Game Pieces</TableCell>
                                        <TableCell align='center'>Can Climb</TableCell>
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
                                                <TableCell align='center'>{teamData.getTotalGamePieces()}</TableCell>
                                                <TableCell align='center'>{teamData.canClimb() ? 'Yes' : 'No'}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </TableContainer>
                        </div>
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
                )}
                {tabIndex == 1 && (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                            <Box width='fit-content'>
                                <Typography variant='h5' textAlign='center'>Averages</Typography>
                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: ['Avg Spkr Auto', 'Avg Spkr Tele', 'Avg Amp Auto', 'Avg Amp Tele'], dataKey: 'teamNum' }]}
                                    series={teamsDataUtil.map(teamData => {
                                        return { data: [teamData.getAvgSpeakerAtn(), teamData.getAvgSpeakerTp(), teamData.getAvgAmpAtn(), teamData.getAvgAmpTp()], label: String(teamData.data[0].teamNum) }
                                    })}
                                    width={500}
                                    height={300}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                            <Box width='fit-content'>
                                <Typography variant='h5' textAlign='center'>Amp Auto Scores per Game</Typography>
                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: getMaxMatchesAsArray(), label: 'Game Played' }]}
                                    series={teamsDataUtil.map(teamData => {
                                        return { data: teamData.getAmpAutoScores(), label: String(teamData.data[0].teamNum) }
                                    })}
                                    width={500}
                                    height={300}
                                />
                            </Box>
                            <Box width='fit-content'>
                                <Typography variant='h5' textAlign='center'>Amp Teleoperated Scores per Game</Typography>
                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: getMaxMatchesAsArray(), label: 'Game Played' }]}
                                    series={teamsDataUtil.map(teamData => {
                                        return { data: teamData.getAmpTeleopScores(), label: String(teamData.data[0].teamNum) }
                                    })}
                                    width={500}
                                    height={300}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                            <Box width='fit-content'>
                                <Typography variant='h5' textAlign='center'>Speaker Auto Scores per Game</Typography>
                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: getMaxMatchesAsArray(), label: 'Game Played' }]}
                                    series={teamsDataUtil.map(teamData => {
                                        return { data: teamData.getSpeakerAutoScores(), label: String(teamData.data[0].teamNum) }
                                    })}
                                    layout='vertical'
                                    width={500}
                                    height={300}
                                />
                            </Box>
                            <Box width='fit-content'>
                                <Typography variant='h5' textAlign='center'>Speaker Teleoperated Scores per Game</Typography>
                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: getMaxMatchesAsArray(), label: 'Game Played' }]}
                                    series={teamsDataUtil.map(teamData => {
                                        return { data: teamData.getSpeakerTeleopScores(), label: String(teamData.data[0].teamNum) }
                                    })}
                                    width={500}
                                    height={300}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                            <Box width='fit-content'>
                                <Typography variant='h5' textAlign='center'>Total Amp Scores per Game</Typography>
                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: getMaxMatchesAsArray(), label: 'Game Played' }]}
                                    series={teamsDataUtil.map(teamData => {
                                        return { data: teamData.getTotalAmpScores(), label: String(teamData.data[0].teamNum) }
                                    })}
                                    width={500}
                                    height={300}
                                />
                            </Box>
                            <Box width='fit-content'>
                                <Typography variant='h5' textAlign='center'>Total Speaker Scores per Game</Typography>
                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: getMaxMatchesAsArray(), label: 'Game Played' }]}
                                    series={teamsDataUtil.map(teamData => {
                                        return { data: teamData.getTotalSpeakerScores(), label: String(teamData.data[0].teamNum) }
                                    })}
                                    width={500}
                                    height={300}
                                />
                            </Box>
                        </Box>
                    </>
                )}
            </>
        )
    } else {
        return (
            <Loading />
        )
    }
}
