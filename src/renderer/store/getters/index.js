const getters = {
  // user info
  userAccount: state => state.app.userInfo.account,
  userPasswd: state => state.app.userInfo.passwd,
  // setting
  settingLibrary: state => state.app.seatInfo.library,
  settingRoom: state => state.app.seatInfo.room,
  settingBeginTime: state => state.app.seatInfo.beginTime,
  settingEndTime: state => state.app.seatInfo.endTime,
  settingSeatNum: state => state.app.seatInfo.seatNum,
  settingBattery: state => state.app.seatInfo.battery,
  settingSun: state => state.app.seatInfo.sun
}

export default getters
