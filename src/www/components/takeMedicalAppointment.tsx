import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import * as Yup from 'yup'
import { format } from 'date-fns'
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { formStyles, GetFormikFields } from './formik';
import { alertActions, medicalAppointmentsActions, specialitiesActions } from '../../_actions';
import { MedicalAppointmentsApi } from '../../_api';
import { getConfiguration } from '../../config/api.config';
import { validationMessages } from '../../constants/formik';
import { loadingActions } from '../../_actions/loading.actions';

const ReportInfo = ({ data }: any) => {
    return <Grid item width="100%" padding={0}>
        <Box style={{
            border: "1px solid silver",
            borderRadius: "3px",
            marginBottom: "10px"
        }}>
            <div className='d-flex justify-content-between' style={{
                borderBottom: "1px solid silver",
                padding: "10px 15px",
                background: "#5eaab1",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Typography sx={{ fontSize: 16 }} margin="0">
                    Especialidad: {data.schedule.speciality.name}
                </Typography>

                <Typography sx={{ fontSize: 14 }} margin="0">
                    {format(new Date(data.date), "yyyy-MM-dd HH:mm")}
                </Typography>
            </div>

            <Box style={{ padding: "10px 15px", overflow: 'hidden' }}>
                <Typography sx={{ fontSize: 16 }} margin="0">
                    Especialista: {data.schedule.specialist.name}
                </Typography>

                <Typography sx={{ fontSize: 16 }} margin="0">
                    Reporte médico: {data.report}
                </Typography>
            </Box>

            {data.refferedSpeciality ? <div style={{
                borderTop: "1px solid silver",
                padding: "10px 15px"
            }}>
                <Typography sx={{ fontSize: 14 }} margin="0">
                    Referido a: {data.refferedSpeciality.name}
                </Typography>
            </div> : null}
        </Box>
    </Grid >
}

export function TakeMedicalAppointmentDialog({
    medicalAppointment,
    setMedicalAppointment,
    open,
    setOpen,
    getMedicalAppointments
}: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    medicalAppointment: number | undefined;
    setMedicalAppointment: React.Dispatch<React.SetStateAction<number | undefined>>;
    getMedicalAppointments: () => void;
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

            const filtered = res.data.results.filter((el: any) => {
                return el.report && el.report.length > 0 && !el.cancellationDate && el.id != data.id;
            })

            setHistoryList(filtered && filtered.length ? filtered : []);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        getMedicalAppointments()
        setMedicalAppointment(undefined)
        setOpen(false)
        setLoading(false)
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

            setLoading(true);

            dispatch(alertActions.show({
                title: `Confirmar`,
                description: `¿Está seguro de guardar los datos?`,
                callback: () => {
                    dispatch(medicalAppointmentsActions.updateOne(+medicalAppointment, options, {
                        callback: getMedicalAppointment
                    }))
                }
            }));
        })
    }

    // Loading circle
    useEffect(() => {
        if(loading) {
            dispatch(loadingActions.show())
        } else {
            dispatch(loadingActions.hide())
        }
    }, [loading])

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
            report: '',
            refferedSpecialityId: ''
        },
        validationSchema: Yup.object({
            refferedSpecialityId: Yup.string().nullable(),
            report: Yup.string().required(validationMessages.required).min(10, validationMessages.minLength.replace("$", "10"))
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
            label: 'Especialidad médica',
            readonly: true,
            type: 'text',
            width: '49%'
        },
        userId: {
            label: 'Paciente',
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
                <DialogTitle style={{ textAlign: 'center', background: "#9e9e9e14" }}>Atender cita médica</DialogTitle>
                <DialogContent sx={{ mt: 0 }}>
                    <Grid container spacing={4} sx={{ mt: 1 }} justifyContent={"center"}>
                        <Grid item xs={12} md={5}>
                            <Typography variant='h5' noWrap fontWeight={500} my={2} textAlign="center">Formulario de cita médica</Typography>

                            <form noValidate>
                                {formikStaticFields}

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
                                        disabled={loading || !formik.isValid || data.cancellationDate || (data.report && data.report.length > 0)}
                                        onClick={(e) => handleSubmit(e)}
                                    >
                                        Guardar reporte
                                    </Button>
                                </Box>
                            </form>
                        </Grid>

                        <Grid item xs={12} md={5}>
                            <Typography variant='h5' noWrap fontWeight={500} my={2} textAlign="center">Historial Médico</Typography>

                            {historyList.length ?
                                <Grid container spacing={0} style={{ marginTop: '40px', marginBottom: '30px' }}>
                                    {historyList.map((el: any) => {
                                        return <ReportInfo key={'history-' + el.id} data={el} />
                                    })}
                                </Grid> :
                                <Alert severity="info" style={{ marginTop: "40px" }}>El usuario no posee reportes médicos previos.</Alert>
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