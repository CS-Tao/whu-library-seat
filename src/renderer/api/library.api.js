import request from './config'
import urls from './urls'
// import Mock from 'mockjs'

export default {
  // 登录
  Login: (account, passwd) => {
    return request({
      url: urls.library.Login.url(),
      method: urls.library.Login.method,
      // headers: {
      //   token: Mock.mock(/[A-Z\d]{18}/)
      // },
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
      method: urls.library.FreeFilters.method,
      headers: {
        token
      }
    })
  },
  // 得到房间详细信息
  RoomStats: (libraryId, token) => {
    return request({
      url: urls.library.RoomStats.url(libraryId),
      method: urls.library.RoomStats.method,
      headers: {
        token
      }
    })
  },
  // 验证 token 是否可用
  ValidateToken: (token) => {
    return request({
      url: urls.library.ValidateToken.url(),
      method: urls.library.ValidateToken.method,
      headers: {
        token
      }
    })
  },
  // 得到位置详细信息
  LayoutByDate: (roomId, dateStr, token) => {
    return request({
      url: urls.library.LayoutByDate.url(roomId, dateStr),
      method: urls.library.LayoutByDate.method,
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
      method: urls.library.SearchSeat.method,
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
      method: urls.library.Book.method,
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
      method: urls.library.Cancel.method,
      headers: {
        token
      }
    })
  },
  // 得到用户信息
  User: (token) => {
    return request({
      url: urls.library.User.url(),
      method: urls.library.User.method,
      headers: {
        token
      }
    })
  },
  // 得到预约历史
  History: (page, count, token) => {
    return request({
      url: urls.library.History.url(page, count),
      method: urls.library.History.method,
      headers: {
        token
      }
    })
  },
  // 终止使用
  Stop: (token) => {
    return request({
      url: urls.library.Stop.url(),
      method: urls.library.Stop.method,
      headers: {
        token
      }
    })
  }
}
