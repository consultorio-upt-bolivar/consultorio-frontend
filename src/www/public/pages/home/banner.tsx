import * as React from 'react';
import { formStyles } from '../../../components/formik';
import { Roles } from '../../../../_api';
import { useSelector } from 'react-redux';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { AppHistory } from '../../../../helpers';
import { styled } from '@mui/material/styles';
import { ArrowDownwardOutlined } from '@material-ui/icons';
import theme from '../../../../theme/main';

const backgroundImage = '/images/img_home.png';

import {
    makeStyles,
} from '@mui/styles';

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

const useStyles = makeStyles({
    hideMobile: {
        [theme.breakpoints.down('md')]: {
            display: "none"
        },
    }

})

export default function BannerHome() {
    const userData = useSelector((state: any) => state.authentication.user)
    const classes = formStyles()
    const styles = useStyles()

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
                    mt: 5,
                    mb: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    position: "relative"
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}>
                        <Typography
                            color="primary"
                            align="left"
                            variant="h4"
                            sx={{display: "block", fontSize: "36px", fontWeight: "500" }}
                        >
                            ¡Bienvenido <br />
                            al consultorio médico!
                        </Typography>
                        <Typography
                            color="secondary"
                            align="left"
                            variant="h5"
                            sx={{ mt: "30px", mb: "30px", paddingRight: "80px", display: "block", fontSize: "18px", fontWeight: "400" }}
                        >
                            Nuestro objetivo es brindar servicios de salud de óptima calidad, confiables y oportunos, que garanticen una adecuada atención.
                        </Typography>

                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            sx={{ mt: "0", maxWidth: "190px"}}
                           
                            onClick={() => AppHistory.replace(!userData ? "/login" : redirectUrls[userData.profile.id])}
                        >
                            {!userData ? "solicitar cita" : "Ingresar"}
                        </Button>
                    </Grid>

                    <Grid item xs={12} md={6} className={styles.hideMobile}>
                        <svg width={"100%"} style={{
                            backgroundImage: `url(${backgroundImage})`,
                            height: "450px",
                            backgroundSize: "98% 100%",
                            backgroundRepeat: "no-repeat"
                        }}></svg>
                    </Grid>
                </Grid>
            </Container>
        </LayoutRoot>
    );
}