import React, { useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Collapse, Link } from '@material-ui/core'

import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { AdminSidebar, SidebarConfig } from '../routes'
import { AppHistory } from '../../../helpers'
import { useLocation } from 'react-router-dom'

export default function SidemenuList(): React.ReactElement {
  const location = useLocation<any>()

  const [openMenu, setOpenMenu] = useState(location?.state?.activeMenu ?? '')

  const SidebarMenuList = AdminSidebar.map(
    ({ submenu = [], ...route }: SidebarConfig) => {
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
            return (
              <span key={subMenuItem.id + '-submenu'}>
                <Collapse
                  in={openMenu == route.text}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <Link
                      onClick={() =>
                        AppHistory.push(subMenuItem.path, {
                          activeMenu: route.text,
                          title: subMenuItem.text,
                        })
                      }
                    >
                      <ListItem button>
                        <ListItemIcon>
                          <subMenuItem.icon />
                        </ListItemIcon>
                        <ListItemText primary={subMenuItem.text} />
                      </ListItem>
                    </Link>
                  </List>
                </Collapse>
              </span>
            )
          })}
        </span>
      )
    }
  )

  return <>{SidebarMenuList}</>
}
