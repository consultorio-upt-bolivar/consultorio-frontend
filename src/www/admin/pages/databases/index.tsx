import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Container, IconButton } from '@mui/material';
import { AdminLayout } from '../../components/adminLayout'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions, databasesActions, toastActions } from '../../../../_actions';
import { format } from 'date-fns'
import { loadingActions } from '../../../../_actions/loading.actions';
import { DataTablaParams, DataTable, RowMenuProps, useRowMenuStyles } from '../../../components/table';

import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import { DatabasesApi } from '../../../../_api';
import { getConfiguration } from '../../../../config/api.config';
import theme from '../../../../theme/main';
import RestoreIcon from '@mui/icons-material/Restore';

export const DatabasesPage = (): React.ReactElement => {
  const inputRef = useRef(null)
  const [items, setItems] = useState<any>([])
  const [sqlFile, setSqlFile] = useState<any>(false)
  const { sql } = useSelector((state: any) => state.databases)
  const dispatch = useDispatch()

  const getBackups = async () => {
    const api = new DatabasesApi(getConfiguration())

    dispatch(loadingActions.show());

    try {
      const { data } = await api.getAllFilesDatabaseApi();
      setItems(data)
    } catch (error) {
      dispatch(toastActions.error("No se han encontrado respaldos!"))
    }
    finally {
      dispatch(loadingActions.hide());
    }
  }

  useEffect(() => {
    getBackups();
  }, [])

  const restoreDatabase = async (fileName: string) => {
    const api = new DatabasesApi(getConfiguration())

    dispatch(loadingActions.show());

    try {
      await api.restoreFileDatabaseApi(fileName);
      dispatch(toastActions.success("Respaldo restaurado!"))
      getBackups()
    } catch (error) {
      console.log(error)
      dispatch(toastActions.error("No se pudo restaurar el respaldo de la base de datos!"))
    }
    finally {
      dispatch(loadingActions.hide());
    }
  }

  const handleClick = (event: any, row: any) => {
    event.stopPropagation();

    dispatch(alertActions.show({
      title: `Restaurar base de datos`,
      description: `Quieres restaurar este respaldo de base de datos?`,
      callback: async () => {
        restoreDatabase(row.fileName)
      }
    }));
  }

  const deleteBackup = async (fileName: string) => {
    const api = new DatabasesApi(getConfiguration())

    dispatch(loadingActions.show());

    try {
      await api.deleteFileDatabaseApi(fileName);
      dispatch(toastActions.success("Respaldo eliminado!"))
      getBackups()
    } catch (error) {
      console.log(error)
      dispatch(toastActions.error("No se pudo eliminar el respaldo de la base de datos!"))
    }
    finally {
      dispatch(loadingActions.hide());
    }
  }

  const handleCancel = (event: any, row: any) => {
    event.stopPropagation();

    dispatch(alertActions.show({
      title: `Eliminar respaldo base de datos`,
      description: `Quieres eliminar este respaldo de base de datos?`,
      callback: async () => {
        deleteBackup(row.fileName)
      }
    }));
  }

  const rowMenuClasses = useRowMenuStyles()

  const params: DataTablaParams = {
    columns: [
      {
        field: 'id',
        headerName: 'ID',
        width: 100,
        hide: false
      },
      {
        field: 'fileName',
        headerName: 'Nombre respaldo',
        description: 'Nombre respaldo',
        flex: 1,
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
                <RestoreIcon fontSize="small" />
              </IconButton>

              <IconButton
                color="inherit"
                className={rowMenuClasses.textPrimary}
                size="small"
                aria-label="toggle"
                onClick={(e) => handleCancel(e, row)}
              >
                <DeleteIcon fontSize="small" />
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
        disableReorder: true
      }
    ],
    rows: items?.map((el: any, i: number) => {
      return {
        id: i + 1,
        fileName: el
      }
    }) ?? []
  }

  // Listen backup restore
  useEffect(() => {
    if (sql) {
      const url = window.URL.createObjectURL(new Blob([sql], {
        type: 'text/plain'
      }));

      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', `backup-database-${format(new Date(), 'yyyy-MM-dd')}.sql`);
      // 3. Append to html page
      document.body.appendChild(link);
      // 4. Force download
      link.click();
      // 5. Clean up and remove the link
      if (link && link.parentNode) {
        link.parentNode.removeChild(link);
      }

      dispatch(databasesActions.clearState())
    }
  }, [sql])

  const handleBackupDatabase = () => {
    dispatch(loadingActions.show())

    dispatch(databasesActions.backupDatabase(false, () => {
      dispatch(loadingActions.hide())
      getBackups();
    }))
  }

  const handleRestoreDatabase = () => {
    if (!sqlFile) return

    dispatch(loadingActions.show())

    dispatch(alertActions.show({
      title: "Restaurar Base de Datos",
      description: "¿Está seguro de restaurar la Base de Datos? Los datos actuales seran remplazados.",
      callback: () => {
        dispatch(databasesActions.restoreDatabase(sqlFile, true, () => {

          dispatch(databasesActions.clearState())
          setSqlFile(false)

          const inputCurrent: any = inputRef.current;

          if (inputCurrent) {
            inputCurrent.value = "";
          }

          dispatch(loadingActions.hide())
          dispatch(toastActions.success("Base de datos restaurada."));
          getBackups();
        }))
      }
    }));
  }

  const handleClickButton = () => {
    if (inputRef.current) {
      (inputRef.current as any).click()
    }
  }

  const validateSqlFile = (e: React.SyntheticEvent) => {
    const file = (e as any).target?.files[0] ?? false

    if (file) {
      setSqlFile(file)
    }
  }

  return (
    <AdminLayout>
      <Container>
        <Typography
          component="h1"
          variant="h5"
          style={{
            textAlign: 'center',
          }}
        >
          Gestión de Base de Datos
        </Typography>

        <Grid container spacing={2} style={{ marginTop: '20px', marginBottom: '20px' }} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => handleBackupDatabase()}
            >
              Respaldar Base de Datos
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleClickButton}
            >
              {sqlFile?.name ? 'Elegir otro archivo' : 'Restaurar con un archivo'}
            </Button>
            {sqlFile?.name ?
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={handleRestoreDatabase}
                style={{ marginTop: "10px" }}
              >
                <small>
                  {`Restaurar BD con: ${sqlFile?.name}`}
                </small>
              </Button> : null}

            <input style={{ visibility: 'hidden', position: 'absolute', width: 0, height: 0 }} accept=".sql,application/sql" type="file" ref={inputRef} onChange={(e) => validateSqlFile(e)}></input>
          </Grid>
        </Grid>

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
      </Container>
    </AdminLayout>
  )
}
