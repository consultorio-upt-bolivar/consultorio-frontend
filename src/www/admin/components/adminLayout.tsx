import React, { useState } from 'react'
import clsx from 'clsx'
import {
  Box,
  Button,
  Container,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core'

import { AppHistory } from '../../../helpers'
import AdminHeader, { drawerWidth } from './header'
import SidemenuList from './sidemenu'

export const AdminLayout = ({
  children,
}: {
  children: React.ReactElement
}): React.ReactElement => {
  const [openSidebar, setOpenSidebar] = useState(true)
  const classes = useLayoutStyles()

  return (
    <Container className={classes.rootLayout}>
      <AdminHeader open={openSidebar} setOpen={setOpenSidebar}>
        <SidemenuList />
      </AdminHeader>
      <Container
        className={clsx(classes.container, {
          [classes.containerOpen]: openSidebar,
          [classes.containerClosed]: !openSidebar,
        })}
      >
        <Box width="100%" display="flex" alignItems="flex-start">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => AppHistory.goBack()}
          >
            Volver
          </Button>
        </Box>
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
      width: `calc(100% - ${drawerWidth}px)`,
      maxWidth: '100vw !important',
      marginLeft: `${drawerWidth}px`,
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
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
    },
    containerClosed: {
      width: `calc(100% - ${theme.spacing(7) + 1})`,
      marginLeft: ` ${theme.spacing(7) + 1}px`,
    },
  })
)
