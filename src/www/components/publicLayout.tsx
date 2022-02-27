import React from 'react'
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

import UserAvatarMenu from './userAvatarMenu'
import { useSelector } from 'react-redux'
import theme from '../../theme/main';
import LayoutFooter from '../public/pages/home/layoutFooter';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  rootLayout: {
    height: `calc(100vh - 100px)`,
    maxWidth: '100vw !important',
    padding: "0px !important"
  },
  container: {
    maxWidth: '100vw !important',
    width: `100%`,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '60px',
    padding: "0px !important"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "transparent",
    color: theme.palette.primary.main,
    position: "fixed",
    top: "0",
    boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"
},
  appBarTitle: {
    color: 'white',
    cursor: 'pointer'
  },
  menuButton: {
    textTransform: "none",
    marginLeft: "10px",
    boxShadow: "none"
  }
})

export const PublicLayout = ({
  children,
  showFooter = false
}: {
  children: React.ReactElement,
  showFooter?: boolean
}): React.ReactElement => {
  const location = useLocation()
  const userData = useSelector((state: any) => state.authentication.user)
  const classes = useStyles()

  return (
    <Container className={classes.rootLayout}>
      <AppBar
        className={classes.appBar}
      >
        <Toolbar>
          <Typography
            noWrap
            className={classes.appBarTitle}
            component="a"
            href="/" sx={{ textDecoration: "none" }}
          >
            <Box
              component="img"
              src="/images/logo.png"
              alt="suitcase"
              sx={{ width: "200px", mt: "15px" }}
            />
          </Typography>

          <span style={{
            flex: "1"
          }}></span>

          {location.pathname != "/login" && !userData?.name ?
            <Button
              color="inherit"
              component="a"
              href="/login"
              className={classes.menuButton}
            >Iniciar sesión</Button>
            :
            <UserAvatarMenu name={userData?.name ?? ''}></UserAvatarMenu>}
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        {children}
      </Container>
      {showFooter ? <LayoutFooter></LayoutFooter> : null}
    </Container>
  )
}