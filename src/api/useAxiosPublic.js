import axios from 'axios'

const axiosPublic = axios.create({
  baseURL: 'https://b11a12-server-side-aminulislamrahat.vercel.app'
  //baseURL: 'http://localhost:3000'
})

const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic
