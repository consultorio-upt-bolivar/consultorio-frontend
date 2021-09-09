import React from 'react'
import Modal from '@material-ui/core/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { alertActions } from '../../_actions'
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Theme,
} from '@material-ui/core'

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
