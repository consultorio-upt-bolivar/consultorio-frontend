import * as React from 'react';
import { Container, Box, Grid, Link, Typography, TextField } from '@mui/material';

function Copyright() {
    return (
        <React.Fragment>
            {'© '}
            {'Consultorio medico UPT '}
            {new Date().getFullYear()}
        </React.Fragment>
    );
}

export default function LayoutFooter() {
    return (
        <Typography
            component="footer"
            sx={{ display: 'flex', bgcolor: 'primary.main' }}
        >
            <Container sx={{ my: 3, display: 'flex', color: 'primary.contrastText', justifyContent: 'center', bgcolor: 'primary.main' }}>
                <Copyright></Copyright>
            </Container>
        </Typography>
    );
}