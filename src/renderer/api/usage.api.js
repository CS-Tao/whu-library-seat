import axios from 'axios'
import { remote } from 'electron'
import urls from './urls'

var service = axios.create({
  baseURL: 'https://seat-records.cs-tao.cc',
  timeout: 5000,
  withCredentials: true
})

const appVersion = remote.app.getVersion()

export default {
  // 登录状态
  loginState: (account, state, code) => {
    return service({
      url: urls.usage.loginState.url(),
      method: urls.usage.loginState.method,
      data: {
        account,
        state,
        code,
        version: appVersion,
        time: new Date()
      }
    })
  },
  // 抢座状态
  grabState: (account, state, code) => {
    return service({
      url: urls.usage.grabState.url(),
      method: urls.usage.grabState.method,
      data: {
        account,
        state,
        code,
        version: appVersion,
        time: new Date()
      }
    })
  }
}
