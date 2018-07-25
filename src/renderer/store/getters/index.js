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

function getTimeInterval (beginTime = 8, count = 30, interval = 30) {
  var timeArray = []
  for (var i = 0; i < count; i++) {
    timeArray.push({
      time: beginTime * 60 + i * interval,
      label: (beginTime + parseInt(i / 2)) + ':' + (i % 2 === 0 ? '00' : '30')
    })
  }
  return timeArray
}

const getters = {
  // user info
  userAccount: state => state.app.userInfo.account,
  userPasswd: state => state.app.userInfo.passwd,
  userToken: state => state.app.userInfo.token,
  hasToken: state => state.app.userInfo.token !== '0',
  // seat info
  seatInfoLibrary: state => state.app.seatInfo.library,
  seatInfoRoom: state => state.app.seatInfo.room,
  seatInfoBeginTime: state => state.app.seatInfo.beginTime,
  seatInfoEndTime: state => state.app.seatInfo.endTime,
  seatInfoSeatNum: state => state.app.seatInfo.seatNum,
  seatInfoBattery: state => state.app.seatInfo.battery,
  seatInfoSun: state => state.app.seatInfo.sun,
  // library & room
  freeLibrarys: state => state.app.roomInfo.buildings,
  freeRooms: state => state.app.roomInfo.rooms,
  // freeDates: state => state.app.roomInfo.dates,
  freeDates: state => [formatDate(new Date()), formatDate(getTomorrow())],
  freeBeginTime: state => getTimeInterval(),
  freeEndTime: state => getTimeInterval(),
  // settings
  settingInfo: state => state.app.settingInfo
}

export default getters
