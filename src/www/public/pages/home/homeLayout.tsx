import React, { useEffect, useRef } from 'react'
import {
    Button,
    Container,
    Toolbar,
    AppBar,
    Typography,
    Box
} from '@mui/material'

import {
    makeStyles,
} from '@mui/styles';

import { useSelector } from 'react-redux'

import LayoutFooter from './layoutFooter';
import theme from '../../../../theme/main';
import UserAvatarMenu from '../../../components/userAvatarMenu';
import { AppHistory } from '../../../../helpers';

const useStyles = makeStyles({
    rootLayout: {
        maxWidth: "100%",
        width: "100%",
        height: `calc(100vh - 100px)`,
        padding: "0px !important"
    },
    container: {
        width: "100%",
        maxWidth: "100%",
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: '0px',
        padding: "0px !important"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: "transparent",
        color: theme.palette.primary.main,
        position: "fixed",
        top: "0",
        boxShadow: "none",
        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        '&.sticky': {
            background: "white",
            boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"
        }
    },
    appBarTitle: {
        cursor: 'pointer',
        color: theme.palette.primary.main,
        [theme.breakpoints.down('sm')]: {
            flex: "100%",
            textAlign: "center"
        },
    },
    menuButton: {
        textTransform: "none",
        marginLeft: "10px",
        boxShadow: "none",
        [theme.breakpoints.down('md')]: {
            display: "none"
        },
    },
    loginButton: {
        textTransform: "none",
        marginLeft: "10px",
        boxShadow: "none"
    }
})

export const HomeLayout = ({
    children,
    showFooter = false
}: {
    children: React.ReactElement,
    showFooter?: boolean
}): React.ReactElement => {
    const menuRef: any = useRef()
    const userData = useSelector((state: any) => state.authentication.user)
    const classes = useStyles()

    const setSticky = () => {
        // Get the navbar
        const navbar = menuRef.current;

        if (navbar) {
            // Get the offset position of the navbar
            const sticky = navbar.offsetTop;

            if (!window.pageYOffset && !sticky) {
                navbar.classList.remove("sticky");
            } else {
                if (window.pageYOffset >= sticky) {
                    navbar.classList.add("sticky")
                } else {
                    navbar.classList.remove("sticky");
                }
            }
        }
    }

    useEffect(() => {
        window.onscroll = function () {
            setSticky()
        };
    }, [])

    return (
        <Container className={classes.rootLayout}>

            <AppBar
                className={classes.appBar}
                ref={menuRef}
            >
                <Toolbar>
                    <Typography
                        noWrap
                        className={classes.appBarTitle}
                        onClick={() => {
                            AppHistory.push("/")
                        }}
                        sx={{ textDecoration: "none" }}
                    >
                        <Box
                            component="img"
                            src={process.env.PUBLIC_URL + "/images/logo.png"}
                            alt="suitcase"
                            sx={{ width: "250px", mt: "15px" }}
                        />
                    </Typography>

                    <span style={{
                        flex: "1",
                        [theme.breakpoints.down('sm')]: {
                            display: "none"
                        },
                    }}></span>

                    <Button
                        color="secondary"
                        component="a"
                        href="#home"
                        className={classes.menuButton}
                    >Inicio</Button>

                    <Button
                        color="secondary"
                        component="a"
                        href="#services"
                        className={classes.menuButton}
                    >Nuestros servicios</Button>

                    <Button
                        color="secondary"
                        component="a"
                        href="#about-us"
                        className={classes.menuButton}
                    >Sobre nosotros</Button>

                    <Button
                        color="secondary"
                        component="a"
                        href="#contact"
                        className={classes.menuButton}
                    >Contacto</Button>

                    {!userData?.name ?
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                AppHistory.push("/login")
                            }}
                            className={classes.loginButton}
                        >Ingresar</Button> :
                        <div style={{
                            marginLeft: "15px"
                        }}>
                            <UserAvatarMenu name={userData?.name ?? ''}></UserAvatarMenu>
                        </div>}
                </Toolbar>
            </AppBar>
            <Container className={classes.container}>
                {children}
            </Container>
            {showFooter ? <LayoutFooter></LayoutFooter> : null}
        </Container>
    )
}