// React
import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material';
import { DataTablaParams, DataTable } from '../../../components/table'
import { AdminLayout } from '../../components/adminLayout'
import { useDispatch, useSelector } from 'react-redux'
import theme from '../../../../theme/main'
import { AppHistory } from '../../../../helpers'

// Variable
import { modalsActions as actions } from '../../../../_actions'

export function ListModalPage(): React.ReactElement {
  const listName = 'Modales';
  const { items } = useSelector((state: any) => state.modals)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      actions.getAll({
        limit: 25000,
        offset: 0,
      })
    )
  }, [])

  const deleteAction = (id: number) => {
    dispatch(actions.deleteOne(id))
  }

  const editAction = (id: number) => {
    AppHistory.push('/admin/modales/editar/' + id)
  }

  const params: DataTablaParams = {
    columns: [
      {
        field: 'id',
        headerName: 'ID',
        description: 'Id único en la BD',
        flex: 1,
        minWidth: 100
      },
      {
        field: 'name',
        headerName: 'Nombre',
        description: 'Nombre del modal',
        flex: 1,
        minWidth: 200
      },
      {
        field: 'isActive',
        headerName: 'Activo',
        description: 'Estado del modal',
        type: 'boolean',
        flex: 1,
        minWidth: 200
      },
      {
        field: 'isMain',
        headerName: 'Destacado',
        description: 'Este modal se descata sobre otros',
        type: 'boolean',
        flex: 1,
        minWidth: 200
      },
    ],
    rows: items ?? [],
    deleteAction,
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
