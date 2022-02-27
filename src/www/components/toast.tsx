import React, { useEffect, useState } from 'react'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { toastActions } from '../../_actions'
import { makeStyles } from '@mui/styles';
import theme from '../../theme/main'
import { Snackbar } from '@material-ui/core';

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
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleClose = (_?: any, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(toastActions.clear())
  }

  return (
    <div className={classes.root}>
      <Snackbar open={toast.show} autoHideDuration={6000} resumeHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={toast.type}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
