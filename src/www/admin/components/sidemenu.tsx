import React, { useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Collapse, Divider, Link } from '@material-ui/core'

import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { AdminSidebar, SidebarConfig } from '../routes'
import { AppHistory } from '../../../helpers'
import { useLocation } from 'react-router-dom'
import theme from '../../../common/theme/main'
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
        <span key={route.id + '-menu'}>
          <ListItem
            button
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
              <span key={subMenuItem.id + '-submenu'}>
                <Collapse
                  in={openMenu == route.text}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding style={{
                    paddingLeft: theme.spacing(1)
                  }}>

                    <ListItem button onClick={() =>
                      AppHistory.push(subMenuItem.path, {
                        activeMenu: route.text,
                        title: subMenuItem.text,
                      })
                    }>
                      <ListItemIcon>
                        <subMenuItem.icon />
                      </ListItemIcon>
                      <ListItemText primary={subMenuItem.text} />
                    </ListItem>
                  </List>
                </Collapse>
              </span>
            )
          })}

          <Divider />
        </span>
      )
    }
  )

  return <>{SidebarMenuList}</>
}
