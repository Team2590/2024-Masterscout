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
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        renderCell: (params) => (
            <Link href={`./teams/${params.value}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>{params.value}</Link>
        )
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function Page({ params }) {
    const [selectionNums, setSelectionNums] = useState()
    const router = useRouter()

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
                console.log(rows[rowNum - 1].lastName)
                teams.push(rows[rowNum - 1].lastName)
            })
        }
        return teams
    }, [selectionNums])

    // useEffect(() => {
    //     console.log(selectionNums)
    //     console.log(buttonDisabled)
    //     console.log(selectedTeams)
    // }, [selectionNums])

    return (
        <Suspense fallback={<CircularProgress />}>
            <Box sx={{ height: '100%', width: '100%', '.MuiDataGrid-root': { border: 'none !important' } }}>
                <DataGrid
                    rows={rows}
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
}