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

function HomeServices() {
    return (
        <Box>
            <Typography
                component="div"
                color="primary"
                align="center"
                variant="h4"
                sx={{ mb: 15, mt: 10, display: "block", fontSize: "36px", fontWeight: "500" }}
            >
                SERVICIOS
            </Typography>

            <Container sx={{ display: 'flex', justifyContent: "center", alignItems: "center", position: 'relative' }}>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={3}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src={process.env.PUBLIC_URL + "/images/general.png"}
                                alt="suitcase"
                                sx={{ height: 80 }}
                            />
                            <Typography variant="h6" color="#3a3a3a" sx={{ my: 5, textAlign: "center", fontSize: "18" }}>
                                Medicina general
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src={process.env.PUBLIC_URL + "/images/internist.png"}
                                alt="graph"
                                sx={{ height: 80 }}
                            />
                            <Typography variant="h6" color="#3a3a3a" sx={{ my: 5, textAlign: "center", fontSize: "18" }}>
                                Medicina Interna
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box sx={item}>
                            <Box style={{
                                width: "70px",
                                height: "70px"
                            }}>
                                <img
                                    src={process.env.PUBLIC_URL + "/images/gynecologist.png"}
                                    alt="clock"
                                    style={{ height: 80 }}
                                >
                                </img>
                            </Box>

                            <Typography variant="h6" color="#3a3a3a" sx={{ my: 5, textAlign: "center", fontSize: "18" }}>
                                Ginecología
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src={process.env.PUBLIC_URL + "/images/cardiology.png"}
                                alt="clock"
                                sx={{ height: 80 }}
                            />
                            <Typography variant="h6" color="#3a3a3as" sx={{ my: 5, textAlign: "center", fontSize: "18" }}>
                                Cardiología
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default HomeServices;