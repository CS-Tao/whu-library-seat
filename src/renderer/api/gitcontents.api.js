import axios from 'axios'
import { Message } from 'element-ui'
import urls from './urls'

var service = axios.create({
  baseURL: 'https://raw.githubusercontent.com/CS-Tao/whu-library-seat',
  timeout: 8000,
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
      url: urls.gitcontents.validateUser.url(),
      method: 'get',
      params: {
        time: new Date()
      }
    })
  }
}
