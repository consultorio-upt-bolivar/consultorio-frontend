import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as Yup from 'yup'
import { add } from 'date-fns'
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formStyles, GetFormikFields } from './formik';
import { validationMessages } from '../constants/formik';
import { medicalAppointmentsActions, specialitiesActions } from '../../_actions';
import { AvaliableDates } from './avaliableDates';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';

export function AppointmentDialog({
    open,
    setOpen
}: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const today = new Date()
    const { items: specialitiesList } = useSelector((store: any) => store.specialities)
    const classes = formStyles()
    const dispatch = useDispatch()

    const handleClose = () => {
        const options = {
            callback: () => setOpen(false)
        }

        dispatch(medicalAppointmentsActions.getAll({
            limit: 1000,
            offset: 0,
        }, options))
    };

    // Get specialities
    useEffect(() => {
        dispatch(specialitiesActions.getAll({
            limit: 1000,
            offset: 0,
        }))
    }, [])

    const formik = useFormik({
        initialValues: {
            dateFrom: new Date(),
            dateEnd: add(today, {
                days: 5
            }),
            specialityId: ''
        },
        validationSchema: Yup.object({
            date: Yup.string().required(validationMessages.required),
            dateEnd: Yup.string().required(validationMessages.required),
            specialityId: Yup.string().required(validationMessages.required)
        }),
        onSubmit: async (values) => values,
    })

    const formikFields = GetFormikFields(formik, {
        dateFrom: {
            type: 'date',
            label: 'Fecha desde',
            readonly: false,
            disablePast: true,
            maxDate: add(today, {
                days: 30
            }),
            width: '49%'
        },
        dateEnd: {
            type: 'date',
            label: 'Fecha hasta',
            readonly: false,
            disablePast: true,
            maxDate: add(today, {
                days: 30
            }),
            width: '49%'
        }
    })

    return (
        <React.Fragment>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle style={{ textAlign: 'center' }}>Solicitar cita medica</DialogTitle>
                <DialogContent>
                    <form noValidate>
                        {formikFields}

                        <FormControl
                            variant="outlined"
                            className={classes.formControl}
                        >
                            <InputLabel className={classes.selectLabel} id='select-especialidad'>
                                Especialidad
                            </InputLabel>
                            <Select
                                labelId='select-especialidad'
                                label="specialityId"
                                {...formik.getFieldProps("specialityId")}
                            >
                                <MenuItem value="">
                                    Seleccionar
                                </MenuItem>
                                {specialitiesList?.map((el: any) => {
                                    return (
                                        <MenuItem key={el.name} value={el.id}>
                                            {el.name}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                            <FormHelperText error>
                                {formik.errors.specialityId ? formik.errors.specialityId : null}
                            </FormHelperText>
                        </FormControl>

                        <AvaliableDates submitCallback={handleClose} dateFrom={formik.values.dateFrom} dateEnd={formik.values.dateEnd} specialityId={formik.values.specialityId} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>CERRAR</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}