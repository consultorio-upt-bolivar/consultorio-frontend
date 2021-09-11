import React from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'

// Styles
export const formStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
}))

export const GetFormikFields = (formik: any, fields: any) => {
  const classes = formStyles()
  const names = Object.keys(fields)

  return names.map((name: string) => {
    const options: any = fields[name]
    const isSimple = typeof options === 'string'

    let input: any

    if (isSimple) {
      input = (
        <span key={name}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={name}
            label={options}
            autoComplete={name}
            {...formik.getFieldProps(name)}
          />
          <FormHelperText error id="my-helper-text">
            {formik.touched[name] && formik.errors[name]
              ? formik.errors[name]
              : null}
          </FormHelperText>
        </span>
      )
    }

    switch (options.type) {
      case 'select':
        input = (
          <FormControl
            key={name}
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel className={classes.selectLabel} id={'select-' + name}>
              {options.label}
            </InputLabel>
            <Select
              labelId={'select-' + name}
              label={name}
              {...formik.getFieldProps(name)}
            >
              {options.values.map((el: string) => {
                return (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                )
              })}
            </Select>
            <FormHelperText error id="my-helper-text">
              {formik.errors[name] ? formik.errors[name] : null}
            </FormHelperText>
          </FormControl>
        )
        break
      case 'multiline':
        input = (
          <span key={name}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              id={name}
              label={options.label}
              rows={options.maxRows}
              autoComplete={name}
              {...formik.getFieldProps(name)}
            />
            <FormHelperText error id="my-helper-text">
              {formik.touched[name] && formik.errors[name]
                ? formik.errors[name]
                : null}
            </FormHelperText>
          </span>
        )
        break
      case 'password':
        input = (
          <span key={name}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id={name}
              label={options.label}
              autoComplete={name}
              type="password"
              {...formik.getFieldProps(name)}
            />
            <FormHelperText error id="my-helper-text">
              {formik.touched[name] && formik.errors[name]
                ? formik.errors[name]
                : null}
            </FormHelperText>
          </span>
        )
        break
      case 'checkbox':
        input = (
          <span key={name}>
            <FormControlLabel
              className={classes.formControl}
              control={
                <Checkbox
                  color="primary"
                  aria-describedby="checkbox-error-text"
                  checked={formik.values[name]}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    formik.setFieldValue(name, event.target.checked ? 1 : 0)
                  }}
                />
              }
              label={options.label}
            />
            <FormHelperText error id="checkbox-error-text">
              {formik.errors[name] ? formik.errors[name] : null}
            </FormHelperText>
          </span>
        )
        break
    }

    return input
  })
}
