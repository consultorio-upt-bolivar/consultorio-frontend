import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

const item: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
};

function HomeInfo() {
    return (
        <Box>
            <Typography
                component="div"
                color="primary"
                align="center"
                variant="h4"
                sx={{ mb: 15, display: "block", fontSize: "36px", fontWeight: "500" }}
            >
                SOBRE NOSOTROS
            </Typography>

            <Container sx={{ display: 'flex', position: 'relative' }}>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src="/images/goal.png"
                                alt="suitcase"
                                sx={{ height: 80 }}
                            />
                            <Typography variant="h6" color="#3a3a3as" sx={{ my: 5, textAlign: "justify" }}>
                                Objetivo
                            </Typography>
                            <Typography variant="h5" sx={{ textAlign: "justify", fontWeight: 300 }}>
                                Brindar servicios de salud de óptima calidad, confiables y oportunos, que garanticen una adecuada atención humana; con la finalidad de satisfacer las necesidades y expectativas de los trabajadores de la universidad y su grupo familiar, así como también de los estudiantes; en un ambiente agradable, en excelentes condiciones.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src="/images/flag.png"
                                alt="graph"
                                sx={{ height: 80 }}
                            />
                            <Typography variant="h6" color="#3a3a3as" sx={{ my: 5, textAlign: "justify"}}>
                                Misión
                            </Typography>
                            <Typography variant="h5" sx={{ textAlign: "justify", fontWeight: 300 }}>
                                Garantizar el derecho a la protección de la salud, brindando servicios médicos con el propósito de satisfacer de manera eficaz y eficiente las necesidades de cuidado de salud de la comunidad estudiantil y trabajadora; para generar un impacto en el mejoramiento de su calidad de vida y contribuir con el desarrollo social de la región en el contexto de la protección social.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src="/images/mission.png"
                                alt="clock"
                                sx={{ height: 80 }}
                            />
                            <Typography variant="h6" color="#3a3a3as" sx={{ my: 5, textAlign: "justify" }}>
                                Visión
                            </Typography>
                            <Typography variant="h5" sx={{ textAlign: "justify", fontWeight: 300 }}>
                                Ser un consultorio médico universitario referente en la prestación de servicios médicos integrales; por los modelos de atención, excelencia y aportes de calidad, confianza y seguridad en los servicios de salud que reciben todos los trabajadores, familiares y estudiantes; consolidando así la protección, promoción de la salud y prevención de enfermedades.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default HomeInfo;