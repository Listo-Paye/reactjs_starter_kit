import * as React from "react"
import "./app.css"
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme.tsx";
import {Navigate, Route, Routes} from "react-router";

const Home = React.lazy(() => import("./home"))

// @ts-ignore
const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
            <Route path="/" element={
                <React.Suspense fallback={<>...</>}>
                    <Home />
                </React.Suspense>
            } />
        </Routes>
        <Routes>
            <Route path="*"  element={<Navigate to="/" replace />} />
        </Routes>
    </ThemeProvider>
)

export default App
