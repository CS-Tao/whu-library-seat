import Store from 'electron-store'

const store = new Store({
  name: 'whu-library-seat'
})

function formatDate (date, options) {
  options = options || {}
  options.sign = options.sign || 'yyyy-MM-dd'
  var _complete = function (n) {
    return (n > 9) ? n : '0' + n
  }
  var year = date.getFullYear()
  var month = _complete(date.getMonth() + 1)
  var day = _complete(date.getDate())
  var result = options.sign
  result = result.replace('yyyy', year)
  result = result.replace('MM', month)
  result = result.replace('dd', day)
  return result
}

function getTomorrow () {
  var tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
}

function getTodayTime (hours, minutes, seconds) {
  var today = new Date()
  today.setHours(hours)
  today.setMinutes(minutes)
  today.setSeconds(seconds)
  return today
}

function getTomorrowTime (hours, minutes, seconds) {
  var tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(hours)
  tomorrow.setMinutes(minutes)
  tomorrow.setSeconds(seconds)
  return tomorrow
}

const defaultSettingInfo = {
  baseUrl: 'https://seat.lib.whu.edu.cn:8443',
  oppointmentTime: getTodayTime(22, 45, 0),
  beginTime: getTomorrowTime(8, 0, 0),
  endTime: getTomorrowTime(22, 30, 0),
  checkOpenEnable: true,
  checkOpenPreMili: 10000,
  backgroundEnable: true,
  usageRecordEnable: true
}

const statusEnum = {
  unset: 'unset',
  waiting: 'waiting',
  checking: 'checking',
  working: 'working',
  success: 'success',
  fail: 'fail'
}

const defaultTimerInfo = {
  // status: unset、waiting、checking、working、success、fail
  status: statusEnum.unset,
  message: '定时抢座',
  totalTime: null,
  waitedTime: null,
  intervalId: null,
  timerId: null,
  loginTimerId: null,
  lastTimerId: null
}

function getTimeStateByMilliSecond (milliSecond) {
  let hours = parseInt(milliSecond / (1000 * 60 * 60))
  let minutes = parseInt((milliSecond % (1000 * 60 * 60)) / (1000 * 60))
  let seconds = parseInt((milliSecond % (1000 * 60)) / 1000)
  hours = hours < 0 ? 0 : hours
  minutes = minutes < 0 ? 0 : minutes
  seconds = seconds < 0 ? 0 : seconds
  return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
}

const app = {
  state: {
    userInfo: {
      account: store.get('whuSeatUserAccount', null),
      passwd: store.get('whuSeatUserPasswd', null),
      token: null
    },
    seatInfo: {
      date: store.get('whuSeatDate', 0),
      library: store.get('whuSeatLibrary', null),
      room: store.get('whuSeatRoom', null),
      beginTime: store.get('whuSeatBeginTime', null),
      endTime: store.get('whuSeatEndTime', null),
      seatNum: store.get('whuSeatNum', null),
      battery: store.get('whuSeatBattery', false),
      sun: store.get('whuSeatSun', false)
    },
    settingInfo: {
      baseUrl: store.get('baseUrl', defaultSettingInfo.baseUrl),
      oppointmentTime: new Date(store.get('oppointmentTime', defaultSettingInfo.oppointmentTime)),
      beginTime: new Date(store.get('availableBeginTime', defaultSettingInfo.beginTime)),
      endTime: new Date(store.get('availableEndTime', defaultSettingInfo.endTime)),
      checkOpenEnable: store.get('checkOpenEnable', defaultSettingInfo.checkOpenEnable),
      checkOpenPreMili: store.get('checkOpenPreMili', defaultSettingInfo.checkOpenPreMili),
      backgroundEnable: store.get('backgroundEnable', defaultSettingInfo.backgroundEnable),
      usageRecordEnable: store.get('usageRecordEnable', defaultSettingInfo.usageRecordEnable)
    },
    libraryInfo: {
      buildings: [],
      rooms: [],
      dates: []
    },
    timerInfo: {...defaultTimerInfo},
    announceViewed: true,
    freeDates: [formatDate(new Date()), formatDate(getTomorrow())]
  },
  mutations: {
    SET_ACCOUNT: (state, account) => {
      state.userInfo.account = account
    },
    SET_PASSWD: (state, passwd) => {
      state.userInfo.passwd = passwd
    },
    SET_TOKEN: (state, token) => {
      state.userInfo.token = token
    },
    SAVE_ACCOUNT: (state, account) => {
      state.userInfo.account = account
      store.set('whuSeatUserAccount', account)
    },
    SAVE_PASSWD: (state, passwd) => {
      state.userInfo.passwd = passwd
      store.set('whuSeatUserPasswd', passwd)
    },
    SAVE_SEATINFO: (state, seatInfo) => {
      state.seatInfo = {...seatInfo}
      state.seatInfo.date = seatInfo.date === formatDate(new Date()) ? 0 : 1
      store.set('whuSeatDate', state.seatInfo.date)
      store.set('whuSeatLibrary', seatInfo.library)
      store.set('whuSeatRoom', seatInfo.room)
      store.set('whuSeatBeginTime', seatInfo.beginTime)
      store.set('whuSeatEndTime', seatInfo.endTime)
      store.set('whuSeatNum', seatInfo.seatNum)
      store.set('whuSeatBattery', seatInfo.battery)
      store.set('whuSeatSun', seatInfo.sun)
    },
    SAVE_SETTINGS: (state, settings) => {
      state.settingInfo = settings
      store.set('baseUrl', settings.baseUrl)
      store.set('oppointmentTime', settings.oppointmentTime)
      store.set('availableBeginTime', settings.beginTime)
      store.set('availableEndTime', settings.endTime)
      store.set('checkOpenEnable', settings.checkOpenEnable)
      store.set('checkOpenPreMili', settings.checkOpenPreMili)
      store.set('backgroundEnable', settings.backgroundEnable)
      store.set('usageRecordEnable', settings.usageRecordEnable)
    },
    RESTORE_SETTINGS: (state) => {
      state.settingInfo = {...defaultSettingInfo}
      store.set('baseUrl', defaultSettingInfo.baseUrl)
      store.set('oppointmentTime', defaultSettingInfo.oppointmentTime)
      store.set('availableBeginTime', defaultSettingInfo.beginTime)
      store.set('availableEndTime', defaultSettingInfo.endTime)
      store.set('checkOpenEnable', defaultSettingInfo.checkOpenEnable)
      store.set('checkOpenPreMili', defaultSettingInfo.checkOpenPreMili)
      store.set('backgroundEnable', defaultSettingInfo.backgroundEnable)
      store.set('usageRecordEnable', defaultSettingInfo.usageRecordEnable)
    },
    SAVE_LIBRARY_INFO: (state, data) => {
      state.libraryInfo = data
    },
    SET_TIMER: (state, timerInfo) => {
      state.timerInfo = {...timerInfo}
    },
    UPDATE_TIMER_STATE: (state, status = statusEnum.waiting) => {
      state.timerInfo.status = status
      if (status === statusEnum.waiting) {
        state.timerInfo.waitedTime += 1000
        let timeDeduct = state.timerInfo.totalTime - state.timerInfo.waitedTime
        state.timerInfo.message = getTimeStateByMilliSecond(timeDeduct)
      } else if (status === statusEnum.working) {
        if (state.timerInfo.intervalId) {
          window.clearTimeout(state.timerInfo.intervalId)
        }
        state.timerInfo.message = '正在抢座'
      } else if (status === statusEnum.checking) {
        if (state.timerInfo.intervalId) {
          window.clearTimeout(state.timerInfo.intervalId)
        }
        state.timerInfo.message = '正在检测'
      } else if (status === statusEnum.success) {
        state.timerInfo.message = '抢座成功'
      } else if (status === statusEnum.fail) {
        state.timerInfo.message = '抢座失败'
      } else if (status === statusEnum.unset) {
        state.timerInfo.message = '定时抢座'
      } else {
        // 传入 button 需要显示的消息
        state.timerInfo.status = statusEnum.working
        state.timerInfo.message = status
      }
    },
    CANCEL_TIMER: (state, status) => {
      if (state.timerInfo.intervalId) {
        window.clearTimeout(state.timerInfo.intervalId)
      }
      if (state.timerInfo.timerId) {
        window.clearTimeout(state.timerInfo.timerId)
      }
      if (state.timerInfo.loginTimerId) {
        window.clearTimeout(state.timerInfo.loginTimerId)
      }
      if (state.timerInfo.lastTimerId) {
        window.clearTimeout(state.timerInfo.lastTimerId)
      }
      state.timerInfo = {...defaultTimerInfo}
      // if (status !== null) {
      //   if (status) {
      //     state.timerInfo.message = '抢座成功'
      //     state.timerInfo.status = statusEnum.success
      //   } else {
      //     state.timerInfo.message = '抢座失败'
      //     state.timerInfo.status = statusEnum.fail
      //   }
      // }
    },
    SET_ANNOUNCE_VIEWED: (state, viewed) => {
      state.announceViewed = viewed
    },
    UPDATE_FREE_DATES: (state) => {
      state.freeDates = [formatDate(new Date()), formatDate(getTomorrow())]
    }
  },
  actions: {
    setAccount ({ commit }, account) {
      commit('SET_ACCOUNT', account)
    },
    setPasswd ({ commit }, passwd) {
      commit('SET_PASSWD', passwd)
    },
    setToken ({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    saveAccount ({ commit }, account) {
      commit('SAVE_ACCOUNT', account)
    },
    savePasswd ({ commit }, passwd) {
      commit('SAVE_PASSWD', passwd)
    },
    saveSeatInfo ({ commit }, seatInfo) {
      commit('SAVE_SEATINFO', {...seatInfo})
    },
    saveSettings ({ commit }, settings) {
      commit('SAVE_SETTINGS', {...settings})
    },
    restoreSettings ({ commit }) {
      commit('RESTORE_SETTINGS')
    },
    saveLibraryInfo ({ commit }, data) {
      commit('SAVE_LIBRARY_INFO', {...data})
    },
    // 参数为 {bookFunc: callback, time: millisecond}
    // 应当在 bookFunc 所有的异步函数执行完成之后手动执行 Action: cancelTimer()
    setTimer ({ commit, state }, param) {
      if (param) {
        const checkInAdvanceMili = state.settingInfo.checkOpenPreMili
        const loginInAdvanceMili = checkInAdvanceMili + 10000
        if (state.timerInfo.state !== statusEnum.unset) {
          commit('CANCEL_TIMER', null)
        }
        var timerInfo = Object()
        var oppointmentTimeMilli = param.time.getTime()
        var isToday = param.isToday
        timerInfo.waitedTime = 0
        timerInfo.totalTime = oppointmentTimeMilli - (new Date()).getTime()
        if (timerInfo.totalTime <= 0) {
          // 时间差小于等于 0 立即预约
          timerInfo.totalTime = 0
          timerInfo.timerId = setTimeout(() => {
            if (state.settingInfo.checkOpenEnable && !isToday) {
              commit('UPDATE_TIMER_STATE', statusEnum.checking)
            }
            param.checkOpenAndBookFunc()
          }, timerInfo.totalTime)
        } else if (timerInfo.totalTime < checkInAdvanceMili) {
          // 时间差大于 0，小于提前检查是否开放的时间差，定时直接预约
          timerInfo.timerId = setTimeout(() => {
            if (state.settingInfo.checkOpenEnable && !isToday) {
              commit('UPDATE_TIMER_STATE', statusEnum.checking)
            }
            param.checkOpenAndBookFunc()
          }, timerInfo.totalTime)
        } else if (timerInfo.totalTime < loginInAdvanceMili) {
          // 时间差小于登录时间差，大于检测开放时间差，定时(提前 checkInAdvanceMili 毫秒)先检测是否开放，再预约
          if (state.settingInfo.checkOpenEnable && !isToday) {
            // 启用开放检测
            timerInfo.timerId = setTimeout(() => {
              param.checkOpenAndBookFunc()
            }, timerInfo.totalTime - checkInAdvanceMili)
            timerInfo.lastTimerId = setTimeout(() => {
              // 如果定时完毕还未开放则修改按钮文字
              if (state.timerInfo.status === statusEnum.waiting) { commit('UPDATE_TIMER_STATE', statusEnum.checking) }
            }, timerInfo.totalTime)
          } else {
            // 关闭开放检测
            timerInfo.timerId = setTimeout(() => {
              param.checkOpenAndBookFunc()
            }, timerInfo.totalTime)
          }
        } else {
          // 时间差大于登录时间差，定时(提前 loginInAdvanceMili 毫秒)登录，再(提前 checkInAdvanceMili 毫秒)检查是否开放，再预约
          if (state.settingInfo.checkOpenEnable && !isToday) {
            // 启用开放检测
            timerInfo.loginTimerId = setTimeout(() => {
              param.loginFunc()
            }, timerInfo.totalTime - loginInAdvanceMili)
            timerInfo.timerId = setTimeout(() => {
              param.checkOpenAndBookFunc()
            }, timerInfo.totalTime - checkInAdvanceMili)
            timerInfo.lastTimerId = setTimeout(() => {
              // 如果定时完毕还未开放则修改按钮文字
              if (state.timerInfo.status === statusEnum.waiting) { commit('UPDATE_TIMER_STATE', statusEnum.checking) }
            }, timerInfo.totalTime)
          } else {
            // 关闭开放检测
            timerInfo.loginTimerId = setTimeout(() => {
              param.loginFunc()
            }, timerInfo.totalTime - checkInAdvanceMili) // 使用 checkInAdvanceMili 替代 loginInAdvanceMili
            timerInfo.timerId = setTimeout(() => {
              param.checkOpenAndBookFunc()
            }, timerInfo.totalTime)
          }
        }
        timerInfo.intervalId = setInterval(() => {
          commit('UPDATE_TIMER_STATE')
        }, 1000)
        timerInfo.status = statusEnum.waiting
        timerInfo.message = getTimeStateByMilliSecond(timerInfo.totalTime)
        commit('SET_TIMER', timerInfo)
      }
    },
    updateTimer ({ commit }, status) {
      commit('UPDATE_TIMER_STATE', status)
      if (status === statusEnum.fail) {
        commit('CANCEL_TIMER', false)
      } else if (status === statusEnum.success) {
        commit('CANCEL_TIMER', true)
      } else if (status === statusEnum.unset) {
        commit('CANCEL_TIMER', null)
      }
    },
    // status: null 代表中途取消, true 代表预约成功, false 代表预约失败
    cancelTimer ({ commit }, status) {
      commit('CANCEL_TIMER', status)
    },
    setAnnounceViewed ({ commit }, viewed) {
      commit('SET_ANNOUNCE_VIEWED', viewed)
    },
    updateFreeDates ({ commit }) {
      commit('UPDATE_FREE_DATES')
    }
  }
}

export default app
