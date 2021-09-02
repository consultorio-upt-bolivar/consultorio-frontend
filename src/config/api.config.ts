import env from 'react-dotenv'
import { axiosConstants } from '../_constants'
import { Configuration, LoginUserReponseDTO } from '../_services/api'

const getToken = () => {
  const storage = localStorage.getItem(axiosConstants.AUTH_KEY)

  if (!storage) return false

  const auth: LoginUserReponseDTO = JSON.parse(storage)

  return `${auth.token_type} ${auth.access_token}`
}

export const getConfiguration = () => {
  const token = getToken()

  const configuration = new Configuration({
    basePath: env.API_URL ?? '',
    baseOptions: token
      ? {
          headers: {
            authorization: token,
          },
        }
      : {},
  })

  return configuration
}
