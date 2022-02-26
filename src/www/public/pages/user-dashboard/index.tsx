import { Button, Container } from '@mui/material'
import { Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { AppointmentDialog } from '../../../components/appointmentDialog'
import MedicalAppointmentsListItem from '../../../components/appointmentsListItem'
import { PublicLayout } from '../../../components/publicLayout'

export const UserDashboardPage = (): React.ReactElement => {
    const [open, setOpen] = useState(false)

    return (
        <PublicLayout>
            <Container
                maxWidth="xl"
                sx={{ overflow: 'hidden', width: "100%", my: 5, height: "100%" }}
            >
                <div style={{
                    paddingRight: '20px'
                }}>
                    <Button
                        style={{
                            margin: 'auto',
                            display: 'block',
                            width: "100%",
                        }}
                        color="primary"
                        variant="outlined"
                        disabled={open}
                        onClick={() => setOpen(true)}
                    >
                        <Typography noWrap fontSize="18" my={1} fontWeight={500} textAlign="center">SOLICITAR CITA MÉDICA</Typography>
                    </Button>
                </div>

                <Grid container spacing={2} justifyContent="center" style={{ marginTop: '10px' }}>
                    <Grid item xs={12} sm={6} md={6}>
                        <Typography noWrap fontWeight={500} my={2} textAlign="center">CITAS MÉDICAS PROGRAMADAS</Typography>
                        <MedicalAppointmentsListItem />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Typography noWrap fontWeight={500} my={2} textAlign="center">HISTORIAL DE CITAS MÉDICAS</Typography>
                        <MedicalAppointmentsListItem showPast={true} />
                    </Grid>
                </Grid>

                <AppointmentDialog open={open} setOpen={setOpen} />
            </Container>
        </PublicLayout>
    )
}
