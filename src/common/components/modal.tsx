import React from 'react'
import Modal from '@material-ui/core/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { alertActions } from '../../_actions'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
)

export default function AlertModal() {
  const alert = useSelector((state: any) => state.alert)
  const dispatch = useDispatch()

  const classes = useStyles()

  const handleClose = () => {
    dispatch(alertActions.clear())
  }

  const body = (
    <div style={getModalStyle()} className={classes.paper}>
      <h2 id="simple-modal-title">Alerta</h2>
      <p id="simple-modal-description">{alert.message}</p>
    </div>
  )

  return (
    <div>
      <Modal
        open={!!alert.message}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  )
}
