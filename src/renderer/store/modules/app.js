import Store from 'electron-store'

const store = new Store({
  name: 'whu-library-seat'
})

const defaultSettingInfo = {
  baseUrl: 'https://seat.lib.whu.edu.cn:8443',
  oppointmentTime: new Date(2018, 4, 10, 22, 45),
  availableTime: [new Date(2018, 4, 10, 8, 0), new Date(2018, 4, 10, 22, 30)],
  backgroundEnable: true
}

const app = {
  state: {
    userInfo: {
      account: store.get('whuSeatUserAccount', ''),
      passwd: store.get('whuSeatUserPasswd', ''),
      token: '0'
    },
    seatInfo: {
      library: store.get('whuSeatLibrary', ''),
      room: store.get('whuSeatRoom', ''),
      beginTime: store.get('whuSeatBeginTime', ''),
      endTime: store.get('whuSeatEndTime', ''),
      seatNum: store.get('whuSeatNum', 1),
      battery: store.get('whuSeatBattery', false),
      sun: store.get('whuSeatSun', false)
    },
    settingInfo: {
      baseUrl: store.get('baseUrl', defaultSettingInfo.baseUrl),
      oppointmentTime: new Date(store.get('oppointmentTime', defaultSettingInfo.oppointmentTime)),
      availableTime: [new Date(store.get('availableTime', defaultSettingInfo.availableTime)[0]), new Date(store.get('availableTime', defaultSettingInfo.availableTime)[1])],
      backgroundEnable: store.get('backgroundEnable', defaultSettingInfo.backgroundEnable)
    },
    roomInfo: {
      buildings: [],
      rooms: [],
      dates: []
    }
  },
  mutations: {
    SET_ACCOUNT: (state, account) => {
      state.userInfo.account = account
      store.set('whuSeatUserAccount', account)
    },
    SET_PASSWD: (state, passwd) => {
      state.userInfo.passwd = passwd
      store.set('whuSeatUserPasswd', passwd)
    },
    SET_TOKEN: (state, token) => {
      state.userInfo.token = token
    },
    SAVE_SEATINFO: (state, seatInfo) => {
      state.seatInfo.library = seatInfo.library
      state.seatInfo.room = seatInfo.room
      state.seatInfo.beginTime = seatInfo.beginTime
      state.seatInfo.endTime = seatInfo.endTime
      state.seatInfo.seatNum = seatInfo.seatNum
      state.seatInfo.battery = seatInfo.changer
      state.seatInfo.sun = seatInfo.sun
      store.set('whuSeatLibrary', seatInfo.library)
      store.set('whuSeatRoom', seatInfo.room)
      store.set('whuSeatBeginTime', seatInfo.beginTime)
      store.set('whuSeatEndTime', seatInfo.endTime)
      store.set('whuSeatNum', seatInfo.seatNum)
      store.set('whuSeatBattery', seatInfo.changer)
      store.set('whuSeatSun', seatInfo.sun)
    },
    SAVE_SETTINGS: (state, settings) => {
      state.settingInfo = settings
      store.set('baseUrl', settings.baseUrl)
      store.set('oppointmentTime', settings.oppointmentTime)
      store.set('availableTime', settings.availableTime)
      store.set('backgroundEnable', settings.backgroundEnable)
    },
    RESTORE_SETTINGS: (state) => {
      state.settingInfo = defaultSettingInfo
      store.set('baseUrl', defaultSettingInfo.baseUrl)
      store.set('oppointmentTime', defaultSettingInfo.oppointmentTime)
      store.set('availableTime', defaultSettingInfo.availableTime)
      store.set('backgroundEnable', defaultSettingInfo.backgroundEnable)
    },
    SAVE_ROOM_INFO: (state, data) => {
      state.roomInfo = data
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
    saveSeatInfo ({ commit }, seatInfo) {
      commit('SAVE_SEATINFO', seatInfo)
    },
    saveSettings ({ commit }, settings) {
      commit('SAVE_SETTINGS', settings)
    },
    restoreSettings ({ commit }) {
      commit('RESTORE_SETTINGS')
    },
    saveRoomInfo ({ commit }, data) {
      commit('SAVE_ROOM_INFO', data)
    }
  }
}

export default app
