import axios from 'axios'
import Store from 'electron-store'
import { Notification } from 'element-ui'

const store = new Store({
  name: 'whu-library-seat'
})

// create an axios instance
const service = axios.create({
  baseURL: store.get('baseUrl', 'https://seat.lib.whu.edu.cn:8443'),
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 8.0.0; STF-AL10 Build/HUAWEISTF-AL10)'
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
    Notification({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  })

export default service
