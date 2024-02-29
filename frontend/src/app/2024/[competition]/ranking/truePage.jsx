'use client'
import { Button, IconButton, Tooltip } from '@mui/material'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import CompareIcon from '@mui/icons-material/Compare';
import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { red } from '@mui/material/colors';

const createColumn = (accessorKey, header, size, extra) => {
    return { accessorKey, header, size, ...extra }
}

const createSummedColumn = (accessorKey, header, size, extra) => {
    return { accessorKey, header, size, ...extra, aggregationFn: 'sum', AggregatedCell: ({ cell }) => <span>{cell.getValue()}</span>, }
}

export default function TruePage({ data }) {
    const [rowSelection, setRowSelection] = useState({})
    const router = useRouter()
    const params = useParams()

    const columns = useMemo(() => [
        createColumn('id', 'id', 60),
        createColumn('teamNum', 'Team Number', 80, {
            Cell: ({ renderedCellValue }) => (
                <Link
                    href={`/2024/${params.competition}/teams/${renderedCellValue}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    {renderedCellValue}
                </Link>
            ),
        }),
        createColumn('matchNum', 'Match Number', 120),
        createColumn('startingPos', 'Starting Position', 150),
        createColumn('leaveWing', 'Leave Wing'),
        createSummedColumn('spkrMade_atn', 'Speaker Made Autonomous', 150),
        createSummedColumn('spkrMissed_atn', 'Speaker Missed Autonomous', 150),
        createSummedColumn('ampMade_atn', 'Amp Made Autonomous', 150),
        createSummedColumn('ampMissed_atn', 'Amp Missed Autonomous', 150),
        createSummedColumn('spkrMade_tp', 'Speaker Made Teleoperated', 150),
        createSummedColumn('spkrMissed_tp', 'Speaker Missed Teleoperated', 150),
        createSummedColumn('ampMade_tp', 'Amp Made Teleoperated', 150),
        createSummedColumn('ampMissed_tp', 'Amp Missed Teleoperated', 150),
        createColumn('coopertition', 'Coopertition'),
        createColumn('climbLvl', 'Climb Level'),
        createColumn('Mic', 'Microphone'),
        createColumn('trap', 'Trap'),
        createColumn('traverse', 'Traverse'),
        createColumn('twoRobot', 'Two Robots'),
        createColumn('droppedHit', 'Dropped When Hit'),
    ], [])

    const compareTeams = () => {
        const selectedTeams = Array.from(new Set(
            Object.keys(rowSelection).map(index => {
                return data[index].teamNum
            })
        ))
        router.push(`/2024/${params.competition}/compare/${selectedTeams.join('/')}`)
    }

    const isComparedDisabled = () => {
        if (Object.keys(rowSelection).length < 2) {
            return false
        }
        if (selected.every(team => {
            team == data[Object.keys(rowSelection)[0]].teamNum
        })) {
            return false
        }
        return true
    }

    const table = useMaterialReactTable({
        data,
        columns,
        enableRowSelection: true,
        positionToolbarAlertBanner: 'none',
        onRowSelectionChange: setRowSelection,
        state: { rowSelection },
        enableGrouping: true,
        initialState: {
            expanded: false,
            pagination: { pageIndex: 0, pageSize: 20 },
            grouping: ['teamNum'],
        },
        renderBottomToolbarCustomActions: ({ table }) => {
            return (
                <Tooltip title='Compare'>
                    <Button
                        aria-label='compare'
                        sx={{ marginTop: '2px' }}
                        variant='contained'
                        disabled={isComparedDisabled}
                        color='inherit'
                        onClick={compareTeams}
                    >
                        Compare
                    </Button>
                </Tooltip >
            )
        }
    })

    return (
        <>
            <MaterialReactTable table={table} />
        </>
    )
}
