'use client'
import { Button } from '@mui/material'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import React, { useEffect, useMemo, useState } from 'react'

const createColumn = (accessorKey, header, size) => {
    return { accessorKey, header, size }
}

export default function TruePage({ data }) {
    const [rowSelection, setRowSelection] = useState({})

    const columns = useMemo(() => [
        createColumn('id', 'id', 60),
        createColumn('teamNum', 'Team Number', 80),
        createColumn('matchNum', 'Match Number', 120),
        createColumn('startingPos', 'Starting Position', 150),
        createColumn('leaveWing', 'Leave Wing'),
        createColumn('spkrMade_atn', 'Speaker Made Autonomous', 150),
        createColumn('spkrMissed_atn', 'Speaker Missed Autonomous', 150),
        createColumn('ampMade_atn', 'Amp Made Autonomous', 150),
        createColumn('ampMissed_atn', 'Amp Missed Autonomous', 150),
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
    ], [])

    const table = useMaterialReactTable({
        data,
        columns,
        enableRowSelection: true,
        positionToolbarAlertBanner: 'none',
        onRowSelectionChange: setRowSelection,
        state: { rowSelection }
    })

    return (
        <>
            <MaterialReactTable table={table} />
            <Button variant='contained'>hi</Button>
        </>
    )
}
