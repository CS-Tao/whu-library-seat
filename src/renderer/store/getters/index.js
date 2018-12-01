function getTimeInterval (beginTime = 0, count = 48, interval = 30) {
  var timeArray = []
  for (var i = 0; i < count; i++) {
    timeArray.push({
      time: beginTime * 60 + i * interval,
      label: (beginTime + parseInt(i / 2)) + ':' + (i % 2 === 0 ? '00' : '30')
    })
  }
  return timeArray
}

// 添加 restTime 和 complete
function addVarToTimer (timerInfo) {
  if (timerInfo.totalTime && timerInfo.waitedTime) {
    timerInfo.restTime = timerInfo.totalTime - timerInfo.waitedTime
    timerInfo.restTime = timerInfo.restTime < 0 ? 0 : timerInfo.restTime
  } else {
    timerInfo.restTime = null
  }
  if (timerInfo.status === 'working' || timerInfo.status === 'waiting' || timerInfo.status === 'checking') {
    timerInfo.complete = false
  } else {
    timerInfo.complete = true
  }
  return timerInfo
}

const getters = {
  // auth info
  authInfo: state => state.githubAuth.authInfo,
  authFormVisible: state =>
    ((!state.githubAuth.authInfo.useListForAuth &&
    (!state.githubAuth.authInfo.githubAuthToken ||
      !state.githubAuth.authInfo.githubUserInfo ||
      !state.githubAuth.authInfo.haveStaredRepo)) ||
      state.githubAuth.formVisible) &&
    !state.app.userInfo.token,
  githubUserIconUrl: state => (state.githubAuth.authInfo.githubUserInfo &&
    state.githubAuth.authInfo.githubUserInfo.avatar_url)
    ? state.githubAuth.authInfo.githubUserInfo.avatar_url : null,
  // user info
  userAccount: state => state.app.userInfo.account,
  userPasswd: state => state.app.userInfo.passwd,
  userToken: state => state.app.userInfo.token,
  hasToken: state => !!state.app.userInfo.token,
  // time info
  freeDates: state => state.app.freeDates,
  freeDatesDefault: state => state.app.freeDates[state.app.seatInfo.date],
  freeBeginTime: state => getTimeInterval(),
  freeEndTime: state => getTimeInterval(),
  // seat info
  seatInfo: state => state.app.seatInfo,
  // library info
  libraryInfo: state => state.app.libraryInfo,
  // settings
  settingInfo: state => state.app.settingInfo,
  oppointmentTime: state => state.app.settingInfo.oppointmentTime,
  // timer info
  timerInfo: state => addVarToTimer(state.app.timerInfo),
  // announce info
  announceViewed: state => state.app.announceViewed
}

export default getters
