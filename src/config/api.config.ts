import { getToken } from '../common/utils/userStorage'
import { Configuration } from '../_api'

export const getConfiguration = (): Configuration => {
  const token = getToken()

  //TODO: CHANGE THIS

  const configuration = new Configuration({
    basePath: 'http://localhost:8080',
    baseOptions: token
      ? {
          headers: {
            Authorization: token,
          },
        }
      : {},
  })

  return configuration
}
