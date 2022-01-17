import React from 'react'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { alertActions } from '../../_actions'

export default function AlertModal() {
  const alert = useSelector((state: any) => state.alert)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(alertActions.clear())
  }

  return (
    <div>
      <Dialog
        open={!!alert.message}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Alerta</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alert.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
