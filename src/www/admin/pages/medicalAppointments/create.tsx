// React
import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { add } from 'date-fns'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Container, FormControl, InputLabel, MenuItem, Select, FormHelperText, Typography } from '@material-ui/core'

import {
    formStyles,
    GetFormikFields
} from '../../../../common/components/formik'

import { AdminLayout } from '../../components/adminLayout'

// Variable
import { specialitiesActions } from '../../../../_actions'
import { AvaliableDates } from '../../components/avaliableDates'
import { validationMessages } from '../../../../common/constants/formik'

export function CreateMedicalAppointmentPage(): React.ReactElement {
    const today = new Date()

    const { items: specialitiesList } = useSelector((store: any) => store.specialities)

    const classes = formStyles()
    const dispatch = useDispatch()

    // Get specialities
    useEffect(() => {
        dispatch(specialitiesActions.getAll({
            limit: 1000,
            offset: 0,
        }, false))
    }, [])

    const formik = useFormik({
        initialValues: {
            dateFrom: new Date(),
            dateEnd: new Date(),
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
        <AdminLayout>
            <Container>
                <Typography
                    component="h1"
                    variant="h5"
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Solicitar cita medica
                </Typography>
                <form className={classes.form} noValidate>
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
                </form>

                <AvaliableDates dateFrom={formik.values.dateFrom} dateEnd={formik.values.dateEnd} specialityId={formik.values.specialityId} />
            </Container>
        </AdminLayout>
    )
}
