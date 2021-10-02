// React
import React, { useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import theme from '../../../../common/theme/main'
import { AdminLayout } from '../../components/adminLayout'
import { DataTablaParams, DataTable } from '../../../../common/components/table'

import { AppHistory } from '../../../../helpers'
import { medicalAppointmentsActions as actions } from '../../../../_actions'
import { PublicRolesArr } from '../../../../common/constants/roles'

export function ListMedicalAppointmentsPage(): React.ReactElement {
  const listName = 'Citas medicas';
  const { items } = useSelector((state: any) => state.medicalAppointments)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      actions.getAll({
        limit: 1000,
        offset: 0,
        filter: (el: any) => {
          return PublicRolesArr.includes(el.user.profileId)
        }
      })
    )
  }, [])

  const deleteAction = (id: number) => {
    dispatch(actions.toggleActive(id))
  }

  const editAction = (id: number) => {
    AppHistory.push('/admin/citas-medicas/' + id)
  }

  const params: DataTablaParams = {
    columns: [
      {
        field: 'id',
        headerName: 'ID',
        description: 'Id unico en la DB',
        width: 100,
      },
      {
        field: 'cancelled',
        headerName: 'Fue cancelada?',
        description: 'Cancelada?',
        width: 200,
      },
      {
        field: 'specialityName',
        headerName: 'Especialidad',
        description: 'Especialidad de la jornada',
        width: 200,
      },
      {
        field: 'userName',
        headerName: 'Normbre del usuario',
        description: 'Normbre del usuario',
        flex: 1,
      },
      {
        field: 'userType',
        headerName: 'Tipo de usuario',
        description: 'Tipo de usuario',
        width: 200,
      },
    ],
    rows: items?.map((el: any) => {
      el.specialityName = el.speciality.name
      el.userName = el.user.name + " | " + el.user.email
      el.userType = el.user.profile.name
      el.cancelled = el.cancellationDate && el.cancellationReason ? el.cancellationReason : 'No'

      return el
    }) ?? [],
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
