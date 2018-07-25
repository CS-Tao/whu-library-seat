import request from './config'

export default {
  // 登录
  Login: (account, passwd) => {
    return request({
      url: '/rest/auth',
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
      url: '/rest/v2/free/filters',
      method: 'get',
      headers: {
        token
      }
    })
  },
  // 得到房间详细信息
  RoomStats: (libraryId, token) => {
    return request({
      url: '/rest/v2/room/stats2/' + libraryId,
      method: 'get',
      headers: {
        token
      }
    })
  },
  // 验证 token 是否可用
  ValidateToken: (token) => {
    return request({
      url: '/rest/v2/violations',
      method: 'get',
      headers: {
        token
      }
    })
  },
  // 得到位置详细信息
  LayoutByDate: (roomId, dateStr, token) => {
    return request({
      url: '/rest/v2/room/layoutByDate/' + roomId + '/' + dateStr,
      method: 'get',
      headers: {
        token
      }
    })
  },
  // 预定位置
  // t=1&startTime=1290&endTime=1350&seat=5728&date=2018-07-23&t2=2
  Book: (t, t2, startTime, endTime, seat, date, token) => {
    return request({
      url: '/rest/v2/freeBook',
      method: 'post',
      headers: {
        token
      },
      body: {
        t, t2, startTime, endTime, seat, date
      }
    })
  },
  // 得到用户信息
  User: (token) => {
    return request({
      url: '/rest/v2/user',
      method: 'get',
      headers: {
        token
      }
    })
  },
  // 得到预约历史
  History: (page, count, token) => {
    return request({
      url: '/rest/v2/history/' + page + '/' + count,
      method: 'get',
      headers: {
        token
      }
    })
  }
}
