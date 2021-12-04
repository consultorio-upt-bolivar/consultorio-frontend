// React
import React, { useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import theme from '../../../../common/theme/main'
import { AdminLayout } from '../../components/adminLayout'
import { DataTablaParams, DataTable } from '../../../../common/components/table'

import { AppHistory } from '../../../../helpers'
import { schedulesActions as actions } from '../../../../_actions'

export function ListSchedulesPage(): React.ReactElement {
  const listName = 'Jornadas';
  const { items } = useSelector((state: any) => state.schedules)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      actions.getAll({
        limit: 1000,
        offset: 0,
      })
    )
  }, [])

  const toggleAction = (id: number) => {
    dispatch(actions.toggleActive(id, {
      toast: "Jornada actualizada!"
    }))
  }

  const editAction = (id: number) => {
    AppHistory.push('/admin/jornadas/' + id)
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
        field: 'date',
        headerName: 'Fecha inicio',
        description: 'Fecha inicio de la jornada',
        flex: 1,
      },
      {
        field: 'dateEnd',
        headerName: 'Fecha final',
        description: 'Fecha final de la jornada',
        flex: 1,
      },
      {
        field: 'startHour',
        headerName: 'Hora inicio (24 hrs)',
        description: 'Hora inicio de la jornada',
        flex: 1,
      },
      {
        field: 'endHour',
        headerName: 'Hora final (24 hrs)',
        description: 'Hora final de la jornada',
        flex: 1,
      },
      {
        field: 'specialityName',
        headerName: 'Especialidad',
        description: 'Especialidad de la jornada',
        flex: 1,
      },
      {
        field: 'specialistName',
        headerName: 'Normbre del doctor',
        description: 'Normbre del doctor especialista',
        flex: 1,
      },
      {
        field: 'isActive',
        headerName: 'Activo',
        description: 'Esta habilitada?',
        type: 'boolean',
        flex: 1,
      },
    ],
    rows: items?.map((el: any) => {
      el.specialityName = el.speciality.name
      el.specialistName = el.specialist.name

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
