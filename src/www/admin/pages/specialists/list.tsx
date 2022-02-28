// React
import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

import theme from '../../../../theme/main'
import { AdminLayout } from '../../components/adminLayout'
import { DataTablaParams, DataTable } from '../../../components/table'

import { AppHistory } from '../../../../helpers'
import { specialistActions as actions } from '../../../../_actions'
import { PublicRoles } from '../../../../_api'

export function ListSpecialistsPage(): React.ReactElement {
  const listName = 'Especialistas';
  const { items } = useSelector((state: any) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      actions.getAll({
        limit: 25000,
        offset: 0,
        where: `profile.id==${PublicRoles.MedicalSpecialist}`
      })
    )
  }, [])

  const toggleAction = (id: number) => {
    dispatch(actions.toggleActive(id, {
      toast: "Especialista actualizado!"
    }))
  }

  const editAction = (id: number) => {
    AppHistory.push('/admin/especialistas/editar/' + id)
  }

  const params: DataTablaParams = {
    columns: [
      {
        field: 'id',
        headerName: 'ID',
        description: 'Id único en la BD',
        flex: 1,
        minWidth: 100,
      },
      {
        field: 'name',
        headerName: 'Nombre',
        description: 'Nombre del especialista',
        flex: 1,
        minWidth: 200,
      },
      {
        field: 'email',
        headerName: 'Correo electrónico',
        description: 'Correo del especialista',
        flex: 2,
        minWidth: 200,
      },
      {
        field: 'phone',
        headerName: 'Teléfono',
        description: 'Teléfono del especialista',
        flex: 1,
        minWidth: 200,
      },
      {
        field: 'legalId',
        headerName: 'Cédula',
        description: 'Cédula del especialista',
        flex: 1,
        minWidth: 200,
      },
      {
        field: 'type',
        headerName: 'Tipo de usuario',
        description: 'Tipo de especialistas',
        flex: 1,
        minWidth: 200,
        hide: true,
      },
      {
        field: 'isActive',
        headerName: 'Activo',
        description: '¿Está habilitado?',
        type: 'boolean',
        flex: 1,
        minWidth: 200,
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
