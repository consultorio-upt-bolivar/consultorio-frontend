import { LoginUserReponseDTO } from '../../_api'

export const userStorageConstants = {
  USER_DATA_KEY: 'userData',
  AUTH_KEY: 'userAuth',
}

export const setAuthToken = (data: any): void => {
  localStorage.setItem(userStorageConstants.AUTH_KEY, JSON.stringify(data))
}

export const setUserDataToken = (data: any): void => {
  localStorage.setItem(userStorageConstants.USER_DATA_KEY, JSON.stringify(data))
}

export const clearUserStorage = (): void => {
  localStorage.removeItem(userStorageConstants.AUTH_KEY)
  localStorage.removeItem(userStorageConstants.USER_DATA_KEY)
}

export const getToken = (): string | false => {
  const storage = localStorage.getItem(userStorageConstants.AUTH_KEY)

  if (!storage) return false

  const auth: LoginUserReponseDTO = JSON.parse(storage)

  return `${auth.token_type} ${auth.access_token}`
}

export const getUserData = (): any => {
  const storage = localStorage.getItem(userStorageConstants.USER_DATA_KEY)

  if (!storage) return false

  const data = JSON.parse(storage)

  return data
}
