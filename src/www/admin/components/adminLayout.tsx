import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import {
  Box,
  Button,
  Container,
  createStyles,
  makeStyles,
  Theme,
  useMediaQuery,
} from '@material-ui/core'

import AdminHeader, { drawerWidth } from './header'
import SidemenuList from './sidemenu'
import theme from '../../../common/theme/main'

export const AdminLayout = ({
  children,
}: {
  children: React.ReactElement
}): React.ReactElement => {
  const isBigWindow = useMediaQuery(theme.breakpoints.up('md'));
  const [openSidebar, setOpenSidebar] = useState(false)
  const classes = useLayoutStyles()

  useEffect(() => {
    setOpenSidebar(isBigWindow)
  }, [isBigWindow])

  return (
    <Container className={classes.rootLayout}>
      <AdminHeader open={isBigWindow} setOpen={setOpenSidebar}>
        <SidemenuList />
      </AdminHeader>
      <Container
        className={clsx(classes.container, {
          [classes.containerOpen]: openSidebar,
          [classes.containerClosed]: !openSidebar,
        })}
      >
        {children}
      </Container>
    </Container>
  )
}

const useLayoutStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootLayout: {
      padding: '0px',
      height: `calc(100vh - 100px)`,
      maxWidth: '100vw !important',
    },
    container: {
      maxWidth: '100vw !important',
      width: `100%`,
      marginLeft: 85,
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: '80px',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    containerOpen: {
      width: `calc(100% - ${drawerWidth + 40}px)`,
      marginLeft: `${drawerWidth + 20}px`,
    },
    containerClosed: {
      width: `calc(100% - ${110}px)`,
      marginLeft: `${90}px`,
    },
  })
)
