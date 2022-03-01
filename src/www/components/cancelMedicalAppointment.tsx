import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import * as Yup from 'yup'
import { format } from 'date-fns'
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, FormHelperText, TextField } from '@mui/material';
import { formStyles, GetFormikFields } from './formik';
import { alertActions, appointmentsActions, specialitiesActions } from '../../_actions';
import { MedicalAppointmentsApi } from '../../_api';
import { getConfiguration } from '../../config/api.config';
import { validationMessages } from '../../constants/formik';
import { loadingActions } from '../../_actions/loading.actions';

export function CancelMedicalAppointmentDialog({
    medicalAppointmentId,
    setMedicalAppointment,
    open,
    setOpen,
    getMedicalAppointments
}: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    medicalAppointmentId: number | undefined;
    setMedicalAppointment: React.Dispatch<React.SetStateAction<number | undefined>>;
    getMedicalAppointments: () => void
}) {
    const [data, setData] = useState<any>(false)
    const [loading, setLoading] = useState<any>(false)
    const classes = formStyles()
    const dispatch = useDispatch()

    const getMedicalAppointment = async () => {
        if (!medicalAppointmentId) return;

        try {
            setLoading(true)

            const api = new MedicalAppointmentsApi(getConfiguration());

            const res = await api.getOneMedicalAppointments(medicalAppointmentId);

            setData(res.data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        getMedicalAppointments()
        setMedicalAppointment(undefined)
        dispatch(loadingActions.hide())
        setOpen(false)
        setLoading(false)
    };

    const handleCancel = async (e: React.MouseEvent) => {
        e.preventDefault()

        const errors = await formik.validateForm();
    
        formik.setErrors(errors);
    
        if (!formik.isValid || Object.keys(errors).length > 0) {
            return;
        }

        if (!medicalAppointmentId) return;

        formik.submitForm().then(values => {
            dispatch(alertActions.show({
                title: `Confirmar`,
                description: `¿Está seguro de cancelar esta cita médica?`,
                callback: () => {
                    dispatch(loadingActions.show())
                    setLoading(true);

                    dispatch(appointmentsActions.cancelAppointment(
                        +medicalAppointmentId, 
                        values.cancellationReason,
                        handleClose
                    ))
                }
            }));
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
        if (!medicalAppointmentId) return;
        getMedicalAppointment()
    }, [medicalAppointmentId])

    // Edit form listener
    useEffect(() => {
        if (data) {
            const options = {
                date: format(new Date(data.date), 'yyyy-MM-dd HH:mm'),
                specialityId: data.schedule.speciality.name,
                userId: data.user.name,
                cancellationReason: data?.cancellationReason ?? ""
            }

            formik.setValues(options)
        }
    }, [data])

    const formik = useFormik({
        initialValues: {
            date: '',
            specialityId: '',
            userId: '',
            cancellationReason: '',
        },
        validationSchema: Yup.object({
            cancellationReason: Yup.string().required(validationMessages.required).min(10, validationMessages.minLength.replace("$", "10"))
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
                fullScreen={false}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle style={{ textAlign: 'center', background: "#9e9e9e14" }}>Cancelar cita médica</DialogTitle>
                <DialogContent sx={{ mt: 0 }}>
                    <Grid container spacing={4} sx={{ mt: 1 }} justifyContent={"center"}>
                        <Grid item xs={12}>
                            <form noValidate>
                                {formikStaticFields}

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    multiline
                                    fullWidth
                                    id="cancellationReason"
                                    label='Razón de cancelación'
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
                                        disabled={loading || !formik.isValid || data.cancellationDate || (data.report && data.report.length > 0)}
                                        onClick={(e) => handleCancel(e)}
                                    >
                                        Cancelar Cita médica
                                    </Button>
                                </Box>
                            </form>
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