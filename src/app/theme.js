'use client'
import { createTheme } from "@mui/material";
import { pink, red } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: red,
        secondary: pink,
    },
})