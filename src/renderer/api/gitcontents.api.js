import axios from 'axios'
import { Message } from 'element-ui'

var service = axios.create({
  baseURL: 'https://raw.githubusercontent.com/CS-Tao/whu-library-seat',
  timeout: 5000,
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

export default {
  // 用户验证
  validateUser: () => {
    return service({
      url: '/user-validation/validation.json',
      method: 'get',
      params: {
        time: new Date()
      }
    })
  }
}
