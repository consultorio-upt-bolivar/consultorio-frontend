import React from 'react'
import esLocale from 'date-fns/locale/es';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Box, Checkbox, Divider, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import theme from '../../theme/main';

// Styles
export const formStyles = makeStyles({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    marginTop: theme.spacing(2),
    width: '100%',
    padding: 0,
  },
  selectLabel: {
    background: 'white',
  },
  divContainer: {
    display: 'inline-flex',
    width: '100%',
    margin: 0,
    padding: 0
  },
  errorText: {
    width: '100%',
    marginLeft: 0
  }
})

const DivContainer = ({ width, children, ...props }: any) => {
  const classes = formStyles()

  return <div className={classes.divContainer} style={{
    width: `${width ?? '100%'}`,
    display: 'block'
  }} {...props}>{children}</div>
}

export const GetFormikFields = (formik: any, fields: any) => {
  const classes = formStyles()
  const names = Object.keys(fields)

  const inputs = names.map((name: string) => {
    const options: any = fields[name]
    const isSimple = typeof options === 'string'

    const labelId = isSimple ? options : options?.label ?? "no-label";

    const key = `${isSimple ? 'text' : options.type}-${labelId.replace(/ /g, '-').toLowerCase()}-${name}`

    let input: any

    if (isSimple) {
      input = (
        <DivContainer key={key}>
          <TextField
            required
            variant="outlined"
            margin="dense"
            fullWidth
            id={name}
            label={options}
            autoComplete={name}
            {...formik.getFieldProps(name)}
            style={{
              marginTop: "24px"
            }}
          />
          <FormHelperText className={classes.errorText} error>
            {(formik.touched[name] && formik.errors[name]) || formik.errors[name]
              ? formik.errors[name]
              : null}
          </FormHelperText>
        </DivContainer>
      )
    }

    switch (options.type) {
      case 'divider':
        input = (
          <div style={{
            width: "100%"
          }} key={key}>
            <br /><Divider /><br />
          </div>
        )
        break

      case 'text':
        input = (
          <DivContainer width={options.width} key={key}>
            <TextField
              variant="outlined"
              margin="dense"
              disabled={options.readonly}
              required={options.required}
              fullWidth
              id={name}
              label={options.label}
              autoComplete={name}
              {...formik.getFieldProps(name)}
              style={{
                marginTop: "24px"
              }}
            />
            <FormHelperText className={classes.errorText} error>
              {(formik.touched[name] && formik.errors[name]) || formik.errors[name]
                ? formik.errors[name]
                : null}
            </FormHelperText>
          </DivContainer>
        )
        break
      case 'number':
        input = (
          <DivContainer width={options.width} key={key}>
            <TextField
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              margin="dense"
              disabled={options.readonly}
              required={options.required}
              fullWidth
              id={name}
              label={options.label}
              autoComplete={name}
              type="number"
              {...formik.getFieldProps(name)}
              style={{
                marginTop: "24px"
              }}
            />
            <FormHelperText className={classes.errorText} error>
              {(formik.touched[name] && formik.errors[name]) || formik.errors[name]
                ? formik.errors[name]
                : null}
            </FormHelperText>
          </DivContainer>
        )
        break
      case 'select':
        input = (
          <DivContainer width={options.width} key={key}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              style={{
                marginTop: "24px",
                marginBottom: "4px"
              }}
            >
              <InputLabel className={classes.selectLabel} id={'select-' + name}>
                {options.label}
              </InputLabel>
              <Select
                fullWidth
                margin="dense"
                required={options.required}
                labelId={'select-' + name}
                label={name}
                disabled={options.readonly}
                {...formik.getFieldProps(name)}
              >
                <MenuItem selected>
                  Seleccionar
                </MenuItem>
                {options.values.map((el: any) => {
                  return (
                    <MenuItem key={el.label} value={el.value}>
                      {el.label}
                    </MenuItem>
                  )
                })}
              </Select>
              <FormHelperText className={classes.errorText} error>
                {(formik.touched[name] && formik.errors[name]) || formik.errors[name]
                  ? formik.errors[name]
                  : null}
              </FormHelperText>
            </FormControl>
          </ DivContainer>
        )
        break

      case 'multiline':
        input = (
          <DivContainer width={options.width} key={key}>
            <TextField
              variant="outlined"
              margin="dense"
              multiline
              fullWidth
              id={name}
              label={options.label}
              rows={options.maxRows}
              required={options.required}
              disabled={options.readonly}
              {...formik.getFieldProps(name)}
            />
            <FormHelperText className={classes.errorText} error>
              {(formik.touched[name] && formik.errors[name]) || formik.errors[name]
                ? formik.errors[name]
                : null}
            </FormHelperText>
          </DivContainer>
        )
        break
      case 'password':
        input = (
          <DivContainer width={options.width} key={key}>
            <TextField
              variant="outlined"
              margin="dense"
              type="password"
              fullWidth
              id={name}
              label={options.label}
              required={options.required}
              disabled={options.readonly}
              {...formik.getFieldProps(name)}
              style={{
                marginTop: "8px"
              }}
            />
            <FormHelperText className={classes.errorText} error>
              {(formik.touched[name] && formik.errors[name]) || formik.errors[name]
                ? formik.errors[name]
                : null}
            </FormHelperText>
          </DivContainer>
        )
        break
      case 'checkbox':
        input = (
          <DivContainer width={options.width} key={key}>
            <FormControlLabel
              className={classes.formControl}
              control={
                <Checkbox
                  disabled={options.readonly}
                  color="primary"
                  aria-describedby="checkbox-error-text"
                  checked={!!formik.values[name]}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    formik.setFieldValue(name, event.target.checked ? 1 : 0)
                  }}
                />
              }
              label={options.label}
            />
            <FormHelperText className={classes.errorText} error>
              {(formik.touched[name] && formik.errors[name]) || formik.errors[name] ? formik.errors[name] : null}
            </FormHelperText>
          </DivContainer>
        )
        break
      case 'date':
        input = (
          <DivContainer width={options.width} key={key}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale} >
              <DesktopDatePicker
                label={options.label}
                disableOpenPicker={options.readonly}
                disabled={options.readonly}
                value={formik.values[name]}
                disablePast={options.disablePast}
                maxDate={options.maxDate}
                onChange={(date: Date | null) => {
                  if (!date) return;
                  formik.setFieldValue(name, date)
                }}
                renderInput={(params) => <TextField
                  margin="dense"
                  fullWidth
                  sx={{ mt: 3 }}
                  required={options.required}
                  disabled={options.readonly}
                  {...params}
                  style={{
                    marginTop: "24px"
                  }}
                />}
              />
            </LocalizationProvider>
          </DivContainer>
        )
        break
      case 'hour':
        input = (
          <DivContainer width={options.width} key={key}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
              <TimePicker
                disableOpenPicker={options.readonly}
                disabled={options.readonly}
                label={options.label}
                value={formik.values[name]}
                onChange={(date: Date | null) => {
                  if (!date) return;
                  formik.setFieldValue(name, date)
                }}
                renderInput={(params: any) => <TextField
                  margin="dense"
                  fullWidth
                  required={options.required}
                  disabled={options.readonly}
                  {...params}
                  style={{
                    marginTop: "24px"
                  }}
                />}
              />
            </LocalizationProvider>
          </DivContainer>
        )
        break
    }

    return input
  })

  return <Box display="flex" justifyContent="space-between" flexWrap="wrap" padding="0">{inputs}</Box>
}
