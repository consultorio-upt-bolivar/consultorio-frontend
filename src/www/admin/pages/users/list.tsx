// React
import React, { useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import theme from '../../../../common/theme/main'
import { AdminLayout } from '../../components/adminLayout'
import { DataTablaParams, DataTable } from '../../../../common/components/table'

import { AppHistory } from '../../../../helpers'
import { usersActions as actions } from '../../../../_actions'
import { PublicRoles, Roles } from '../../../../_api'
import { getUserData } from '../../../../common/utils/userStorage'

export function ListUsersPage(): React.ReactElement {
  const listName = 'usuarios';
  const { items } = useSelector((state: any) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    let conditions = `profile.id==${PublicRoles.Student},${PublicRoles.Employee},${PublicRoles.Family}`;
    const userData = getUserData()

    if (userData.profile.id == Roles.Admin) {
      conditions += `,admin_2`
    }

    dispatch(
      actions.getAll({
        limit: 1000,
        offset: 0,
        where: conditions
      })
    )
  }, [])

  const toggleAction = (id: number) => {
    dispatch(actions.toggleActive(id, {
      toast: "Usuario actualizado!"
    }))
  }

  const editAction = (id: number) => {
    AppHistory.push('/admin/usuarios/' + id)
  }

  const params: DataTablaParams = {
    columns: [
      {
        field: 'id',
        headerName: 'ID',
        description: 'Id unico en la DB',
        flex: 1,
      },
      {
        field: 'name',
        headerName: 'Nombre',
        description: 'Nombre del usuario',
        flex: 1,
      },
      {
        field: 'email',
        headerName: 'Correo',
        description: 'Correo del usuario',
        flex: 1,
      },
      {
        field: 'phone',
        headerName: 'Telefono',
        description: 'Telefono del usuario',
        flex: 1,
      },
      {
        field: 'legalId',
        headerName: 'Identificación',
        description: 'Identificación del usuario',
        flex: 1,
      },
      {
        field: 'type',
        headerName: 'Tipo',
        description: 'Tipo de usuario',
        flex: 1,
      },
      {
        field: 'isActive',
        headerName: 'Activo',
        description: 'Esta habilitado?',
        type: 'boolean',
        flex: 1,
      },
    ],
    rows: items?.map((el: any) => {
      el.type = el.profile.name
      return el
    }) ?? [],
    toggleAction,
    editAction,
  }

  return (
    <AdminLayout>
      <Box width="100%" maxWidth="2000px" justifyContent="center">
        <Typography
          component="h1"
          variant="h5"
          style={{
            textAlign: 'center',
          }}
        >
          Listado de {listName}
        </Typography>

        <Box
          display="flex"
          mt={theme.spacing(1)}
          style={{
            height: '700px',
            width: '100%',
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <DataTable {...params} />
          </div>
        </Box>
      </Box>
    </AdminLayout>
  )
}
