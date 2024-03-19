'use client'
import { AppBar, Box, Drawer, IconButton, List, ListItemButton, Toolbar, Tooltip } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { red } from '@mui/material/colors'
import Link from 'next/link'
import React, { Suspense, useState } from 'react'
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';

export default function TrueLayout({ children, params }) {
    const router = useRouter()
    const [drawerState, setDrawerState] = useState(false)

    const redirects = {
        compare: () => router.push(`/2024/${params.competition}/compare`),
        ranking: () => router.push(`/2024/${params.competition}`),
        teams: () => router.push(`/2024/${params.competition}/teams`)
    }

    return (
        <>
            <AppBar position='static' sx={{ boxShadow: 'none', bgcolor: red[600] }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Tooltip title='Menu'>
                        <IconButton
                            size='large'
                            edge='start'
                            color='inherit'
                            aria-label='menu'
                            sx={{ mr: 2 }}
                            onClick={() => setDrawerState(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                    <Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}><p>NEM<span style={{ fontSize: '0.95rem' }}>Ǝ</span>SIS Masterscout™®© | <span>{decodeURI(params.competition)}</span> | <span>2024</span></p></Link>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor='left'
                open={drawerState}
                onClose={() => setDrawerState(false)}
            >
                <Box sx={{
                    width: 256,
                    bgcolor: red[600],
                    minHeight: '100%',
                    color: 'white',
                }}>
                    <List sx={{ margin: 0, padding: 0 }}>
                        <ListItemButton sx={{ p: 3 }} onClick={redirects.compare} role='link'>
                            Compare
                        </ListItemButton>
                        <ListItemButton sx={{ p: 3 }} onClick={redirects.ranking} role='link'>
                            Ranking
                        </ListItemButton>
                        <ListItemButton sx={{ p: 3 }} onClick={redirects.teams} role='link'>
                            Teams
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer >
            <Box>
                <Suspense fallback={<Loading />}>
                    {children}
                </Suspense>
            </Box>
        </>
    )
}
