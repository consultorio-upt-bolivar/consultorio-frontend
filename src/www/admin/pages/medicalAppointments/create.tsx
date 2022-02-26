// React
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { add } from 'date-fns'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Typography, Container, FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';

import {
    formStyles,
    GetFormikFields
} from '../../../components/formik'

import { AdminLayout } from '../../components/adminLayout'

// Variable
import { officesActions, specialitiesActions, toastActions, usersActions } from '../../../../_actions'
import { AvaliableDates } from '../../../components/avaliableDates'
import { validationMessages } from '../../../../constants/formik'
import { UsersApi } from '../../../../_api'
import { getConfiguration } from '../../../../config/api.config'
import { handleError } from '../../../../helpers/handleApiError'

export function CreateMedicalAppointmentPage(): React.ReactElement {
    const today = new Date()

    const { items: officesList } = useSelector((store: any) => store.offices)
    const { items: specialitiesList } = useSelector((store: any) => store.specialities)
    const { items: usersList } = useSelector((store: any) => store.users);
    const [specialistList, setSpecialistList] = useState([]);
    const [filteredSpecialities, setFilteredSpecialities] = useState([])

    const classes = formStyles()
    const dispatch = useDispatch()

    const getSpecialists = async () => {
        const api = new UsersApi(getConfiguration());

        try {
            const { data }: any = await api.getSpecialistsUsers();
            setSpecialistList(data);
        } catch (err) {
            const msg = handleError(err, false)
            dispatch(toastActions.error(msg))
        }
    }

    // Get specialities
    useEffect(() => {
        dispatch(officesActions.getAll({
            limit: 25000,
            offset: 0,
            where: "isActive==1"
        }))

        dispatch(specialitiesActions.getAll({
            limit: 25000,
            offset: 0,
            where: "isActive==1"
        }, {
            toast: false
        }))

        dispatch(usersActions.getAll({
            limit: 25000,
            offset: 0,
            where: "isActive==1"
        }, {
            toast: false
        }))

        getSpecialists()
    }, [])

    const formik = useFormik({
        initialValues: {
            dateFrom: new Date(),
            dateEnd: add(today, {
                days: 5
            }),
            officeId: '',
            specialityId: '',
            specialistId: '',
            user: ''
        },
        validationSchema: Yup.object({
            date: Yup.string().required(validationMessages.required),
            dateEnd: Yup.string().required(validationMessages.required),
            officeId: Yup.string().required(validationMessages.required),
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

    useEffect(() => {
        if (formik.values.officeId == '') return;

        if (formik.values.officeId) {
            const filtered = specialitiesList.filter((el: any) => {
                return el.office.id === formik.values.officeId
            })

            setFilteredSpecialities(filtered)

            formik.setFieldValue("specialityId", "")
        }
    }, [formik.values.officeId])

    useEffect(() => {
        formik.setFieldValue("specialistId", "")
    }, [formik.values.specialityId])

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
                    Solicitar Cita médica
                </Typography>
                <form className={classes.form} noValidate>
                    {formikFields}

                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <InputLabel className={classes.selectLabel} id='select-consultorio'>
                            Consultorio médico
                        </InputLabel>
                        <Select
                            labelId='select-consultorio'
                            label="officeId"
                            {...formik.getFieldProps("officeId")}
                        >
                            <MenuItem value="">
                                Seleccionar
                            </MenuItem>
                            {officesList?.map((el: any) => {
                                return (
                                    <MenuItem key={el.name} value={el.id}>
                                        {el.name}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                        <FormHelperText error id="my-helper-text">
                            {formik.errors.officeId ? formik.errors.officeId : null}
                        </FormHelperText>
                    </FormControl>

                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        sx={{ mt: 2 }}
                    >
                        <InputLabel className={classes.selectLabel} id='select-especialidad'>
                            Especialidad médica
                        </InputLabel>
                        <Select
                            labelId='select-especialidad'
                            label="specialityId"
                            {...formik.getFieldProps("specialityId")}
                        >
                            <MenuItem value="">
                                Seleccionar
                            </MenuItem>
                            {filteredSpecialities?.map((el: any) => {
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

                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <InputLabel className={classes.selectLabel} id='select-especialista'>
                            Especialista
                        </InputLabel>
                        <Select
                            labelId='select-especialista'
                            label="officeId"
                            {...formik.getFieldProps("specialistId")}
                        >
                            <MenuItem value="">
                                Seleccionar
                            </MenuItem>
                            {specialistList?.map((el: any) => {
                                return (
                                    <MenuItem key={`${el.id}-${el.name}`} value={el.id}>
                                        {el.name}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                        <FormHelperText error id="my-helper-text">
                            {formik.errors.specialistId ? formik.errors.specialistId : null}
                        </FormHelperText>
                    </FormControl>

                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        sx={{ mt: 2 }}
                    >
                        <InputLabel className={classes.selectLabel} id='select-users'>
                            Paciente a solicitar la cita médica
                        </InputLabel>
                        <Select
                            labelId='select-users'
                            label="user"
                            {...formik.getFieldProps("user")}
                        >
                            <MenuItem value="">
                                Seleccionar
                            </MenuItem>
                            {usersList?.map((el: any) => {
                                return (
                                    <MenuItem key={el.name} value={el}>
                                        {el.id} - {el.name} - {el.email}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                        <FormHelperText error>
                            {formik.errors.user ? formik.errors.user : null}
                        </FormHelperText>
                    </FormControl>
                </form>

                <Divider style={{
                    display: "block",
                    width: "100%",
                    marginTop: "20px",
                    marginBottom: "20px"
                }}></Divider>

                <AvaliableDates
                    dateFrom={formik.values.dateFrom}
                    dateEnd={formik.values.dateEnd}
                    specialityId={formik.values.specialityId}
                    specialistId={formik.values.specialistId}
                    user={formik.values.user}
                />
            </Container>
        </AdminLayout>
    )
}
