import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppHistory } from '../../helpers'
import { authActions } from '../../_actions'
import { makeStyles } from '@mui/styles';
import { Avatar, Menu, MenuItem } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import theme from '../../theme/main';

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

export default function UserAvatarMenu({ name, profileUrl }: {
  name: string
  profileUrl: string
}) {
  const classes = useStyles()
  const userData = useSelector((state: any) => state.authentication.user)
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const profile = () => {
    setAnchorEl(null)
    AppHistory.push(profileUrl)
  }

  const logout = () => {
    setAnchorEl(null)
    dispatch(authActions.logout())
    AppHistory.push('/')
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
            <MenuItem onClick={profile}>Perfil usuario</MenuItem>
            <MenuItem onClick={logout}>Salir de sesion</MenuItem>
          </Menu>
        </div>
      )}
    </div>
  )
}