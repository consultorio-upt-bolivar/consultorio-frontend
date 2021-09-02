import axios from 'axios'
import { LoginUserReponseDTO } from '../_services/api'

import { axiosConstants } from '../_constants'

const getToken = () => {
    const storage = localStorage.getItem(axiosConstants.AUTH_KEY)

    if (!storage) return false

    const auth: LoginUserReponseDTO = JSON.parse(storage)

    return `${auth.token_type} ${auth.access_token}`
}

const httpClient = axios.create()

// Add a request interceptor
httpClient.interceptors.request.use(
    function (config) {
        const token = getToken()

        if (token) {
            config.headers['authorization'] = token
        }

        console.log(config)

        return config
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
httpClient.interceptors.response.use(
    function (response) {
        console.log(response)

        return response
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
    }
)

export default httpClient
