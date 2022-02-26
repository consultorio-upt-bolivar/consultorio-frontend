// React
import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

import theme from '../../../../theme/main'
import { AdminLayout } from '../../components/adminLayout'
import { DataTablaParams, DataTable } from '../../../components/table'

import { AppHistory } from '../../../../helpers'
import { officesActions as actions } from '../../../../_actions/offices.actions'

export function ListOfficesPage(): React.ReactElement {
  const listName = 'Consultorios médicos';
  const { items } = useSelector((state: any) => state.offices)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      actions.getAll({
        limit: 25000,
        offset: 0,
      })
    )
  }, [])

  const toggleAction = (id: number) => {
    dispatch(actions.toggleActive(id, {
      toast: "Consultorio médico actualizado!"
    }))
  }

  const editAction = (id: number) => {
    AppHistory.push('/admin/oficinas/' + id)
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
        description: 'Nombre del consultorio',
        flex: 1,
      },
      {
        field: 'phone',
        headerName: 'Teléfono',
        description: 'Teléfono del consultorio',
        flex: 1,
      },
      {
        field: 'place',
        headerName: 'Dirección',
        description: 'Dirección del consultorio',
        flex: 1,
      },
      {
        field: 'isActive',
        headerName: 'Activo',
        description: 'Estado del consultorio',
        type: 'boolean',
        flex: 1,
      },
    ],
    rows: items ?? [],
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
