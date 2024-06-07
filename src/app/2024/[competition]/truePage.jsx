'use client'
import { Box, Button, Tooltip, Checkbox } from '@mui/material'
import { MRT_TopToolbar, MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import React, { useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { download, generateCsv, mkConfig } from 'export-to-csv'
import * as d3 from 'd3'
import { maxBy } from 'lodash'
import '@/styles/ranking.css'

const getShade = d3.interpolate('#3f0000', '#00cc00')

export default function TruePage({ rawData, data }) {
    const [rowSelection, setRowSelection] = useState({})
    const [actualData, setActualData] = useState(data)
    const [enableStickyHeader, setStickyHeader] = useState(false)
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

    const createColumnUnshaded = (accessorKey, header, extra) => {
        return {
            accessorKey, header, size: 100, ...extra,
        }
    }

    const createColumn = (accessorKey, header, filterFn, filterVariant, extra) => {
        const max = maxBy(data, d => d[accessorKey])[accessorKey]
        return {
            accessorKey, header, size: 100, filterFn, filterVariant, ...extra,
            Cell: ({ renderedCellValue, row }) => {
                let percent = data.filter(({ teamNum }) => teamNum == row.original.teamNum)[0][accessorKey] / max
                if (accessorKey.includes('Missed')) percent = 1 / percent
                const shade = getShade(Math.pow(percent, 1.15))

                return (
                    <Box
                        sx={{
                            background: shade,
                            color: 'white',
                            paddingBlock: 0.5,
                            textAlign: 'center',
                            fontSize: '1rem',
                        }}
                    >
                        {renderedCellValue}
                    </Box>
                )
            },
        }
    }

    const columns = useMemo(() => [
        createColumnUnshaded('teamNum', 'Team Number', {
            Cell: ({ cell }) => (
                <Link
                    href={`/2024/${params.competition}/teams/${cell.getValue()}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    {cell.getValue()}
                </Link>
            )
        }),
        createColumn('totalGamePieces', 'Total Pieces'),
        createColumn('avgFed', 'Avg Notes Fed'),
        createColumn('spkrAvgAtn', 'Spkr Avg Atn'),
        createColumn('ampAvgAtn', 'Amp Avg Atn'),
        createColumn('spkrAvgTp', 'Speaker Avg Tp'),
        createColumn('ampAvgTp', 'Amp Avg Tp'),
        createColumn('spkrAtnAccuracy', 'Speaker Acc Atn'),
        createColumn('spkrTpAccuracy', 'Speaker Acc Tp'),
        createColumn('ampAtnAccuracy', 'Amp Acc Atn'),
        createColumn('ampTpAccuracy', 'Amp Acc Tp'),
        createColumn('notesFed', 'Notes Fed'),
        createColumn('spkrMade_atn', 'Speaker Made Atn', 150),
        createColumn('spkrMissed_atn', 'Speaker Missed Atn', 150),
        createColumn('ampMade_atn', 'Amp Made Atn', 150),
        createColumn('ampMissed_atn', 'Amp Missed Atn', 150),
        createColumn('spkrMade_tp', 'Speaker Made Tp', 150),
        createColumn('spkrMissed_tp', 'Speaker Missed Tp', 150),
        createColumn('ampMade_tp', 'Amp Made Tp', 150),
        createColumn('ampMissed_tp', 'Amp Missed Tp', 150),
    ], [])

    const selectedTeams = Object.keys(rowSelection).map(index => data[index].teamNum)

    const compareTeams = () => {
        router.push(`/2024/${params.competition}/compare/${selectedTeams.join('/')}`)
    }

    const isComparedDisabled = Object.keys(rowSelection).length < 2

    const toggleOnlyClimb = (e) => {
        if (e.target.checked) {
            setActualData(data.filter(({ canClimb }) => canClimb))
        } else {
            setActualData(data)
        }
    }

    const toggleStickyHeader = (e) => {
        setStickyHeader(e.target.checked)
    }

    const table = useMaterialReactTable({
        data: actualData,
        columns,
        enableRowSelection: true,
        enableMultiRowSelection: true,
        enableBatchRowSelection: true,
        enableSelectAll: true,
        onRowSelectionChange: setRowSelection,
        state: { rowSelection },
        positionToolbarAlertBanner: 'none',
        enableGrouping: true,
        enableColumnPinning: true,
        enableColumnFilterModes: true,
        enableStickyHeader,
        enableMultiSort: true,
        initialState: {
            expanded: false,
            pagination: { pageIndex: 0, pageSize: 30 },
            sorting: [
                {
                    id: 'totalGamePieces',
                    desc: true
                }
            ],
            density: 'compact',
            columnPinning: { left: ['teamNum'] },
            rowSelection: true
        },
        renderTopToolbar: ({ table }) => {
            return (
                <div style={{ margin: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <Button
                            onClick={() => handleExportData(table.getSelectedRowModel().rows)}
                            color='inherit'
                            variant='contained'
                            sx={{ marginLeft: '0.5rem' }}
                        >
                            Download CSV
                        </Button>
                        <Button
                            aria-label='compare'
                            variant='contained'
                            color='inherit'
                            onClick={() => table.resetSorting(true)}
                            sx={{ marginLeft: '1.5rem' }}
                        >
                            Reset Sorting
                        </Button>
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
                        <Box sx={{ display: 'inline-flex', marginLeft: '1.5rem', alignItems: 'center' }}>
                            <span>Only Climb</span>
                            <Checkbox onChange={toggleOnlyClimb} />
                        </Box>
                        <Box sx={{ display: 'inline-flex', marginLeft: '0.75rem', alignItems: 'center' }}>
                            <span>Sticky Header</span>
                            <Checkbox onChange={toggleStickyHeader} />
                        </Box>
                    </div>
                    <div style={{ minWidth: 216 }}>
                        <MRT_TopToolbar table={table} />
                    </div>
                </div>
            )
        },
        muiTableProps: {
            sx: {
                border: '1px solid rgba(81, 81, 81, .5)',
                caption: {
                    captionSide: 'top',
                },
                'MuiTableCell-head': {
                    'PrivateSwitchBase-input': {
                        marginLeft: 40
                    }
                }
            },
        },
        muiTableHeadCellProps: {
            sx: {
                border: '1px solid rgba(81, 81, 81, .5)',
                fontWeight: 'normal',
            },
        },
        muiTableBodyCellProps: {
            sx: {
                border: '1px solid rgba(81, 81, 81, .5)',
                padding: 0,
                textAlign: 'center'
            },
        },
    })

    return (
        <>
            <MaterialReactTable table={table} />
        </>
    )
}
