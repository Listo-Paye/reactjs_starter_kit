import * as React from 'react'
import {Box, Container, Typography} from "@mui/material"
import {Copyright} from "@presentation";
import {useHomeViewModel} from "../home.viewmodel"

const Home: React.FC = () => {
    const {userName, refresh, login} = useHomeViewModel()

    React.useEffect(() => {
        login().then(() => {
            refresh().then()
        })
    }, [])

    return (
        <Container maxWidth="sm">
            <Box sx={{my: 4}}>
                <Typography variant="h4" component="h1" sx={{mb: 2}}>
                    Bonjour {userName}
                </Typography>

                <Copyright/>
            </Box>
        </Container>
    )
}

export default Home
