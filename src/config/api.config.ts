import { getToken } from '../common/utils/userStorage'
import { Configuration } from '../_api'

export const getConfiguration = (): Configuration => {
  const configuration = new Configuration({
    basePath: 'http://localhost:8080',
    baseOptions: getToken()
      ? {
          headers: {
            Authorization: getToken(),
          },
        }
      : {},
  })

  return configuration
}
