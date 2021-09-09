import { AppHistory } from '../../helpers'

const ApiMessages = [
  {
    error: 'Request failed with status code 401',
    message: 'La sesion ha expirado!',
    redirect: '/login',
  },
  {
    error: 'Request failed with status code 400',
    message: 'Los datos enviados son invalidos!',
  },
]

export const handleError = (error: any): string => {
  const errorMap = ApiMessages.find((el) => el.error == error.message)

  if (errorMap) {
    if (errorMap.redirect) {
      AppHistory.push('/login')
    }

    error = errorMap.message
  }

  return error.toString()
}
