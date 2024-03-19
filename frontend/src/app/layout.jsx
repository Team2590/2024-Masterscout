import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { theme } from "./theme";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './debug.css'

// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nemesis Masterscout",
  description: "Get access to FRC 2590 - Nemesis scouting data collected during matches (not 100% accurate).",
};

export default function RootLayout({ children }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <html lang="en">
          <CssBaseline />
          <body style={{ padding: 0, margin: 0 }}>
            {children}
          </body>
        </html>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
