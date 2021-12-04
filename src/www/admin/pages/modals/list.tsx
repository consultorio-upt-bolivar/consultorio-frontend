// React
import React, { useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import { DataTablaParams, DataTable } from '../../../../common/components/table'
import { AdminLayout } from '../../components/adminLayout'
import { useDispatch, useSelector } from 'react-redux'
import theme from '../../../../common/theme/main'
import { AppHistory } from '../../../../helpers'

// Variable
import { modalsActions as actions } from '../../../../_actions'

export function ListModalPage(): React.ReactElement {
  const listName = 'modales';
  const { items } = useSelector((state: any) => state.modals)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      actions.getAll({
        limit: 1000,
        offset: 0,
      })
    )
  }, [])

  const deleteAction = (id: number) => {
    dispatch(actions.deleteOne(id))
  }

  const editAction = (id: number) => {
    AppHistory.push('/admin/modales/' + id)
  }

  const params: DataTablaParams = {
    columns: [
      {
        field: 'id',
        headerName: 'Modal ID',
        description: 'Id unico en la DB',
        flex: 1,
      },
      {
        field: 'name',
        headerName: 'Nombre',
        description: 'Nombre del modal',
        flex: 1,
      },
      {
        field: 'title',
        headerName: 'Titulo',
        description: 'Titulo del modal',
        flex: 1,
      },
      {
        field: 'description',
        headerName: 'Descripción',
        description: 'Descripción del modal',
        flex: 2,
      },
      {
        field: 'isActive',
        headerName: 'Activo',
        description: 'Esta activo?',
        type: 'boolean',
        flex: 1,
      },
      {
        field: 'isMain',
        headerName: 'Es principal?',
        description: 'Este modal se descata sobre otros',
        type: 'boolean',
        flex: 1,
      },
      {
        field: 'order',
        headerName: 'Orden',
        description: 'Fila por la que se ordena',
        flex: 1,
        type: 'number',
        hide: true,
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
