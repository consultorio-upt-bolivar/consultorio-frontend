import { Button, Container, styled } from '@mui/material'
import { Alert, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { officesActions } from '../../../../_actions'
import { AppointmentDialog } from '../../../components/appointmentDialog'
import MedicalAppointmentsListItem from '../../../components/appointmentsListItem'
import { PublicLayout } from '../../../components/publicLayout'

const Item = styled(Paper)(_ => {
    return ({
        padding: '20px 20px',
        width: '100%'
    });
});

const OfficeInfo = ({ data }: any) => {
    return <>
        <div><b>Nombre del consultorio:</b> {data.name}</div>
        <div><b>Lugar:</b> {data.place}</div>
        <div><b>Telefono:</b> {data.phone}</div>
    </>
}

export const UserDashboardPage = (): React.ReactElement => {
    const { items = [] } = useSelector((state: any) => state.offices)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(officesActions.getAll({
            limit: 1000,
            offset: 0
        }))
    }, [])

    return (
        <PublicLayout>
            <Container
                maxWidth="xl"
                sx={{ overflow: 'hidden', my: 10, width: "100%", height: "100%" }}
            >
                <Alert severity="info">Has click en solicitar cita medica, elije fecha Y especialidad. Y te mostraremos los dias disponibles. </Alert>

                <Grid container spacing={2} justifyContent="center" style={{ marginTop: '10px', marginBottom: '50px' }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography noWrap fontWeight={500} my={2} textAlign="center">CITAS PROGRAMADAS</Typography>
                        <MedicalAppointmentsListItem />

                        <Button
                            style={{
                                margin: 'auto',
                                display: 'block'
                            }}
                            variant="outlined"
                            color="primary"
                            disabled={open}
                            onClick={() => setOpen(true)}
                        >
                            <small>
                                Solicitar cita medica
                            </small>
                        </Button>
                    </Grid>



                    <Grid item xs={12} sm={6} md={4}>
                        <Typography noWrap fontWeight={500} my={2} textAlign="center">HISTORIAL DE CITAS</Typography>
                        <MedicalAppointmentsListItem showPast={true} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Typography noWrap fontWeight={500} my={2} textAlign="center">CONSULTORIOS</Typography>

                        <Grid container spacing={2} style={{ marginTop: '30px', marginBottom: '30px' }}>
                            {items.map((el: any) => {
                                return <Grid item width="100%" padding={0} key={'office-' + el.id}>
                                    <Item elevation={1}>
                                        <OfficeInfo data={el} />
                                    </Item>
                                </Grid>
                            })}
                        </Grid>
                    </Grid>
                </Grid>

                <AppointmentDialog open={open} setOpen={setOpen} />
            </Container>
        </PublicLayout>
    )
}
