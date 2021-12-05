import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as Yup from 'yup'
import { format } from 'date-fns'
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { formStyles, GetFormikFields } from '../../../../common/components/formik';
import { appointmentsActions, medicalAppointmentsActions, specialitiesActions } from '../../../../_actions';

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
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { loading, data } = useSelector((store: any) => store.medicalAppointments)
    const { items: specialitiesList } = useSelector((store: any) => store.specialities)
    const classes = formStyles()
    const dispatch = useDispatch()

    const getMedicalAppointment = () => {
        if (!medicalAppointment) return;
        dispatch(medicalAppointmentsActions.getOne(+medicalAppointment, {
            toast: false
        }))
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
            limit: 1000,
            offset: 0,
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
                cancellationReason: data.cancellationReason,
                report: data.report,
                refferedSpecialityId: data.refferedSpeciality?.id ?? ''
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
            type: 'text',
            width: '49%'
        },
        specialityId: {
            label: 'Especialidad',
            type: 'text',
            width: '49%'
        },
        userId: {
            label: 'Usuario',
            type: 'text',
            width: '100%'
        }
    })

    const formikStaticFields = GetFormikFields(formik, staticFields)

    return (
        <React.Fragment>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle style={{ textAlign: 'center' }}>Atender cita medica</DialogTitle>
                <DialogContent>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>CERRAR</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}