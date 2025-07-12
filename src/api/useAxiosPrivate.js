import axios from 'axios'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../provider/AuthProvider'

const axiosPrivate = axios.create({
  // baseURL: 'https://social-event-server.vercel.app'
  baseURL: 'http://localhost:3000'
})

const useAxiosPrivate = () => {
  const { user, logOut } = useContext(AuthContext)

  useEffect(() => {
    // Request interceptor: always use current token
    const requestInterceptor = axiosPrivate.interceptors.request.use(config => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`
      } else {
        delete config.headers.Authorization
      }
      return config
    })

    // Response interceptor: auto log out on 401/403
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      res => res,
      error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logOut()
            .then(() => {
              console.warn('User logged out due to 401/403')
            })
            .catch(console.error)
        }
        return Promise.reject(error)
      }
    )

    //  Cleanup interceptors on user change/unmount
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor)
      axiosPrivate.interceptors.response.eject(responseInterceptor)
    }
  }, [user?.accessToken, logOut])

  return axiosPrivate
}

export default useAxiosPrivate
