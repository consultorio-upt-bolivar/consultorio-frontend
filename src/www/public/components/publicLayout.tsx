import React from 'react'
import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  AppBar,
  Typography
} from '@material-ui/core'

import UserAvatarMenu from '../../../common/components/userAvatarMenu'
import { useSelector } from 'react-redux'

export const PublicLayout = ({
  children,
}: {
  children: React.ReactElement
}): React.ReactElement => {
  const userData = useSelector((state: any) => state.authentication.user)
  const classes = useStyles()

  return (
    <Container className={classes.rootLayout}>
      <AppBar
        className={classes.appBar}
      >
        <Toolbar>
          <Typography noWrap className={classes.appBarTitle}>Consultorio medico UPT</Typography>
          <UserAvatarMenu profileUrl="/profile" name={userData?.name ?? ''}></UserAvatarMenu>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        {children}
      </Container>
    </Container>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootLayout: {
      padding: '0px',
      height: `calc(100vh - 100px)`,
      maxWidth: '100vw !important',
    },
    container: {
      maxWidth: '100vw !important',
      width: `100%`,
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: '80px'
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
)
