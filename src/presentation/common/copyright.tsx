import * as React from "react";
import {Link, Typography} from "@mui/material";

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

export default Copyright
