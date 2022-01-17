import React, { useEffect, useState } from 'react'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { toastActions } from '../../_actions'
import { makeStyles } from '@mui/styles';
import theme from '../../theme/main'
import { Snackbar } from '@mui/material';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
})

export default function ToastMessage() {
  const toast = useSelector((state: any) => state.toast)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    if (toast.message) {
      setOpen(true)
    }
  }, [toast.message])

  const handleClose = (_?: any, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
    setTimeout(() => dispatch(toastActions.clear()), 1000)
  }

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={toast.type}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
