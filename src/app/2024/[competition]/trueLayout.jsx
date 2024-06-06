'use client'
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, Toolbar, Tooltip } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { red } from '@mui/material/colors'
import Link from 'next/link'
import React, { Suspense, useState } from 'react'
import Loading from '@/app/loading'

export default function TrueLayout({ children, params }) {
    const [drawerState, setDrawerState] = useState(false)

    const redirects = {
        compare: `/2024/${params.competition}/compare`,
        ranking: `/2024/${params.competition}`,
        teams: `/2024/${params.competition}/teams`
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
                        <ListItemButton sx={{ p: 3 }} role='link' component={Link} href={redirects.compare}>
                            Compare
                        </ListItemButton>
                        <ListItemButton sx={{ p: 3 }} role='link' component={Link} href={redirects.ranking}>
                            Ranking
                        </ListItemButton>
                        <ListItemButton sx={{ p: 3 }} role='link' component={Link} href={redirects.teams}>
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
