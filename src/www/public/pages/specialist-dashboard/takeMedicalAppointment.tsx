import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, useTheme } from '@mui/material';
import * as Yup from 'yup'
import { format } from 'date-fns'
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { formStyles, GetFormikFields } from '../../../components/formik';
import { appointmentsActions, medicalAppointmentsActions, specialitiesActions } from '../../../../_actions';
import { MedicalAppointmentsApi } from '../../../../_api';
import { getConfiguration } from '../../../../config/api.config';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: '16px',
    cursor: 'pointer',
}));

export function TakeMedicalAppointmentDialog({
    medicalAppointment,
    setMedicalAppointment,
    open,
    setOpen
}: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    medicalAppointment: number | undefined;
    setMedicalAppointment: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
    const [data, setData] = useState<any>(false)
    const [loading, setLoading] = useState<any>(false)
    const [historyList, setHistoryList] = useState<any[]>([])
    const { items: specialitiesList } = useSelector((store: any) => store.specialities)
    const classes = formStyles()
    const dispatch = useDispatch()

    const getMedicalAppointment = async () => {
        if (!medicalAppointment) return;

        try {
            setLoading(true)

            const api = new MedicalAppointmentsApi(getConfiguration());

            const res = await api.getOneMedicalAppointments(medicalAppointment);

            setData(res.data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getAppointments = async () => {
        if (!data) return;

        try {
            setLoading(true)

            const api = new MedicalAppointmentsApi(getConfiguration());

            const res = await api.getAllMedicalAppointments(1000, 0, `user.id==${data?.user?.id}`);

            setHistoryList(res.data.results.filter((el: any) => {
                return el.schedule.speciality.id == data.schedule.speciality.id && el.report != null && el.report.length
            }));
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        setMedicalAppointment(undefined)
        setOpen(false)
    };

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault()

        if (!formik.isValid || !medicalAppointment) return;

        formik.submitForm().then(values => {
            const options: any = {
                report: values.report
            }

            if (values.refferedSpecialityId) {
                options.refferedSpecialityId = values.refferedSpecialityId;
            }

            dispatch(medicalAppointmentsActions.updateOne(+medicalAppointment, options, {
                callback: getMedicalAppointment
            }))
        })
    }

    const handleCancel = (e: React.MouseEvent) => {
        e.preventDefault()

        if (!formik.isValid || !medicalAppointment) return;

        formik.submitForm().then(values => {
            dispatch(appointmentsActions.cancelAppointment(+medicalAppointment, values.cancellationReason,
                getMedicalAppointment))
        })
    }

    // Get specialities
    useEffect(() => {
        dispatch(specialitiesActions.getAll({
            limit: 25000,
            offset: 0,
            where: "isActive==1"
        }))
    }, [])

    // Get data
    useEffect(() => {
        if (!medicalAppointment) return;
        getMedicalAppointment()
    }, [medicalAppointment])

    // Edit form listener
    useEffect(() => {
        if (data) {
            const options = {
                date: format(new Date(data.date), 'yyyy-MM-dd HH:mm'),
                specialityId: data.schedule.speciality.name,
                userId: data.user.name,
                cancellationReason: data?.cancellationReason ?? "",
                report: data?.report ?? "",
                refferedSpecialityId: data.refferedSpeciality?.id ?? ''
            }

            formik.setValues(options)

            getAppointments()
        }
    }, [data])

    const formik = useFormik({
        initialValues: {
            date: '',
            specialityId: '',
            userId: '',
            cancellationReason: '',
            report: '',
            refferedSpecialityId: ''
        },
        validationSchema: Yup.object({
            refferedSpecialityId: Yup.string().nullable(),
            report: Yup.string().nullable(),
            cancellationReason: Yup.string().nullable()
        }),
        onSubmit: async (values) => values,
    })

    const staticFields = ({
        date: {
            label: 'Fecha',
            readonly: true,
            type: 'text',
            width: '49%'
        },
        specialityId: {
            label: 'Especialidad',
            readonly: true,
            type: 'text',
            width: '49%'
        },
        userId: {
            label: 'Usuario',
            type: 'text',
            readonly: true,
            width: '100%'
        }
    })

    const formikStaticFields = GetFormikFields(formik, staticFields)

    return (
        <React.Fragment>
            <Dialog
                fullScreen={true}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle style={{ textAlign: 'center', background: "#9e9e9e14" }}>Atender cita medica</DialogTitle>
                <DialogContent sx={{ mt: 0 }}>
                    <Grid container spacing={4} sx={{ mt: 1 }} justifyContent={"center"}>
                        <Grid item xs={12} md={5}>
                            <Typography variant='h5' noWrap fontWeight={500} my={2} textAlign="center">Formulario de cita medica</Typography>

                            <form noValidate>
                                {formikStaticFields}

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    multiline
                                    fullWidth
                                    id="cancellationReason"
                                    label='Razon de cancelación'
                                    rows={6}
                                    required={false}
                                    {...formik.getFieldProps("cancellationReason")}
                                />

                                <FormHelperText className={classes.errorText} error>
                                    {formik.touched["cancellationReason"] && formik.errors["cancellationReason"]
                                        ? formik.errors["cancellationReason"]
                                        : null}
                                </FormHelperText>

                                <Box mt={2} display="flex" justifyContent="end">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        disabled={loading || data?.report}
                                        onClick={(e) => handleCancel(e)}
                                    >
                                        {data?.cancellationDate && data?.cancellationReason ? 'Actualizar razon de cancelación' : "Cancelar Cita"}
                                    </Button>
                                </Box>

                                <div style={{
                                    width: "100%"
                                }}>
                                    <br /><Divider /><br />
                                </div>

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    multiline
                                    fullWidth
                                    id="report"
                                    label='Reporte'
                                    rows={6}
                                    required={false}
                                    {...formik.getFieldProps("report")}
                                />

                                <FormHelperText className={classes.errorText} error>
                                    {formik.touched["report"] && formik.errors["report"]
                                        ? formik.errors["report"]
                                        : null}
                                </FormHelperText>

                                <FormControl
                                    variant="outlined"
                                    className={classes.formControl}
                                >
                                    <InputLabel className={classes.selectLabel} id='select-especialidad'>
                                        Referir a otra especialidad (Opcional)
                                    </InputLabel>
                                    <Select
                                        labelId='select-especialidad'
                                        label="refferedSpecialityId"
                                        {...formik.getFieldProps("refferedSpecialityId")}
                                    >
                                        <MenuItem value="">
                                            Ninguna
                                        </MenuItem>
                                        {specialitiesList?.map((el: any) => {
                                            return (
                                                <MenuItem key={el.name} value={el.id}>
                                                    {el.name}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                    <FormHelperText error id="my-helper-text">
                                        {formik.errors.refferedSpecialityId ? formik.errors.refferedSpecialityId : null}
                                    </FormHelperText>
                                </FormControl>

                                <Box mt={2} display="flex" justifyContent="end">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        disabled={loading || (data?.cancellationReason && data?.cancellationDate)}
                                        onClick={(e) => handleSubmit(e)}
                                    >
                                        Guardar reporte
                                    </Button>
                                </Box>
                            </form>
                        </Grid>
                        
                        <Grid item xs={12} md={5}>
                            <Typography variant='h5' noWrap fontWeight={500} my={2} textAlign="center">Reportes medicos previos</Typography>
                            
                            {historyList.length > 0 ? 
                                <Grid container spacing={2} style={{ marginTop: '30px', marginBottom: '30px' }}>
                                    {historyList.map((el: any) => {
                                        return <Grid item width="100%" padding={0} key={'history-' + el.id}>
                                            <Item elevation={1}>
                                                <div style={{
                                                    textAlign: "right",
                                                    fontSize: "12px",
                                                    fontWeight: 600,
                                                    padding: "8px"
                                                }}>{format(new Date(el.date), "yyyy-MM-dd")}</div>
                                                <div style={{
                                                    textAlign: "justify",
                                                    fontSize: "16px",
                                                    padding: "0px 20px 8px 20px",
                                                }}>{el.report}</div>
                                            </Item>
                                        </Grid>
                                    })}
                                </Grid> : 
                                <Alert severity="info" style={{ marginTop: "40px" }}>El usuario no posee reportes medicos previos.</Alert>
                            }
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions style={{ textAlign: 'center', background: "#9e9e9e14" }}>
                    <Button style={{
                        display: "block",
                        margin: "auto",
                        width: "300px",
                    }} color="primary" variant="outlined" onClick={handleClose}>CERRAR</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}