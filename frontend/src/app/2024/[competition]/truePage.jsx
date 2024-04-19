'use client'
import { Box, Button, Tooltip, Checkbox } from '@mui/material'
import { MRT_TopToolbar, MaterialReactTable, getAllLeafColumnDefs, useMaterialReactTable } from 'material-react-table'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { download, generateCsv, mkConfig } from 'export-to-csv'
import { combine } from '@/util/combine'
import { TeamDataUtil2024 } from '@/util/teamDataUtil2024'

const createColumn = (accessorKey, header, extra) => {
    return { accessorKey, header, ...extra }
}

export default function TruePage({ data }) {
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

    const getShade = useCallback((key, value) => {
        const tempMap = new Map()
        const temp = data.map(d => {
            return { teamNum: d.teamNum, value: d[key] }
        })
        temp.forEach(({ teamNum, value }) => {
            if (tempMap.has(teamNum)) tempMap.set(teamNum, tempMap.get(teamNum) + value)
            else tempMap.set(teamNum, value)
        })
        const allAggregated = tempMap.values()

        const max = Math.max(...allAggregated)
        const min = Math.min(...allAggregated)
        const step = max / 4
        if (key.toLowerCase().includes('miss')) {
            if (value == 0) {
                return '#00d600'
            } else if (value < step) {
                return '#129700'
            } else if (value < step * 2) {
                return '#255800'
            } else if (value < step * 3) {
                return '#2e3900'
            } else {
                return '#3f0000'
            }
        } else {
            if (value == 0) {
                return '#3f0000'
            } else if (value < step) {
                return '#2e3900'
            } else if (value < step * 2) {
                return '#255800'
            } else if (value < step * 3) {
                return '#129700'
            } else {
                return '#00d600'
            }
        }
    }, [data])

    const createSummedColumn = useCallback((accessorKey, header, size, extra) => {
        return {
            accessorKey, header, size, ...extra, aggregationFn: 'sum', AggregatedCell: ({ cell }) => {
                const shade = getShade(accessorKey, cell.getValue())
                return <Box
                    sx={{
                        background: shade,
                        color: 'white',
                        paddingBlock: 0.5,
                        textAlign: 'center',
                        fontSize: '1rem',
                    }}
                >
                    {cell.getValue()}
                </Box>
            },
        }
    }, [actualData])

    const createAccuracyColumn = (accessorKey, header, extra) => {
        return {
            accessorKey, header, aggregationFn: 'accuracy', ...extra,
            AggregatedCell: ({ cell }) => {
                // const shade = getShade(accessorKey, cell.getValue())
                return <Box
                    // sx={{
                    //     background: shade,
                    //     color: 'white',
                    //     paddingBlock: 0.5,
                    //     textAlign: 'center',
                    //     fontSize: '1rem',
                    //     borderRadius: '0.125rem'
                    // }}
                    textAlign='center'
                >
                    {cell.getValue()}
                </Box>
            }
        }
    }

    const createAverageColumn = (accessorKey, header) => {
        return {
            accessorKey, header, aggregationFn: 'customAverage', AggregatedCell: ({ cell }) => {
                return <Box textAlign='center'>{cell.getValue()}</Box>
            }
        }
    }

    const columns = useMemo(() => [
        createColumn('teamNum', 'Team Number', {
            Cell: ({ cell }) => (
                <Link
                    href={`/2024/${params.competition}/teams/${cell.getValue()}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    {cell.getValue()}
                </Link>
            ),
            GroupedCell: ({ cell }) => {
                const teamNum = cell.getValue()
                const entries = data.filter(d => {
                    return Number(teamNum) == d.teamNum
                }).length
                return (
                    <Link
                        href={`/2024/${params.competition}/teams/${cell.getValue()}`}
                        style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'center' }}
                    >
                        {teamNum} ({entries})
                    </Link>
                )
            }
        }),
        createSummedColumn('totalGamePieces', 'Total Game Pieces'),
        createAverageColumn('spkrAvg_atn', 'Speaker Avg Autonomous'),
        createAverageColumn('ampAvg_atn', 'Amp Avg Autonomous'),
        createAverageColumn('spkrAvg_tp', 'Speaker Avg Teleoperated'),
        createAverageColumn('ampAvg_tp', 'Amp Avg Teleoperated'),
        createAccuracyColumn('spkrAtnAccuracy', 'Speaker Accuracy Autonomous'),
        createAccuracyColumn('spkrTpAccuracy', 'Speaker Accuracy Teleoperated'),
        createAccuracyColumn('ampAtnAccuracy', 'Amp Accuracy Autonomous'),
        createAccuracyColumn('ampTpAccuracy', 'Amp Accuracy Teleoperated'),
        createSummedColumn('notesFed', 'Notes Fed'),
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
        createColumn('matchNum', 'Match Number', { size: 150 }),
        createColumn('startingPos', 'Starting Position', { size: 150 }),
        createColumn('leaveWing', 'Leave Wing'),
        createColumn('id', 'id', { size: 150 }),
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

    const toggleOnlyClimb = (e) => {
        if (e.target.checked) {
            const teams = new Set(data.map(d => {
                return d.teamNum
            }))
            const teamsCanClimb = []
            teams.forEach(team => {
                const filtered = data.filter(({ teamNum }) => {
                    return team == teamNum
                }).map(({ climbLvl }) => {
                    return climbLvl
                })

                if (filtered.includes('Climb')) teamsCanClimb.push(team)
            })
            const filteredData = data.filter(({ teamNum }) => {
                return teamsCanClimb.some(team => team == teamNum)
            })
            setActualData(filteredData)
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
        positionToolbarAlertBanner: 'none',
        onRowSelectionChange: setRowSelection,
        state: { rowSelection },
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableStickyHeader,
        enableMultiSort: true,
        aggregationFns: {
            accuracy: (columnId, leafRows, childRows) => {
                const teamNum = Number(leafRows[0].original.teamNum)
                const type = columnId
                let totalScored = 0
                let totalMissed = 0
                const teamData = data.filter(({ teamNum: num }) => {
                    return num == teamNum
                })
                const getTotal = (key) => {
                    return teamData.map(d => {
                        return Number(d[key])
                    }).reduce((total, num) => { return total += num }, 0)
                }
                switch (type) {
                    case 'spkrAtnAccuracy': {
                        totalScored = getTotal('spkrMade_atn')
                        totalMissed = getTotal('spkrMissed_atn')
                        break
                    }

                    case 'spkrTpAccuracy': {
                        totalScored = getTotal('spkrMade_tp')
                        totalMissed = getTotal('spkrMissed_tp')
                        break
                    }

                    case 'ampAtnAccuracy': {
                        totalScored = getTotal('ampMade_atn')
                        totalMissed = getTotal('ampMissed_atn')
                        break
                    }

                    case 'ampTpAccuracy': {
                        totalScored = getTotal('ampMade_tp')
                        totalMissed = getTotal('ampMissed_tp')
                        break
                    }

                    default: {
                        return 'N/A'
                    }
                }

                const accuracy = totalScored / (totalScored + totalMissed)
                if (isNaN(accuracy)) {
                    return 0
                } else {
                    return parseFloat(accuracy).toFixed(2)
                }
            },
            customAverage: (columnId, leafRows, childRows) => {
                const data = leafRows.map(({ original }) => {
                    return original
                })
                const teamData = new TeamDataUtil2024(data)
                switch (columnId) {
                    case 'spkrAvg_atn':
                        return teamData.getAvgSpeakerAtn()
                    case 'ampAvg_atn':
                        return teamData.getAvgAmpAtn()
                    case 'spkrAvg_tp':
                        return teamData.getAvgSpeakerTp()
                    case 'ampAvg_tp':
                        return teamData.getAvgAmpTp()
                }
            }
        },
        initialState: {
            expanded: false,
            pagination: { pageIndex: 0, pageSize: 100 },
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
            },
        },
    })

    return (
        <>
            <MaterialReactTable table={table} muiTableContainerProps={{ sx: { maxHeight: '100px' } }} />
        </>
    )
}
