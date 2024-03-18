'use client'
import Loading from '@/app/loading'
import { fetcher } from '@/util/fetchers'
import { TeamDataUtil2024 } from '@/util/teamDataUtil2024'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TableContainer, Paper, TableHead, Table, TableCell, Divider, TableBody, TableRow, Box } from '@mui/material'
import React, { useEffect } from 'react'
import useSWR from 'swr'

export default function Page({ params }) {
    const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL_2024}/api/${params.competition}/${params.team}`, fetcher)
    const [tabIndex, setTabIndex] = React.useState(0)

    const handleChange = (e, val) => {
        setTabIndex(val);
    }

    if (data) {
        const teamData = new TeamDataUtil2024(data)
        console.log(teamData.data)
        return (
            <>
                <Tabs value={tabIndex} onChange={handleChange}>
                    <Tab label='Tables' sx={{ marginInline: 'auto', width: '100%' }} />
                    <Tab label='Charts' sx={{ marginInline: 'auto', width: '100%' }} />
                </Tabs>
                {tabIndex == 0 && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                            <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '-1rem' }}>{decodeURI(params.team)}</h1>
                            <p style={{ textAlign: 'center', fontSize: '1.25rem' }}>Total Game Pieces: {teamData.getTotalGamePieces()}</p>
                            {/* <img src='https://placehold.co/400x400' style={{
                        borderRadius: '0.25rem',
                        height: '400',
                        width: '400',
                        margin: 'auto'
                    }} /> */}
                        </div>
                        <div style={{ marginInline: 'auto' }}>
                            <h2 style={{ textAlign: 'center' }}>Amp</h2>
                            <TableContainer sx={{ maxWidth: 1200, marginInline: 'auto' }} component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
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
                                        <TableRow>
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
                                        <TableRow>
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
                                            <TableCell align='center'>Min</TableCell>
                                            <TableCell align='center'>Min Greater Than 0</TableCell>
                                            <TableCell align='center'>Average</TableCell>
                                            <TableCell align='center'>Total</TableCell>
                                            <TableCell align='center'>Scored Last Match</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align='center'>{teamData.getMinTrap()}</TableCell>
                                            <TableCell align='center'>{teamData.getMinTrapGtr0()}</TableCell>
                                            <TableCell align='center'>{teamData.getAvgTrap()}</TableCell>
                                            <TableCell align='center'>{teamData.getTotalTrap()}</TableCell>
                                            <TableCell align='center'>{teamData.getLastTrap()}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div style={{ marginInline: 'auto', marginBottom: '2rem' }}>
                            <h2 style={{ textAlign: 'center' }}>Raw Data</h2>
                            <TableContainer sx={{ maxWidth: '90vw', marginInline: 'auto' }} component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {Object.keys(data[0]).map(key => {
                                                return <TableCell key={key}>{key}</TableCell>
                                            })}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map(d => {
                                            return (
                                                <TableRow key={d.id}>
                                                    {Object.values(d).map((value, index) => {
                                                        return <TableCell key={index}>{value}</TableCell>
                                                    })}
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
                    <></>
                )}
            </>
        )
    } else {
        return <Loading />
    }
}
