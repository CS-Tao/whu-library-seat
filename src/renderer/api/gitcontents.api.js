import axios from 'axios'
import urls from './urls'

var service = axios.create({
  baseURL: 'http://home.cs-tao.cc/github-content/contents/github/whu-library-seat',
  timeout: 8000,
  withCredentials: true
})

export default {
  // 用户验证
  validateUser: () => {
    return service({
      url: urls.gitcontents.validateUser.url(),
      method: urls.gitcontents.validateUser.method,
      params: {
        time: new Date()
      }
    })
  },
  // 公告
  announce: () => {
    return service({
      url: urls.gitcontents.announce.url(),
      method: urls.gitcontents.announce.method,
      params: {
        time: new Date()
      }
    })
  },
  // GitHub id 黑名单
  blacklist: () => {
    return service({
      url: urls.gitcontents.blacklist.url(),
      method: urls.gitcontents.blacklist.method,
      params: {
        time: new Date()
      }
    })
  },
  // 禁用软件
  ban: () => {
    return service({
      url: urls.gitcontents.ban.url(),
      method: urls.gitcontents.ban.method,
      params: {
        time: new Date()
      }
    })
  }
}
