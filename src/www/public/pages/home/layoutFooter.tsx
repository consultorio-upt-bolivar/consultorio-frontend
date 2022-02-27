import * as React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

function Copyright() {
    return (
        <>
            {'© '}
            {new Date().getFullYear()}
            {'. Consultorio Médico Universitario Dr. José Gregorio Hernández'}
            
        </>
    );
}

export default function LayoutFooter() {
    return (
        <Box
            component="footer"
            sx={{ display: 'block', bgcolor: 'primary.main' }}
        >
            <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ padding: '20px 30px 0' }}>
                <Grid item xs={12} md={6}>
                    <Box
                    component="img"
                    src="/images/logo_white.png"
                    alt="suitcase"
                    sx={{ width: "250px"}}
                />
                </Grid>
                <Grid item xs={12} md={6} style={{ color: 'white', textAlign: "center" }}>
                    <Copyright></Copyright>
                </Grid>
                
            </Grid>
            <Container sx={{ my: 3, display: 'flex', color: 'primary.contrastText', justifyContent: 'center', bgcolor: 'primary.main' }}>
                
                
            </Container>
        </Box>
    );
}