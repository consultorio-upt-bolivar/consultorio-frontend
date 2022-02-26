import * as React from 'react';
import BannerLayout from './bannerLayout';
import { formStyles } from '../../../components/formik';
import { Roles } from '../../../../_api';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { AppHistory } from '../../../../helpers';

const backgroundImage = '/images/banner_home.jpg';

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
        <BannerLayout
            sxBackground={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundColor: '#7fc7d9', // Average color of the background image.
                backgroundPosition: 'center',
            }}
        >
            <Typography color="inherit" align="center" variant="h2">
                Bienvenido al consultorio médico UPT
            </Typography>
            <Typography
                color="inherit"
                align="center"
                variant="h5"
                sx={{ mt: "15px", display: "block" }}
            >
                Solicita tu cita médica!
            </Typography>

            <Button
                color="primary"
                variant="contained"
                size="large"
                sx={{ mt: "20px" }}
                className={classes.submit}
                onClick={() => AppHistory.replace(!userData ? "/login" : redirectUrls[userData.profile.id])}
            >
                {!userData ? "Iniciar sesion" : "Ingresar"}
            </Button>
        </BannerLayout >
    );
}