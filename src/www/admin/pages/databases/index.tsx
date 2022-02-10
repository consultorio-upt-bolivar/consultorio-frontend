import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Container } from '@mui/material';
import { AdminLayout } from '../../components/adminLayout'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions, databasesActions } from '../../../../_actions';
import { format } from 'date-fns'
import { loadingActions } from '../../../../_actions/loading.actions';

const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: '16px',
  cursor: 'pointer',
  width: '400px',
  padding: '20px 20px',
  height: '200px'
}));

export const DatabasesPage = (): React.ReactElement => {
  const inputRef = useRef(null)
  const [sqlFile, setSqlFile] = useState<any>(false)
  const { sql } = useSelector((state: any) => state.databases)
  const dispatch = useDispatch()

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
    }))
  }

  const handleRestoreDatabase = () => {
    if (!sqlFile) return

    dispatch(loadingActions.show())

    dispatch(alertActions.show({
      title: "Restaurar base de datos",
      description: "Estas seguro de restaurar la base de datos? Los datos actuales seran remplazados.",
      callback: () => {
        dispatch(databasesActions.restoreDatabase(sqlFile, true, () => {

          dispatch(databasesActions.clearState())
          setSqlFile(false)

          const inputCurrent: any = inputRef.current;

          if (inputCurrent) {
            inputCurrent.value = "";
          }

          dispatch(loadingActions.hide())
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
          Gestion de base de datos
        </Typography>

        <Grid container spacing={2} style={{ marginTop: '50px', marginBottom: '50px' }} justifyContent="center">
          <Grid item onClick={() => handleBackupDatabase()}>
            <Item elevation={2}>
              <Typography component="p" variant="h5" mb={0} mt={0} align='center' gutterBottom>
                Respaldar base de datos
              </Typography>
            </Item>
          </Grid>

          <Grid item>
            <Item elevation={1} style={{ flexWrap: 'wrap' }}>
              <Typography component="p" variant="h5" mb={0} mt={0} align='center' onClick={() => handleClickButton()}>
                Restaurar base de datos
              </Typography>

              <input style={{ visibility: 'hidden', position: 'absolute', width: 0, height: 0 }} accept=".sql,application/sql" type="file" ref={inputRef} onChange={(e) => validateSqlFile(e)}></input>

              <div style={{ width: '100%' }} >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleClickButton()}
                >
                  <small>
                    {sqlFile?.name ? 'Elegir otro archivo' : 'Selecciona un archivo'}
                  </small>
                </Button>
              </div>

              {sqlFile?.name ?
                <div style={{ width: '100%' }} >
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleRestoreDatabase()}
                  >
                    <small>
                      Restaurar db con: {sqlFile?.name}
                    </small>
                  </Button>
                </div> : null
              }
            </Item>
          </Grid>
        </Grid>
      </Container>
    </AdminLayout>
  )
}
