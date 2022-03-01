// React
import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'

import theme from '../../../../theme/main'
import { AdminLayout } from '../../components/adminLayout'
import { DataTablaParams, DataTable, RowMenuProps, useRowMenuStyles } from '../../../components/table'

import { alertActions, medicalAppointmentsActions } from '../../../../_actions'

import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import { RemoveRedEyeOutlined } from '@material-ui/icons'
import { TakeMedicalAppointmentDialog } from '../../../components/takeMedicalAppointment';
import { CancelMedicalAppointmentDialog } from '../../../components/cancelMedicalAppointment';

export function ListMedicalAppointmentsPage(): React.ReactElement {
  const listName = 'Citas médicas';
  const [open, setOpen] = useState(false)
  const [medicalAppointment, setMedicalAppointment] = useState<number | undefined>()
  const [openCancel, setOpenCancel] = useState(false)
  const [cancelAppointmentId, setCancelAppointment] = useState<number | undefined>()
  const { items = [] } = useSelector((state: any) => state.medicalAppointments)
  const dispatch = useDispatch()

  const getMedicalAppointments = () => {
    dispatch(
      medicalAppointmentsActions.getAll({
        limit: 25000,
        offset: 0
      })
    )
  }

  useEffect(() => {
    getMedicalAppointments();
  }, [])

  const handleClick = (event: any, row: any) => {
    event.stopPropagation();

    const reported = row.report && row.report.length > 0 || row.cancellationDate;

    dispatch(alertActions.show({
      title: `Citas médica`,
      description: reported ? `¿Quiere visualizar el historial médico del paciente?` : `¿Está seguro que quiere modificar esta cita médica?`,
      callback: () => {
        setMedicalAppointment(row.id)
        setOpen(true);
      }
    }));
  }

  const handleCancel = (event: any, row: any) => {
    event.stopPropagation();

    dispatch(alertActions.show({
      title: `Citas médica`,
      description: `¿Está seguro que quiere cancelar esta cita médica?`,
      callback: () => {
        setCancelAppointment(row.id)
        setOpenCancel(true);
      }
    }));
  }

  const rowMenuClasses = useRowMenuStyles()

  const params: DataTablaParams = {
    columns: [
      {
        field: 'id',
        headerName: 'ID',
        description: 'Id único en la BD',
        flex: 1,
        minWidth: 100,
        hide: false
      },
      {
        field: 'specialityName',
        headerName: 'Especialidad médica',
        description: 'Especialidad de la jornada',
        flex: 1,
        minWidth: 200
      },
      {
        field: 'date',
        headerName: 'Fecha',
        description: 'Fecha',
        flex: 1,
        minWidth: 200
      },
      {
        field: 'userName',
        headerName: 'Nombre del paciente',
        description: 'Nombre del usuario',
        flex: 1,
        minWidth: 200
      },
      {
        field: 'userType',
        headerName: 'Tipo de usuario',
        description: 'Tipo de usuario',
        flex: 1,
        minWidth: 200
      },
      {
        field: 'attended',
        headerName: 'Atendida',
        description: 'Atendida por el especialista',
        type: "boolean",
        flex: 1,
        minWidth: 200
      },
      {
        field: 'cancelled',
        headerName: 'Razón de cancelación',
        description: 'Razón de cancelación de la cita médica',
        flex: 2,
        minWidth: 200
      },
      {
        field: 'actions',
        headerName: 'Acciones',
        renderCell: (props: RowMenuProps) => {
          const { row } = props;

          return (
            <div className={rowMenuClasses.root}>
              <IconButton
                color="inherit"
                className={rowMenuClasses.textPrimary}
                size="small"
                aria-label="toggle"
                onClick={(e) => handleClick(e, row)}
              >
                <RemoveRedEyeOutlined fontSize="small" />
              </IconButton>

              {!row.report && !row.cancellationDate ? <IconButton
                color="inherit"
                className={rowMenuClasses.textPrimary}
                size="small"
                aria-label="toggle"
                onClick={(e) => handleCancel(e, row)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton> : null}
            </div>
          )
        },
        sortable: false,
        width: 100,
        headerAlign: 'center',
        filterable: false,
        align: 'center',
        disableColumnMenu: true,
        disableReorder: true
      }
    ],
    rows: items?.map((el: any) => {
      el.specialityName = el.schedule.speciality.name
      el.userName = el.user.name + " | " + el.user.email
      el.userType = el.user.profile.name
      el.cancelled = el.cancellationReason ? el.cancellationReason : 'No ha sido cancelada.'
      el.date = format(new Date(el.date), 'yyyy-MM-dd HH:mm')
      el.attended = el.report && el.report.length > 0;

      return el
    }) ?? []
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

        <TakeMedicalAppointmentDialog {...{
          medicalAppointment,
          setMedicalAppointment,
          open,
          setOpen,
          getMedicalAppointments
        }} />

        <CancelMedicalAppointmentDialog {...{
          medicalAppointmentId: cancelAppointmentId,
          setMedicalAppointment: setCancelAppointment,
          open: openCancel,
          setOpen: setOpenCancel,
          getMedicalAppointments
        }} />
      </Box>
    </AdminLayout>
  )
}
