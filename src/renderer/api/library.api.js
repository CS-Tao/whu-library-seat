import request from './config'
import urls from './urls'

export default {
  // 登录
  Login: (account, passwd) => {
    return request({
      url: urls.library.Login.url(),
      method: 'get',
      params: {
        username: account,
        password: passwd
      }
    })
  },
  // 得到可以使用的房间信息
  FreeFilters: (token) => {
    return request({
      url: urls.library.FreeFilters.url(),
      method: 'get',
      headers: {
        token
      }
    })
  },
  // 得到房间详细信息
  RoomStats: (libraryId, token) => {
    return request({
      url: urls.library.RoomStats.url(libraryId),
      method: 'get',
      headers: {
        token
      }
    })
  },
  // 验证 token 是否可用
  ValidateToken: (token) => {
    return request({
      url: urls.library.ValidateToken.url(),
      method: 'get',
      headers: {
        token
      }
    })
  },
  // 得到位置详细信息
  LayoutByDate: (roomId, dateStr, token) => {
    return request({
      url: urls.library.LayoutByDate.url(roomId, dateStr),
      method: 'get',
      headers: {
        token
      }
    })
  },
  // 按时间搜索位置
  // startTime=1290&endTime=1350
  // t=1&roomId=7&buildingId=1&batch=9999&page=1&t2=2
  SearchSeat: (buildingId, roomId, dateStr, startTime, endTime, token) => {
    return request({
      url: urls.library.SearchSeat.url(dateStr, startTime, endTime),
      method: 'post',
      headers: {
        token
      },
      data: `t=1&roomId=${roomId}&buildingId=${buildingId}&batch=9999&page=1&t2=2`
    })
  },
  // 预约位置
  // t=1&startTime=1290&endTime=1350&seat=5728&date=2018-07-23&t2=2
  Book: (t, t2, startTime, endTime, seat, date, token) => {
    return request({
      url: urls.library.Book.url(),
      method: 'post',
      headers: {
        token
      },
      data: `t=${t}&startTime=${startTime}&endTime=${endTime}&seat=${seat}&date=${date}&t2=${t2}`
    })
  },
  // 取消预约
  Cancel: (id, token) => {
    return request({
      url: urls.library.Cancel.url(id),
      method: 'get',
      headers: {
        token
      }
    })
  },
  // 得到用户信息
  User: (token) => {
    return request({
      url: urls.library.User.url(),
      method: 'get',
      headers: {
        token
      }
    })
  },
  // 得到预约历史
  History: (page, count, token) => {
    return request({
      url: urls.library.History.url(page, count),
      method: 'get',
      headers: {
        token
      }
    })
  }
}
