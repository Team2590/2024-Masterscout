'use client'
import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridCell,
    GridFooter,
    GridFooterContainer,
    GridToolbar,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport
} from '@mui/x-data-grid';
import { Button, CircularProgress } from '@mui/material';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import useSWR from 'swr';
import { fetcher } from '@/util/fetchers';
import Loading from '@/app/loading';
import { createColumn } from '@/util/createColumn';

const columns = [
    createColumn('id', 'id', 60),
    createColumn('teamNum', 'Team Number', 80),
    createColumn('matchNum', 'Match Number', 120),
    createColumn('startingPos', 'Starting Position', 150),
    createColumn('leaveWing', 'Leave Wing'),
    createColumn('spkrMade_atn', 'Speaker Made Autonomous', 150),
    createColumn('spkrMissed_atn', 'Speaker Missed Autonomous', 150),
    createColumn('ampMade_atn', 'Amp Made Autonomous', 150),
    createColumn('ampMissed+_atn', 'Amp Missed Autonomous', 150),
    createColumn('spkrMade_tp', 'Speaker Made Teleoperated', 150),
    createColumn('spkrMissed_tp', 'Speaker Missed Teleoperated', 150),
    createColumn('ampMade_tp', 'Amp Made Teleoperated', 150),
    createColumn('ampMissed_tp', 'Amp Missed Teleoperated', 150),
    createColumn('coopertition', 'Coopertition'),
    createColumn('climbLvl', 'Climb Level'),
    createColumn('Mic', 'Microphone'),
    createColumn('trap', 'Trap'),
    createColumn('traverse', 'Traverse'),
    createColumn('twoRobot', 'Two Robots'),
    createColumn('droppedHit', 'Dropped When Hit'),
]

export default function Page({ params }) {
    const { data, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL_2024}/api/${params.competition}/all/raw`, fetcher)
    const [selectionNums, setSelectionNums] = useState()
    const router = useRouter()
    const rows = [
        { id: 1, matchNum: 1, teamNum: 2590 },
        { id: 2, matchNum: 1, teamNum: 1712 }
    ]

    const compareRedirect = () => {
        router.push(`./compare?teams=${JSON.stringify(selectedTeams)}`)
        sessionStorage.setItem("compare-teams", JSON.stringify(selectedTeams))
    }

    const buttonDisabled = useMemo(() => {
        if (selectionNums == null || selectionNums.length < 2) {
            return true
        } else {
            return false
        }
    }, [selectionNums])

    const selectedTeams = useMemo(() => {
        let teams = []
        if (selectionNums && selectionNums.length > 0) {
            selectionNums.forEach(rowNum => {
                console.log(rowNum)
            })
        }
        return teams
    }, [selectionNums])

    if (data) {
        return (
            <Suspense fallback={<CircularProgress />}>
                <Box sx={{ height: '100%', width: '100%', '.MuiDataGrid-root': { border: 'none !important' }, '.MuiDataGrid-columnHeaderTitle': { textAlign: 'center !important' } }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 9,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        onRowSelectionModelChange={(idk) => {
                            setSelectionNums(idk)
                        }}
                        checkboxSelection
                        disableRowSelectionOnClick
                        slots={{
                            toolbar: () => {
                                return (
                                    <GridToolbarContainer>
                                        <GridToolbarContainer>
                                            <GridToolbarColumnsButton />
                                            <GridToolbarFilterButton />
                                            <GridToolbarDensitySelector />
                                            <GridToolbarExport />
                                            <Button
                                                // variant='contained'
                                                disabled={buttonDisabled}
                                                onClick={compareRedirect}>
                                                Compare
                                            </Button>
                                        </GridToolbarContainer>
                                    </GridToolbarContainer>
                                )
                            }
                        }}
                    />
                </Box>
            </Suspense>
        )
    } else if (isLoading) {
        return <Loading />
    } else {
        return (
            <p>Error</p>
        )
    }
}