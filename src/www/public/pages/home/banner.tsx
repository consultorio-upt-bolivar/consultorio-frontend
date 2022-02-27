import * as React from 'react';
import { formStyles } from '../../../components/formik';
import { Roles } from '../../../../_api';
import { useSelector } from 'react-redux';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { AppHistory } from '../../../../helpers';
import { styled } from '@mui/material/styles';
import { ArrowDownwardOutlined } from '@material-ui/icons';

const backgroundImage = '/images/img_home.png';

const LayoutRoot = styled('section')(({ theme }) => ({
    width: "100%",
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        minHeight: 500,
        maxHeight: 1300,
    },
}));

export default function BannerHome() {
    const userData = useSelector((state: any) => state.authentication.user)
    const classes = formStyles()

    const redirectUrls: any = {
        [Roles.Admin]: "/admin",
        [Roles.Admin2]: "/admin",
        [Roles.MedicalSpecialist]: "/especialista-dashboard",
        [Roles.Student]: "/dashboard",
        [Roles.Family]: "/dashboard",
        [Roles.Employee]: "/dashboard",
    }

    return (
        <LayoutRoot>
            <Container
                sx={{
                    width: "100%",
                    mt: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    position: "relative"
                }}
            >
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Typography
                            color="primary"
                            align="left"
                            variant="h4"
                            sx={{ mt: "40px", display: "block", fontSize: "36px", fontWeight: "500" }}
                        >
                            ¡Bienvenido <br />
                            al consultorio médico!
                        </Typography>
                        <Typography
                            color="secondary"
                            align="left"
                            variant="h5"
                            sx={{ mt: "30px", mb: "30px", display: "block", fontSize: "18px", fontWeight: "400" }}
                        >
                            Nuestro objetivo es brindar servicios de salud <br /> de óptima calidad, confiables y oportunos, <br /> que garanticen una adecuada atención.
                        </Typography>

                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            sx={{ mt: "0" }}
                            className={classes.submit}
                            onClick={() => AppHistory.replace(!userData ? "/login" : redirectUrls[userData.profile.id])}
                        >
                            {!userData ? "solicitar cita" : "Ingresar"}
                        </Button>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <svg width={"100%"} style={{
                            backgroundImage: `url(${backgroundImage})`,
                            height: "450px",
                            backgroundSize: "100% 100%"
                        }}></svg>
                    </Grid>
                </Grid>
                <Box
                    sx={{ position: 'absolute', bottom: 32, width: "100%", textAlign: "center" }}
                >
                    <ArrowDownwardOutlined style={{ width: "50px", height: "50px" }}></ArrowDownwardOutlined>
                </Box>
            </Container>
        </LayoutRoot>
    );
}