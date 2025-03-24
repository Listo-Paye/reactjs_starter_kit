import * as React from "react"
import "./app.css"
import {Box, Container, CssBaseline, Link, ThemeProvider, Typography} from "@mui/material";
import theme from "./theme.tsx";

// @ts-ignore
const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Container maxWidth="sm">
            <Box sx={{my: 4}}>
                <Typography variant="h4" component="h1" sx={{mb: 2}}>
                    Main example
                </Typography>

                <Copyright/>
            </Box>
        </Container>
    </ThemeProvider>
)

export default App

const Copyright: React.FC = () => (
    <Typography
        variant="body2"
        align="center"
        sx={{
            color: 'text.secondary',
        }}
    >
        {'Copyright © '}
        <Link color="inherit" href="https://septeo.com/">
            SEPTEO
        </Link>{' '}
        {new Date().getFullYear()}.
    </Typography>
)
