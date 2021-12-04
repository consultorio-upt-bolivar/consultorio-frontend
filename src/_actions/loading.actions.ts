import { loadingConstants } from '../_constants'

export const loadingActions = {
  show,
  hide
}

function show() {
  return { type: loadingConstants.SHOW }
}

function hide() {
  return { type: loadingConstants.HIDE }
}