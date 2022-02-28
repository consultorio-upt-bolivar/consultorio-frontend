// React
import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

import theme from '../../../../theme/main'
import { AdminLayout } from '../../components/adminLayout'
import { DataTablaParams, DataTable } from '../../../components/table'

import { AppHistory } from '../../../../helpers'
import { schedulesActions as actions } from '../../../../_actions'

export function ListSchedulesPage(): React.ReactElement {
  const listName = 'Jornadas';
  const { items } = useSelector((state: any) => state.schedules)
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
      toast: "Jornada actualizada!"
    }))
  }

  const editAction = (id: number) => {
    AppHistory.push('/admin/jornadas/editar/' + id)
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
        field: 'date',
        headerName: 'Fecha inicio',
        description: 'Fecha inicio de la jornada',
        flex: 1,
        minWidth: 200
      },
      {
        field: 'dateEnd',
        headerName: 'Fecha final',
        description: 'Fecha final de la jornada',
        flex: 1,
        minWidth: 200
      },
      {
        field: 'startHour',
        headerName: 'Hora inicio (24 hrs)',
        description: 'Hora inicio de la jornada',
        flex: 1,
        minWidth: 200
      },
      {
        field: 'endHour',
        headerName: 'Hora final (24 hrs)',
        description: 'Hora final de la jornada',
        flex: 1,
        minWidth: 200
      },
      {
        field: 'officeName',
        headerName: 'Consultorio',
        description: 'Consultorio de la jornada',
        flex: 1,
        minWidth: 200
      },
      {
        field: 'specialityName',
        headerName: 'Especialidad médica',
        description: 'Especialidad de la jornada',
        flex: 1,
        minWidth: 200
      },
      {
        field: 'specialistName',
        headerName: 'Nombre del especialista',
        description: 'Nombre del especialista',
        flex: 1,
        minWidth: 200
      },
      {
        field: 'isActive',
        headerName: 'Activo',
        description: '¿Está habilitada?',
        type: 'boolean',
        flex: 1,
        minWidth: 100
      },
    ],
    rows: items?.map((el: any) => {
      el.specialityName = el.speciality.name
      el.specialistName = el.specialist.name
      el.officeName = el.speciality.office.name

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
