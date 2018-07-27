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

// function getTomorrow () {
//   var tomorrow = new Date()
//   tomorrow.setDate(tomorrow.getDate() + 1)
//   return tomorrow
// }

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
  // time info
  // freeDates: state => [formatDate(new Date()), formatDate(getTomorrow())],
  freeDates: state => [formatDate(new Date()), formatDate(new Date())],
  freeBeginTime: state => getTimeInterval(),
  freeEndTime: state => getTimeInterval(),
  // seat info
  seatInfo: state => state.app.seatInfo,
  // library info
  libraryInfo: state => state.app.libraryInfo,
  // settings
  settingInfo: state => state.app.settingInfo
}

export default getters
