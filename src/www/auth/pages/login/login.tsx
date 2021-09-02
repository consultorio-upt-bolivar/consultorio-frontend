// React
import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { useDispatch, useSelector } from 'react-redux'

// Forms
import { useFormik } from 'formik'
import * as Yup from 'yup'

// Logic
import { history } from '../../../../helpers'
import { authActions } from '../../../../_actions'

// Material
import { FormHelperText, Link } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

// Styles
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export function LoginPage(): React.ReactElement {
    const dispatch = useDispatch()
    const { loggingIn } = useSelector((store: any) => store.authentication)
    
    // Logout user
    useEffect(() => {
        dispatch(authActions.logout())
    }, [])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email invalido').required('Required'),
            password: Yup.string()
                .min(5, 'Debe tener 5 caracteres como minimo')
                .max(20, 'Debe tener 20 caracteres como maximo')
                .required('Required'),
        }),
        onSubmit: (values) => {
            console.log('hello')
            dispatch(authActions.login(values.email, values.password))
        },
    })

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault()

        if (formik.isValid) {
            formik.submitForm()
        }
    }

    const classes = useStyles()

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <p>{loggingIn ? 'Iniciando sesion' : null}</p>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Iniciar sesion
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        {...formik.getFieldProps('email')}
                    />

                    <FormHelperText id="my-helper-text">
                        {formik.touched.email && formik.errors.email
                            ? formik.errors.email
                            : null}
                    </FormHelperText>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...formik.getFieldProps('password')}
                    />

                    <FormHelperText id="my-helper-text">
                        {formik.touched.password && formik.errors.password
                            ? formik.errors.password
                            : null}
                    </FormHelperText>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={loggingIn}
                        onClick={(e) => handleSubmit(e)}
                    >
                        Ingresar
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link
                                onClick={() => history.push('/forgot-password')}
                            >
                                Olvidaste tu contraseña?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link onClick={() => history.push('/signin')}>
                                No tienes cuenta? Crear una
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
