import { CircularProgress } from '@mui/material'
import React from 'react'

export default function Loading() {
    return (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <CircularProgress />
        </div>
    )
}
