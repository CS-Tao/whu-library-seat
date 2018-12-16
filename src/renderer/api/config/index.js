import axios from 'axios'
import Store from 'electron-store'
import { Message } from 'element-ui'

const store = new Store({
  name: 'whu-library-seat'
})

// create an axios instance
const service = axios.create({
  baseURL: store.get('baseUrl', 'https://seat.lib.whu.edu.cn:8443'),
  timeout: 8000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  withCredentials: true
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => response,
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 3000,
      showClose: true
    })
    return Promise.reject(error)
  })

export default service
