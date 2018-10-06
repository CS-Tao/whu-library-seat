const urls = {
  gitcontents: {
    // 用户验证
    validateUser: {
      url () {
        return '/user-validation/validation.json'
      },
      regular: /\/user-validation\/validation.json/,
      method: 'get'
    }
  },
  usage: {
    // 登录状态
    loginState: {
      url () {
        return '/loginState'
      },
      regular: /\/loginState/,
      method: 'post'
    },
    // 抢座状态
    grabState: {
      url () {
        return '/grabState'
      },
      regular: /\/grabState/,
      method: 'post'
    }
  },
  library: {
    // 登录
    Login: {
      url () {
        return '/rest/auth'
      },
      regular: /\/rest\/auth/,
      method: 'get'
    },
    // 得到可以使用的房间信息
    FreeFilters: {
      url () {
        return '/rest/v2/free/filters'
      },
      regular: /\/rest\/v2\/free\/filters/,
      method: 'get'
    },
    // 得到房间详细信息
    RoomStats: {
      url (libraryId) {
        return `/rest/v2/room/stats2/${libraryId}`
      },
      regular: /\/rest\/v2\/room\/stats2\//,
      method: 'get'
    },
    ValidateToken: {
      // 验证 token 是否可用
      url () {
        return '/rest/v2/violations'
      },
      regular: /\/rest\/v2\/violations/,
      method: 'get'
    },
    // 得到位置详细信息
    LayoutByDate: {
      url (roomId, dateStr) {
        return `/rest/v2/room/layoutByDate/${roomId}/${dateStr}`
      },
      regular: /\/rest\/v2\/room\/layoutByDate\//,
      method: 'get'
    },
    // 按时间搜索位置
    SearchSeat: {
      url (dateStr, startTime, endTime) {
        return `/rest/v2/searchSeats/${dateStr}/${startTime}/${endTime}`
      },
      regular: /\/rest\/v2\/searchSeats\//,
      method: 'post'
    },
    // 预约位置
    Book: {
      url () {
        return '/rest/v2/freeBook'
      },
      regular: /\/rest\/v2\/freeBook/,
      method: 'post'
    },
    // 取消预约
    Cancel: {
      url (id) {
        return `/rest/v2/cancel/${id}`
      },
      regular: /\/rest\/v2\/cancel\//,
      method: 'get'
    },
    // 得到用户信息
    User: {
      url () {
        return '/rest/v2/user'
      },
      regular: /\/rest\/v2\/user/,
      method: 'get'
    },
    // 得到预约历史
    History: {
      url (page, count) {
        return `/rest/v2/history/${page}/${count}`
      },
      regular: /\/rest\/v2\/history\//,
      method: 'get'
    },
    // 终止使用
    Stop: {
      url () {
        return '/rest/v2/stop'
      },
      regular: /\/rest\/v2\/stop/,
      method: 'get'
    }
  }
}

export default urls
