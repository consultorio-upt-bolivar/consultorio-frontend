// React
import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material';
import { DataTablaParams, DataTable, RowMenuProps, useRowMenuStyles } from '../../../components/table'
import { AdminLayout } from '../../components/adminLayout'
import { useDispatch } from 'react-redux'
import theme from '../../../../theme/main'

// Variable
import { alertActions, toastActions } from '../../../../_actions'
import { UsersApi } from '../../../../_api';
import { getConfiguration } from '../../../../config/api.config';
import { IconButton } from '@material-ui/core';
import { RemoveRedEyeOutlined } from '@material-ui/icons';

export function AuthorizationRequestPage(): React.ReactElement {
  const listName = 'Autorizacion de grupo familiar';
  const dispatch = useDispatch()
  const [items, setItems] = React.useState<Array<any>>([])

  const getPendingAuthorizations = async () => {
    const api = new UsersApi(getConfiguration());
    
    try {
      const { data } : any = await api.getPendingAuthorizationUsers()
      const res = [];

      for (let i = 0; i < data.length; i++) {
        const { id, ...rest } = data[i];
        const pendingVerifications = data[i].pendingVerifications;

        for (let i = 0; i < pendingVerifications.length; i++) {
          const verification = pendingVerifications[i];
          res.push({
            userId: id,
            ...rest,
            id: verification.id,
            userFamilyName: verification.name,
            userFamilyLegalId: verification.legalId,
            userFamilyEmail: verification.email,
            requestVerified: verification.requestVerified,
          })
        }
      }

      setItems(res);
    } catch (error) {
      dispatch(toastActions.error(String(error)));
    }
  }

  const updateFamilyAuthorizationUsers = async (row: any) => {
    const api = new UsersApi(getConfiguration());
    
    try {
      await api.updateFamilyAuthorizationUsers({
        userId: row.userId,
        familyId: row.id,
        status: row.requestVerified ? false : true
      })

      getPendingAuthorizations();

      dispatch(toastActions.success(String(`Usuario ${row.requestVerified === 0 ? 'aprobado' : 'desaprobado'}!`)));
    } catch (error) {
      dispatch(toastActions.error(String(error)));
    }
  }

  useEffect(() => {
    getPendingAuthorizations()
  }, [])

  const handleClick = (event: any, row: any) => {
    event.stopPropagation();

    dispatch(alertActions.show({
      title: `Cambiar visibilidad`,
      description: `Estas seguro de  ${row.requestVerified === 1 ? 'desaprobar' : 'aprobar'} este usuario ${row.userFamilyName}?`,
      callback: () => {
        updateFamilyAuthorizationUsers(row)
      }
    }));
  }

  const rowMenuClasses = useRowMenuStyles()

  const params: DataTablaParams = {
    columns: [
      {
        field: 'id',
        headerName: 'ID',
        description: 'Id unico en la DB',
        flex: 1,
        hide: true
      },
      {
        field: 'name',
        headerName: 'Nombre del solicitante',
        description: 'Nombre del usuario',
        flex: 1,
      },
      {
        field: 'email',
        headerName: 'Email del solicitante',
        description: 'Email del usuario',
        flex: 1,
      },
      {
        field: 'legalId',
        headerName: 'Identificación del solicitante',
        description: 'Identificación del usuario',
        flex: 1,
      },
      {
        field: 'userFamilyName',
        headerName: 'Nombre del familiar',
        description: 'Nombre del usuario',
        flex: 1,
      },
      {
        field: 'userFamilyLegalId',
        headerName: 'Cedula del familiar',
        description: 'Cedula del usuario',
        flex: 1,
      },
      {
        field: 'userFamilyEmail',
        headerName: 'Email del familiar',
        description: 'Email del usuario',
        flex: 1,
      },
      {
        field: 'requestVerified',
        headerName: 'Aprobado',
        description: 'Esta aprobado?',
        type: 'boolean',
        width: 100,
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
            </div>
          )
        },
        sortable: false,
        width: 100,
        headerAlign: 'center',
        filterable: false,
        align: 'center',
        disableColumnMenu: true,
        disableReorder: true,
      }
    ],
    rows: items
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
