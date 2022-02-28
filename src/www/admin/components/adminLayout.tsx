import React, { useState } from 'react'
import {
  makeStyles,
} from '@mui/styles';

import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AppHistory } from '../../../helpers';
import { useLocation } from 'react-router-dom';
import UserAvatarMenu from '../../components/userAvatarMenu';
import { useSelector } from 'react-redux';
import { Breadcrumbs, Container, CssBaseline, Drawer } from '@mui/material';
import SidemenuList from './sidemenu';

const drawerWidth = 240;

const DrawerHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: "20px"
}));

const BreadcrumbsStyled = styled(Breadcrumbs)(() => ({
  color: "white",
  flexGrow: 1
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface Props {
  children: React.ReactElement
  window?: () => Window;
}

export const AdminLayout = ({
  children,
  window
}: Props): React.ReactElement => {
  const classes = useLayoutStyles()
  const userData = useSelector((state: any) => state.authentication.user)
  const { state } = useLocation<any>()

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Container className={classes.rootLayout}>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}>
          <Toolbar>
            <div
              onClick={() => setMobileOpen(!mobileOpen)}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>

            </div>

            <BreadcrumbsStyled aria-label="breadcrumb">
              <Typography noWrap className={classes.appBarTitleText} onClick={() => AppHistory.replace('/admin')}>Inicio</Typography>
              {state?.title ? <Typography noWrap className={classes.appBarTitleText}>{state?.title}</Typography> : null}
            </BreadcrumbsStyled>

            <UserAvatarMenu name={userData?.name ?? ''}></UserAvatarMenu>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, mt: 6 },
            }}
          >
            <SidemenuList />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            <DrawerHeader onClick={() => {
              AppHistory.push("/admin")
            }}>
              <Box
                component="img"
                src="/images/logo.png"
                alt="suitcase"
                sx={{ width: "200px" }}
              />
            </DrawerHeader>
            <Divider />
            <SidemenuList />
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, pt: 12, pb: 3, px: 5, width: { sm: "100%" } }}
        >
          {children}
        </Box>
      </Box>
    </Container >
  )
}

const useLayoutStyles = makeStyles({
  rootLayout: {
    padding: '0px',
    height: '100vh',
    maxWidth: '100vw !important',
    position: "relative"
  },
  appBarTitle: {
    flexGrow: 1,
    color: 'white',
  },
  appBarTitleText: {
    color: 'white',
    cursor: 'pointer'
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  }
})
