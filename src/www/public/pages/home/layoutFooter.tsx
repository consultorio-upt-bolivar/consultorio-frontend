import * as React from 'react';
import { Container, Typography } from '@mui/material';

function Copyright() {
    return (
        <>
            {'© '}
            {'Consultorio Médico Universitario Dr. José Gregorio Hernández UPT Bolívar '}
            {new Date().getFullYear()}
        </>
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