import Cookies from 'js-cookie'

function getCookies (key) {
  return Cookies.get(key) === undefined ? '' : Cookies.get(key)
}

const app = {
  state: {
    userInfo: {
      account: getCookies('whuSeatUserAccount'),
      passwd: getCookies('whuSeatUserPasswd')
    },
    seatInfo: {
      library: getCookies('whuSeatLibrary'),
      room: getCookies('whuSeatRoom'),
      beginTime: getCookies('whuSeatBeginTime'),
      endTime: getCookies('whuSeatEndTime'),
      seatNum: getCookies('whuSeatNum'),
      battery: +Cookies.get('whuSeatBattery'),
      sun: +Cookies.get('whuSeatSun')
    }
  },
  mutations: {
    SET_ACCOUNT: (state, account) => {
      state.userInfo.account = account
      Cookies.set('whuSeatUserAccount', account)
    },
    SET_PASSWD: (state, passwd) => {
      state.userInfo.passwd = passwd
      Cookies.set('whuSeatUserPasswd', passwd)
    },
    SAVE_SETTINGS: (state, settings) => {
      // settings: {
      //   library: '',
      //   room: '',
      //   beginTime: '',
      //   endTime: '',
      //   seatNum: 1,
      //   changer: false,
      //   sun: false
      // }
      state.seatInfo.library = settings.library
      state.seatInfo.room = settings.room
      state.seatInfo.beginTime = settings.beginTime
      state.seatInfo.endTime = settings.endTime
      state.seatInfo.libseatNumrary = settings.seatNum
      state.seatInfo.battery = settings.changer
      state.seatInfo.sun = settings.sun

      Cookies.set('whuSeatLibrary', settings.library)
      Cookies.set('whuSeatRoom', settings.room)
      Cookies.set('whuSeatBeginTime', settings.beginTime)
      Cookies.set('whuSeatEndTime', settings.endTime)
      Cookies.set('whuSeatNum', settings.seatNum)
      Cookies.set('whuSeatBattery', settings.changer ? 1 : 0)
      Cookies.set('whuSeatSun', settings.sun ? 1 : 0)
    }
  },
  actions: {
    setAccount ({ commit }, account) {
      commit('SET_ACCOUNT', account)
    },
    setPasswd ({ commit }, passwd) {
      commit('SET_PASSWD', passwd)
    },
    saveSettings ({ commit }, settings) {
      commit('SAVE_SETTINGS', settings)
    }
  }
}

export default app
