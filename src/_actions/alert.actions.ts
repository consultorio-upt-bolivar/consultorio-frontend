import { Dispatch } from 'redux';
import { alertConstants } from '../_constants'

function show({
  title,
  description,
  callback
}: { title: string, description: string, callback: () => void }) {
  return { type: alertConstants.SHOW, title, description, callback }
}

function close(answer: boolean, callback: () => void) {
  return (dispatch: Dispatch) => {
    dispatch({ type: alertConstants.HIDE });
    if (answer) callback();
  }
}

function clear() {
  return { type: alertConstants.CLEAR }
}

export const alertActions = {
  show,
  close,
  clear,
}