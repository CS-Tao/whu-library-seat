import axios from 'axios'
import { remote } from 'electron'
import urls from './urls'
import Store from 'electron-store'

const store = new Store({
  name: 'whu-library-seat'
})

var service = axios.create({
  baseURL: 'https://seat-records.cs-tao.cc',
  timeout: 5000,
  withCredentials: true
})

const appVersion = remote.app.getVersion()

export default {
  // 登录状态
  loginState: (account, state, code, message = null) => {
    let usageRecordEnable = store.get('usageRecordEnable', true)
    let githubUserInfo = store.get('authInfo_githubUserInfo', null)
    let githubid = (githubUserInfo && githubUserInfo.id) ? githubUserInfo.id : null
    if ((githubUserInfo && githubUserInfo.id) || usageRecordEnable) {
      service({
        url: urls.usage.loginState.url(),
        method: urls.usage.loginState.method,
        data: {
          account,
          githubid,
          state,
          code,
          message: message || '',
          version: appVersion,
          time: new Date()
        }
      }).then(() => {}).catch(() => {})
    }
  },
  // 抢座状态
  grabState: (account, state, code, message = null) => {
    let usageRecordEnable = store.get('usageRecordEnable', true)
    let githubUserInfo = store.get('authInfo_githubUserInfo', null)
    let githubid = (githubUserInfo && githubUserInfo.id) ? githubUserInfo.id : null
    if ((githubUserInfo && githubUserInfo.id) || usageRecordEnable) {
      service({
        url: urls.usage.grabState.url(),
        method: urls.usage.grabState.method,
        data: {
          account,
          githubid,
          state,
          code,
          message: message || '',
          version: appVersion,
          time: new Date()
        }
      }).then(() => {}).catch(() => {})
    }
  }
}
