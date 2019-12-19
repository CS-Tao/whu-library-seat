import libraryRestApi from '@/api/library.api'
import usageApi from '@/api/usage.api'

export const monitorStatuses = {
  unstart: 'unstart', // 未开始
  starting: 'starting', // 正在启动
  checking: 'checking', // 检测中
  checkFailed: 'checkingFailed', // 检测失败
  checkSuccessfulYes: 'checkSuccessfulYes', // 检测成功，有空位
  checkSuccessfulNo: 'checkSuccessfulNo', // 检测成功，无空位
  grabingSeat: 'grabingSeat', // 正在抢座
  grabFailed: 'grabFailed', // 抢座失败
  grabSuccessful: 'grabSuccessful', // 抢座成功,
  fatalError: 'fatalError' // 遇到无法继续监控的错误
}

const emptyMessage = '无具体信息'

var monitor = {
  data () {
    return {
      stopMonitorFlag: false,
      monitorIntervalTimer: null,
      monitorLastTimer: null,
      monitorStatus: monitorStatuses.unstart,
      lastErrorTime: (new Date()).getTime()
    }
  },
  // watch: {
  //   monitorStatus () {
  //     console.log('monitorStatus', this.monitorStatus)
  //   }
  // },
  computed: {
    monitorOkBtntext () {
      switch (this.monitorStatus) {
        case monitorStatuses.unstart:
          return '启动'
        case monitorStatuses.starting:
          return '正在启动'
        case monitorStatuses.checking:
          return '正在检测'
        case monitorStatuses.checkFailed:
          return '本次出错'
        case monitorStatuses.checkSuccessfulYes:
          return `${this.seatsForMonitorGrab.length} 座可约`
        case monitorStatuses.checkSuccessfulNo:
          return '暂无空位'
        case monitorStatuses.grabingSeat:
          return '正在预约'
        case monitorStatuses.grabFailed:
          return '预约失败'
        case monitorStatuses.grabSuccessful:
          return '预约成功'
        case monitorStatuses.fatalError:
          return '暂停监控'
        default:
          return '出现 bug'
      }
    },
    monitorCancelBtntext () {
      switch (this.monitorStatus) {
        case monitorStatuses.unstart:
          return '退出'
        case monitorStatuses.starting:
        case monitorStatuses.checking:
        case monitorStatuses.checkFailed:
        case monitorStatuses.checkSuccessfulYes:
        case monitorStatuses.checkSuccessfulNo:
        case monitorStatuses.grabingSeat:
        case monitorStatuses.grabFailed:
        case monitorStatuses.grabSuccessful:
        case monitorStatuses.fatalError:
          return '停止'
        default:
          return '出现 bug'
      }
    },
    isMonitorWorking () {
      switch (this.monitorStatus) {
        case monitorStatuses.unstart:
          return false
        case monitorStatuses.starting:
        case monitorStatuses.checking:
        case monitorStatuses.checkFailed:
        case monitorStatuses.checkSuccessfulYes:
        case monitorStatuses.checkSuccessfulNo:
        case monitorStatuses.grabingSeat:
        case monitorStatuses.grabFailed:
        case monitorStatuses.grabSuccessful:
        case monitorStatuses.fatalError:
          return true
        default:
          return true
      }
    },
    checkingAvailable () {
      switch (this.monitorStatus) {
        case monitorStatuses.unstart:
        case monitorStatuses.checkSuccessfulYes:
        case monitorStatuses.grabingSeat:
        case monitorStatuses.grabSuccessful:
        case monitorStatuses.fatalError:
          return false
        case monitorStatuses.starting:
        case monitorStatuses.checking:
        case monitorStatuses.checkFailed:
        case monitorStatuses.checkSuccessfulNo:
        case monitorStatuses.grabFailed:
        default:
          return true
      }
    },
    seatsForMonitorGrab () {
      return this.seatsForSelect.filter(seat => {
        return this.seatsForSelectIsAvailable.includes(seat.id)
      })
    }
  },
  methods: {
    async startMonitor (interval, last) {
      this.resetMonitor()
      this.stopMonitorFlag = false
      this.updateMonitorStatus(monitorStatuses.starting)
      if (await this.validateBeforeStart()) {
        this.$message({
          type: 'success',
          duration: '800',
          message: '监控器已启动'
        })
        this.monitorIntervalTimer = setInterval(this.monitorIntervalTimerCB, interval)
        this.monitorLastTimer = setTimeout(this.lastTimeArrivedCB, last * 60000)
      } else {
        this.stopMonitor()
      }
    },
    stopMonitor () {
      this.stopMonitorFlag = true
      this.resetMonitor()
    },
    resetMonitor () {
      this.updateMonitorStatus(monitorStatuses.unstart)
      if (this.monitorIntervalTimer) {
        clearInterval(this.monitorIntervalTimer)
        this.monitorIntervalTimer = null
      }
      if (this.monitorLastTimer) {
        clearTimeout(this.monitorLastTimer)
        this.monitorLastTimer = null
      }
    },
    async validateBeforeStart () {
      try {
        var { data } = await libraryRestApi.History(1, 50, this.userToken)
        if (data.status === 'success') {
          var reservations = data.data.reservations
          for (var i = 0; i < reservations.length; i++) {
            // 已有座位
            if (reservations[i].stat === 'RESERVE' ||
              reservations[i].stat === 'CHECK_IN' ||
              reservations[i].stat === 'AWAY') {
              this.$message({
                type: 'error',
                duration: 0,
                showClose: true,
                message: '启动失败：当前有已预约或未释放的座位，请在预约历史界面查看'
              })
              return false
            }
          }
          return true
        } else {
          this.$message({
            type: 'error',
            duration: 0,
            showClose: true,
            message: '启动失败：检查预约历史信息失败，请尝试重新启动监视器'
          })
          return false
        }
      } catch (e) {
        this.$message({
          type: 'error',
          duration: 0,
          showClose: true,
          message: '启动失败：检查预约历史信息出现错误，请尝试重新启动监视器' + e.message
        })
        return false
      }
    },
    monitorIntervalTimerCB () {
      if (this.stopMonitorFlag) {
        return
      }
      if (this.checkingAvailable) {
        this.updateMonitorStatus(monitorStatuses.checking)
        this.updateSeatsStatus(this.monitorSuccessCB, this.monitorFailCB)
      }
    },
    lastTimeArrivedCB () {
      if (this.stopMonitorFlag) {
        return
      }
      this.$message({
        type: 'info',
        duration: '0',
        showClose: true,
        message: '到达监控时长，未检测到可用座位，已停止监控器'
      })
      this.windowsNotification('已停止监控器', '到达监控时长，未检测到可用座位')
      this.stopMonitor()
    },
    monitorSuccessCB (seatIds) {
      // seatIds 和 this.seatsForSelectIsAvailable 相同
      // this.seatsForMonitorGrab 是 this.seatsForSelectIsAvailable 的计算属性
      if (this.stopMonitorFlag) {
        return
      }
      if (this.seatsForMonitorGrab.length > 0) {
        this.updateMonitorStatus(monitorStatuses.checkSuccessfulYes)
        this.monitorGrabSeat(this.seatsForMonitorGrab[0].id)
      } else {
        this.updateMonitorStatus(monitorStatuses.checkSuccessfulNo)
      }
    },
    monitorFailCB (e) {
      if (this.stopMonitorFlag) {
        return
      }
      this.updateMonitorStatus(monitorStatuses.checkFailed)
      this.showMonitorError(e.message)
    },
    showMonitorError (message) {
      if (this.stopMonitorFlag) {
        return
      }
      // 间隔五秒的错误才显示
      var currentTime = (new Date()).getTime()
      if (currentTime - this.lastErrorTime > 5000) {
        this.lastErrorTime = currentTime
        this.showError(message)
      }
    },
    filterMonitorSeatsByWindowAndCharge (availableSeatIds) {
      // 检查是否有电源和是否靠窗(this.seatsForSelect 已经过电源和靠窗筛选)
      return this.seatsForSelect.filter(seat => {
        return availableSeatIds.includes(seat.id)
      })
    },
    monitorGrabSeat (seatId) {
      if (this.stopMonitorFlag) {
        return
      }
      libraryRestApi.Book(1, 2, this.form.beginTime, this.form.endTime, seatId, this.form.date, this.userAccount, this.userPasswd, this.updateToken).then((response) => {
        if (response.data.status === 'success') {
          this.updateMonitorStatus(monitorStatuses.grabSuccessful)
          this.stopMonitor()
          this.$notify({
            title: '预约成功',
            type: 'success',
            dangerouslyUseHTMLString: true,
            message: '<el-card shadow="never" style="line-height: 30px;">ID：' + response.data.data.id +
              '<br/>凭证：' + response.data.data.receipt +
              '<br/>日期：' + response.data.data.onDate +
              '<br/>时间：' + response.data.data.begin + ' - ' + response.data.data.end +
              '<br/>位置：' + response.data.data.location + '</el-card>',
            duration: 0
          })
          this.windowsNotification(`预约成功 ${response.data.data.onDate} - ${response.data.data.begin} - ${response.data.data.end}`, `位置：${response.data.data.location}`)
          usageApi.grabState(this.userAccount, true, 20)
        } else {
          if (response.data.code === 12 || response.data.code === '12') {
            // 登录失败: 用户名或密码不正确
            this.$message({
              type: 'error',
              duration: 0,
              showClose: true,
              message: response.data.message ? response.data.message : emptyMessage
            })
            this.updateMonitorStatus(monitorStatuses.fatalError)
            this.stopMonitor()
            this.windowsNotification('监控被迫暂停', response.data.message ? response.data.message : emptyMessage)
            usageApi.grabState(this.userAccount, false, 21, response.data.message)
          } else {
            // 其他
            this.updateMonitorStatus(monitorStatuses.grabFailed)
            this.showMonitorError(response.data.message ? response.data.message : emptyMessage)
          }
        }
      }).catch((error) => {
        this.updateMonitorStatus(monitorStatuses.grabFailed)
        this.showMonitorError(`预约出现异常：${error.message}`)
      })
    },
    updateMonitorStatus (status) {
      if (this.stopMonitorFlag) {
        this.monitorStatus = monitorStatuses.unstart
      } else {
        this.monitorStatus = status
      }
    },
    monitorFormBtnClicked (event) {
      if (event.btn === 'ok') {
        this.startMonitor(event.data.interval, event.data.last)
      } else if (event.btn === 'cancel') {
        if (this.isMonitorWorking) {
          this.$message({
            type: 'info',
            duration: '1200',
            message: '已停止监控器'
          })
          this.stopMonitor()
        } else {
          this.monitorActive = false
        }
      } else {
        this.showMonitorError('组件通信有误')
      }
    }
  }
}

export default monitor
