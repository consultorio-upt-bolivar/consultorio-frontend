import React, { useState } from 'react'
import { Divider, Collapse, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { AdminSidebar, SidebarConfig } from '../routes'
import { AppHistory } from '../../../helpers'
import { useLocation } from 'react-router-dom'
import theme from '../../../theme/main'
import { Roles } from '../../../_api'
import { useSelector } from 'react-redux'

export default function SidemenuList(): React.ReactElement {
  const location = useLocation<any>()

  const [openMenu, setOpenMenu] = useState(location?.state?.activeMenu ?? '')
  const userData = useSelector((state: any) => state.authentication.user)

  const SidebarMenuList = AdminSidebar.map(
    ({ submenu = [], ...route }: SidebarConfig) => {
      const requiredRoles: string[] = [Roles.Admin, Roles.Admin2, ...route.requiredRoles ?? []]

      if (!requiredRoles.includes(userData.profile.id)) {
        return
      }

      return (
        <React.Fragment key={route.id + '-menu'}>
          <ListItem button
            onClick={() =>
              submenu.length
                ? setOpenMenu(openMenu == route.text ? '' : route.text)
                : AppHistory.push(route.path, {
                  activeMenu: route.text,
                })
            }
          >
            <ListItemIcon>
              <route.icon />
            </ListItemIcon>
            <ListItemText primary={route.text} />
            {submenu.length ? (
              openMenu == route.text ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )
            ) : null}
          </ListItem>

          {submenu.map((subMenuItem: SidebarConfig) => {
            const subItemRoles: string[] = [Roles.Admin, Roles.Admin2, ...subMenuItem.requiredRoles ?? []]

            if (!subItemRoles.includes(userData.profile.id)) {
              return
            }

            return (
              <React.Fragment key={subMenuItem.id + '-submenu'}>
                <Collapse
                  in={openMenu == route.text}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding style={{
                    paddingLeft: theme.spacing(1)
                  }}>

                    <ListItem
                      button
                      onClick={() =>
                        AppHistory.push(subMenuItem.path, {
                          activeMenu: route.text,
                          title: subMenuItem.text,
                        })
                      }>
                      <ListItemIcon>
                        <subMenuItem.icon />
                      </ListItemIcon>
                      <ListItemText primaryTypographyProps={{ style: { fontSize: "14px" } }} primary={subMenuItem.text} />
                    </ListItem>
                  </List>
                </Collapse>
              </React.Fragment>
            )
          })
          }
          <Divider></Divider>
        </React.Fragment >
      )
    }
  )

  return <List>{SidebarMenuList}</List>
}
