import React from 'react'
import {
  Button,
  Container,
  Toolbar,
  AppBar,
  Typography
} from '@mui/material'

import {
  makeStyles,
} from '@mui/styles';

import UserAvatarMenu from './userAvatarMenu'
import { useSelector } from 'react-redux'
import theme from '../../theme/main';
import LayoutFooter from './layoutFooter';

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
    zIndex: theme.zIndex.drawer + 1
  },
  appBarTitle: {
    flexGrow: 1,
    color: 'white',
    cursor: 'pointer'
  }
})

export const PublicLayout = ({
  children,
  showFooter = false
}: {
  children: React.ReactElement,
  showFooter?: boolean
}): React.ReactElement => {
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
          >Consultorio medico UPT</Typography>

          {!userData?.name ?
            <Button
              color="inherit"
              component="a"
              href="/login"
            >Iniciar sesion</Button>
            :
            <UserAvatarMenu profileUrl="/profile" name={userData?.name ?? ''}></UserAvatarMenu>}
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        {children}
      </Container>
      {showFooter ? <LayoutFooter></LayoutFooter> : null}
    </Container>
  )
}