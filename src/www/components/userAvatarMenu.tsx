import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppHistory } from '../../helpers'
import { authActions } from '../../_actions'
import { makeStyles } from '@mui/styles';
import { Avatar, Menu, MenuItem } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import theme from '../../theme/main';
import { Roles } from '../../_api';

const useStyles = makeStyles({
  root: {
    cursor: 'pointer',
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  lightBlue: {
    color: 'white',
    backgroundColor: "#00a0b2",
    border: '0.1px solid white'
  },
  menu: {
    width: '150px',
  },
})

export default function UserAvatarMenu({ name }: {
  name: string
}) {
  const classes = useStyles()
  const userData = useSelector((state: any) => state.authentication.user)
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const goLink = (url: string) => {
    setAnchorEl(null)
    AppHistory.push(url)
  }

  const logout = () => {
    setAnchorEl(null)
    dispatch(authActions.logout())
    AppHistory.push('/')
  }

  const redirectUrls: any = {
    [Roles.Admin]: {
      dashboard: "/admin",
      profile: "/admin/profile"
    },
    [Roles.Admin2]: {
      dashboard: "/admin",
      profile: "/admin/profile"
    },
    [Roles.MedicalSpecialist]: {
      dashboard: "/especialista-dashboard",
      profile: "/profile"
    },
    [Roles.Student]: {
      dashboard: "/dashboard",
      dashboardLinkName: "Solicitar cita médica",
      profile: "/profile"
    },
    [Roles.Family]: {
      dashboard: "/dashboard",
      dashboardLinkName: "Solicitar cita médica",
      profile: "/profile"
    },
    [Roles.Employee]: {
      dashboard: "/dashboard",
      dashboardLinkName: "Solicitar cita médica",
      profile: "/profile"
    }
  }

  return (
    <div className={classes.root}>
      {userData && (
        <div>
          <Avatar onClick={handleMenu} className={classes.lightBlue}>
            {name.slice(0, 1).toUpperCase()}
          </Avatar>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={() => {
              setAnchorEl(null)
            }}
          >
            <MenuItem onClick={() => goLink(redirectUrls[userData?.profile?.id].dashboard)}>{redirectUrls[userData?.profile?.id].dashboardLinkName ?? 'Admin'}</MenuItem>
            <MenuItem onClick={() => goLink(redirectUrls[userData?.profile?.id].profile)}>Editar perfil</MenuItem>
            <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
          </Menu>
        </div>
      )}
    </div>
  )
}
