// React
import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

import theme from '../../../../theme/main'
import { AdminLayout } from '../../components/adminLayout'
import { DataTablaParams, DataTable } from '../../../components/table'

import { AppHistory } from '../../../../helpers'
import { usersActions as actions } from '../../../../_actions'
import { PublicRoles, Roles } from '../../../../_api'
import { getUserData } from '../../../../helpers/userStorage'

export function ListUsersPage(): React.ReactElement {
  const listName = 'Usuarios';
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
        limit: 25000,
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
        description: 'Id único en la BD',
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
        headerName: 'Correo electrónico',
        description: 'Correo del usuario',
        flex: 1,
      },
      {
        field: 'phone',
        headerName: 'Teléfono',
        description: 'Teléfono del usuario',
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
        headerName: 'Tipo de usuario',
        description: 'Tipo de usuario',
        flex: 1,
      },
      {
        field: 'isActive',
        headerName: 'Activo',
        description: '¿Está habilitado?',
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
