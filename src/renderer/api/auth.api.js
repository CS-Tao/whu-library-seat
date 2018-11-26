import axios from 'axios'

var service = axios.create({
  baseURL: 'https://seat-ghauth.cs-tao.cc',
  timeout: 10000,
  withCredentials: true
})

export default {
  // 获取 Token
  getToken: (guid) => {
    return service({
      url: '/',
      method: 'get',
      params: {
        authguid: guid
      }
    })
  }
}
