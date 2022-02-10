import React from 'react'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { alertActions } from '../../_actions'

export default function AlertModal() {
  const alert = useSelector((state: any) => state.alert)
  const dispatch = useDispatch()

  const handleClose = (answer: boolean) => {
    dispatch(alertActions.close(answer, alert.callback))
  }

  const hide = () => {
    dispatch(alertActions.clear())
  }

  return (
    <div>
      <Dialog
        open={!!alert.show}
        onClose={hide}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {alert.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alert.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="error" variant="outlined" autoFocus>
            NO
          </Button>

          <Button onClick={() => handleClose(true)} color="primary" variant="outlined" autoFocus>
            SI
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
