import { LoginUserReponseDTO } from '../_api'
import CryptoJS, { AES } from 'crypto-js'

export const userStorageConstants = {
  USER_DATA_KEY: 'userData',
  AUTH_KEY: 'userAuth',
  SECRET: process.env.REACT_APP_ENCRYPT_KEY
}

export const setAuthToken = (data: any): void => {
  localStorage.setItem(userStorageConstants.AUTH_KEY, JSON.stringify(data))
}

export const setUserDataToken = (data: any): void => {
  const encrypted = AES.encrypt(JSON.stringify(data), userStorageConstants.SECRET ?? "SECRET").toString();
  localStorage.setItem(userStorageConstants.USER_DATA_KEY, encrypted)
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

  const bytes = AES.decrypt(storage, userStorageConstants.SECRET ?? "SECRET");
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  const data = JSON.parse(originalText)

  return data
}
