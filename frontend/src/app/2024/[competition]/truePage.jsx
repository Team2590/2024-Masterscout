'use client'
import { Box, Button, Tooltip } from '@mui/material'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import React, { useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { download, generateCsv, mkConfig } from 'export-to-csv';

const createColumn = (accessorKey, header, size, extra) => {
    return { accessorKey, header, size, ...extra }
}


export default function TruePage({ data }) {
    const [rowSelection, setRowSelection] = useState({})
    const router = useRouter()
    const params = useParams()

    const csvConfig = mkConfig({
        fieldSeparator: ',',
        decimalSeparator: '.',
        useKeysAsHeaders: true,
        filename: `${params.competition} export`
    })

    const handleExportData = () => {
        const csv = generateCsv(csvConfig)(data)
        download(csvConfig)(csv)
    }

    const getShade = (key, value) => {
        const max = Math.max(...data.map(d => {
            return d[key]
        }))
        const step = max / 4
        if (value == 0) {
            return
        } else if (value < step) {
            return 'hsl(147, 100%, 10%)'
        } else if (value < step * 2) {
            return 'hsl(147, 100%, 20%)'
        } else if (value < step * 3) {
            return 'hsl(147, 100%, 30%)'
        } else {
            return 'hsl(147, 100%, 40%)'
        }
    }

    const createSummedColumn = (accessorKey, header, size, extra) => {
        return {
            accessorKey, header, size, ...extra, aggregationFn: 'sum', AggregatedCell: ({ cell }) => {
                const shade = getShade(accessorKey, cell.getValue())
                return <Box sx={{ background: shade, color: 'white', paddingBlock: 0.5, textAlign: 'center', fontSize: '1rem', borderRadius: '0.125rem' }}>{cell.getValue()}</Box>
            },
        }
    }

    const columns = useMemo(() => [
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
        createSummedColumn('totalGamePieces', 'Total Game Pieces'),
        createSummedColumn('spkrMade_atn', 'Speaker Made Autonomous', 150),
        createSummedColumn('spkrMissed_atn', 'Speaker Missed Autonomous', 150),
        createSummedColumn('ampMade_atn', 'Amp Made Autonomous', 150),
        createSummedColumn('ampMissed_atn', 'Amp Missed Autonomous', 150),
        createSummedColumn('spkrMade_tp', 'Speaker Made Teleoperated', 150),
        createSummedColumn('spkrMissed_tp', 'Speaker Missed Teleoperated', 150),
        createSummedColumn('ampMade_tp', 'Amp Made Teleoperated', 150),
        createSummedColumn('ampMissed_tp', 'Amp Missed Teleoperated', 150),
        createColumn('climbLvl', 'Climb Level'),
        createColumn('trap', 'Trap'),
        createColumn('coopertition', 'Coopertition'),
        createColumn('Mic', 'Microphone'),
        createColumn('traverse', 'Traverse'),
        createColumn('twoRobot', 'Two Robots'),
        createColumn('droppedHit', 'Dropped When Hit'),
        createColumn('matchNum', 'Match Number', 120),
        createColumn('startingPos', 'Starting Position', 150),
        createColumn('leaveWing', 'Leave Wing'),
        createColumn('id', 'id', 60),
    ], [])

    const selectedTeams = Object.keys(rowSelection).filter(row => {
        return row.includes('teamNum')
    }).map(key => {
        return parseInt(key.replace('teamNum:', ''))
    })

    const compareTeams = () => {
        router.push(`/2024/${params.competition}/compare/${selectedTeams.join('/')}`)
    }

    const isComparedDisabled = selectedTeams.length < 2

    const table = useMaterialReactTable({
        data,
        columns,
        enableRowSelection: true,
        positionToolbarAlertBanner: 'none',
        onRowSelectionChange: setRowSelection,
        state: { rowSelection },
        enableGrouping: true,
        enableColumnPinning: true,
        initialState: {
            expanded: false,
            pagination: { pageIndex: 0, pageSize: 20 },
            grouping: ['teamNum'],
            sorting: [
                {
                    id: 'totalGamePieces',
                    desc: true
                }
            ],
            density: 'compact',
            columnPinning: { left: ['teamNum'] }
        },
        renderBottomToolbarCustomActions: ({ table }) => {
            return (
                <div>
                    <Tooltip title='Download CSV'>
                        <Button
                            onClick={() => handleExportData(table.getSelectedRowModel().rows)}
                            color='inherit'
                            variant='contained'
                            sx={{ marginLeft: '0.5rem' }}
                        >
                            Download CSV
                        </Button>
                    </Tooltip>
                    <Tooltip title='Compare'>
                        <Button
                            aria-label='compare'
                            variant='contained'
                            disabled={isComparedDisabled}
                            color='inherit'
                            onClick={compareTeams}
                            sx={{ marginLeft: '1.5rem' }}
                        >
                            Compare
                        </Button>
                    </Tooltip >
                </div>
            )
        }
    })

    return (
        <>
            <MaterialReactTable table={table} />
        </>
    )
}
