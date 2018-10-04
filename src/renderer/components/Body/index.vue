<template>
	<div class="body">
    <el-form v-show="showMode==='normal'" :model="form" ref="seatForm" label-width="50px" class="flex-row form">
      <div style="margin:auto;text-align:center;">
        <el-form-item label="日期">
          <el-select v-model="form.date" placeholder="请选择日期" class="input">
            <el-option key="0" label="今天" :value="freeDates[0]"><span>今天&nbsp;&nbsp;{{freeDates[0]}}</span></el-option>
            <el-option key="1" label="明天" :value="freeDates[1]"><span>明天&nbsp;&nbsp;{{freeDates[1]}}</span></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-select v-model="form.beginTime" placeholder="开始时间" class="time-input">
            <el-option v-for="time in freeBeginTime" :key="time.time" :label="time.label" :value="time.time"></el-option>
          </el-select>
          <el-select v-model="form.endTime" placeholder="结束时间" class="time-input">
            <el-option v-for="time in freeEndTime" :key="time.time" :label="time.label" :value="time.time"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="场馆">
          <el-select v-model="form.library" placeholder="请选择场馆" class="input" @change="libraryChanged()">
            <el-option v-for="library in libraryInfo.buildings" :key="library[0]" :label="library[1]" :value="library[0]"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间">
          <el-select v-model="form.room" placeholder="请选择房间" class="input" @change="roomChanged()">
            <el-option v-for="room in singleLibRooms" :key="room[0]" :label="room[1]" :value="room[0]">
              <span class="room-option-name">{{ room[1] }}</span>
              <span class="room-option-floor">{{ room[3] }} F</span>
              <span v-if="getRoomDetail(room[0])" :class=" getRoomDetail(room[0]).free > 0 ? 'room-option-free-green' : 'room-option-free'">{{ getRoomDetail(room[0]).free }}&nbsp;座可用</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="位置" :inline="true" style="flex-col">
          <el-select v-model="form.seatNum" placeholder="座位号" class="num">
            <el-option v-for="n in seatsForSelect.length" :key="n-1" :label="seatsForSelect[n-1].name" :value="seatsForSelect[n-1].id">
              <span class="seat-option-left">{{ seatsForSelect[n-1].name }}</span>
              <span class="seat-option-right">
                <svg class="seat-flag" :class="{'seat-flag-power':seatsForSelect[n-1].power}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 313.585 313.585" style="enable-background:new 0 0 313.585 313.585;" xml:space="preserve"><g><path d="M260.287,69.487c3.541,0,6.427,2.879,6.427,6.427v26.511v12.854h12.854h14.737c3.541,0,6.427,2.879,6.427,6.427v70.168 c0,3.541-2.886,6.427-6.427,6.427h-14.737h-12.854v12.854v26.511c0,3.541-2.886,6.427-6.427,6.427H19.281 c-3.554,0-6.427-2.886-6.427-6.427V75.914c0-3.548,2.873-6.427,6.427-6.427H260.287 M260.287,56.633H19.281 C8.631,56.633,0,65.271,0,75.914v161.757c0,10.636,8.631,19.281,19.281,19.281h241.006c10.636,0,19.281-8.644,19.281-19.281V211.16 h14.737c10.636,0,19.28-8.644,19.28-19.281v-70.175c0-10.643-8.644-19.281-19.28-19.281h-14.737V75.914 C279.567,65.271,270.93,56.633,260.287,56.633L260.287,56.633z M44.454,99.475H78.69v114.616H44.454 C44.454,214.091,44.454,99.475,44.454,99.475z M96.422,99.475h34.236v114.616H96.422V99.475z M148.376,99.475h34.236v114.629 h-34.236V99.475z"/></g></svg>
                <svg class="seat-flag" :class="{'seat-flag-window':seatsForSelect[n-1].window}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.34 511.34" style="enable-background:new 0 0 511.34 511.34;" xml:space="preserve"><g><path d="M497.78,326.334l-51.395-70.808l51.395-70.804c1.711-2.475,2.088-5.232,1.14-8.276c-0.767-2.859-2.669-4.762-5.712-5.712 l-83.363-27.408V55.959c0-3.044-1.242-5.519-3.721-7.421c-2.85-1.902-5.615-2.284-8.274-1.143l-83.367,26.836L263.092,3.427 C261.378,1.143,258.905,0,255.667,0c-3.234,0-5.708,1.146-7.422,3.427l-51.394,70.805l-83.368-26.836 c-2.662-1.142-5.424-0.76-8.28,1.143c-2.474,1.903-3.711,4.377-3.711,7.421v87.366l-83.367,27.408 c-3.044,0.953-4.947,2.856-5.708,5.712c-0.95,3.044-0.571,5.802,1.143,8.276l51.391,70.804L13.56,326.334 c-1.714,2.282-2.093,5.041-1.143,8.278c0.76,2.847,2.664,4.753,5.708,5.712l83.367,27.407v87.364c0,3.043,1.237,5.521,3.711,7.423 c2.856,1.903,5.618,2.283,8.28,1.144l83.368-26.837l51.394,70.805c1.902,2.471,4.377,3.71,7.422,3.71s5.522-1.239,7.424-3.71 l51.391-70.805l83.371,26.837c2.659,1.143,5.421,0.76,8.271-1.144c2.479-1.902,3.721-4.38,3.721-7.423v-87.364l83.363-27.407 c3.043-0.955,4.945-2.861,5.712-5.712C499.875,331.375,499.491,328.616,497.78,326.334z M407.134,319.339 c-8.661,20.27-20.365,37.78-35.114,52.534c-14.753,14.749-32.261,26.456-52.534,35.118c-20.266,8.657-41.541,12.99-63.811,12.99 c-22.27,0-43.537-4.333-63.81-12.99c-20.27-8.665-37.782-20.369-52.532-35.118c-14.75-14.754-26.455-32.265-35.117-52.534 c-8.66-20.272-12.99-41.541-12.99-63.813c0-22.27,4.331-43.537,12.99-63.81c8.658-20.27,20.367-37.781,35.117-52.534 c14.753-14.749,32.262-26.457,52.532-35.115c20.27-8.663,41.54-12.99,63.81-12.99c22.266,0,43.545,4.327,63.811,12.99 c20.273,8.658,37.781,20.366,52.534,35.115c14.749,14.753,26.453,32.264,35.114,52.534c8.658,20.273,12.991,41.543,12.991,63.81 C420.125,277.798,415.789,299.066,407.134,319.339z"/></g></svg>
              </span>
            </el-option>
          </el-select>
          <el-button class="toggle-button" @click="sunButtonClicked()">
            <svg class="icon" :class="form.sun?'sun-checked':'sun-unchecked'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.34 511.34" style="enable-background:new 0 0 511.34 511.34;" xml:space="preserve"><g><path d="M497.78,326.334l-51.395-70.808l51.395-70.804c1.711-2.475,2.088-5.232,1.14-8.276c-0.767-2.859-2.669-4.762-5.712-5.712 l-83.363-27.408V55.959c0-3.044-1.242-5.519-3.721-7.421c-2.85-1.902-5.615-2.284-8.274-1.143l-83.367,26.836L263.092,3.427 C261.378,1.143,258.905,0,255.667,0c-3.234,0-5.708,1.146-7.422,3.427l-51.394,70.805l-83.368-26.836 c-2.662-1.142-5.424-0.76-8.28,1.143c-2.474,1.903-3.711,4.377-3.711,7.421v87.366l-83.367,27.408 c-3.044,0.953-4.947,2.856-5.708,5.712c-0.95,3.044-0.571,5.802,1.143,8.276l51.391,70.804L13.56,326.334 c-1.714,2.282-2.093,5.041-1.143,8.278c0.76,2.847,2.664,4.753,5.708,5.712l83.367,27.407v87.364c0,3.043,1.237,5.521,3.711,7.423 c2.856,1.903,5.618,2.283,8.28,1.144l83.368-26.837l51.394,70.805c1.902,2.471,4.377,3.71,7.422,3.71s5.522-1.239,7.424-3.71 l51.391-70.805l83.371,26.837c2.659,1.143,5.421,0.76,8.271-1.144c2.479-1.902,3.721-4.38,3.721-7.423v-87.364l83.363-27.407 c3.043-0.955,4.945-2.861,5.712-5.712C499.875,331.375,499.491,328.616,497.78,326.334z M407.134,319.339 c-8.661,20.27-20.365,37.78-35.114,52.534c-14.753,14.749-32.261,26.456-52.534,35.118c-20.266,8.657-41.541,12.99-63.811,12.99 c-22.27,0-43.537-4.333-63.81-12.99c-20.27-8.665-37.782-20.369-52.532-35.118c-14.75-14.754-26.455-32.265-35.117-52.534 c-8.66-20.272-12.99-41.541-12.99-63.813c0-22.27,4.331-43.537,12.99-63.81c8.658-20.27,20.367-37.781,35.117-52.534 c14.753-14.749,32.262-26.457,52.532-35.115c20.27-8.663,41.54-12.99,63.81-12.99c22.266,0,43.545,4.327,63.811,12.99 c20.273,8.658,37.781,20.366,52.534,35.115c14.749,14.753,26.453,32.264,35.114,52.534c8.658,20.273,12.991,41.543,12.991,63.81 C420.125,277.798,415.789,299.066,407.134,319.339z"/></g></svg>
          </el-button>
          <el-button class="toggle-button" @click="chargerButtonClicked()">
            <svg class="icon" :class="form.battery?'charger-checked':'charger-unchecked'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 313.585 313.585" style="enable-background:new 0 0 313.585 313.585;" xml:space="preserve"><g><path d="M260.287,69.487c3.541,0,6.427,2.879,6.427,6.427v26.511v12.854h12.854h14.737c3.541,0,6.427,2.879,6.427,6.427v70.168 c0,3.541-2.886,6.427-6.427,6.427h-14.737h-12.854v12.854v26.511c0,3.541-2.886,6.427-6.427,6.427H19.281 c-3.554,0-6.427-2.886-6.427-6.427V75.914c0-3.548,2.873-6.427,6.427-6.427H260.287 M260.287,56.633H19.281 C8.631,56.633,0,65.271,0,75.914v161.757c0,10.636,8.631,19.281,19.281,19.281h241.006c10.636,0,19.281-8.644,19.281-19.281V211.16 h14.737c10.636,0,19.28-8.644,19.28-19.281v-70.175c0-10.643-8.644-19.281-19.28-19.281h-14.737V75.914 C279.567,65.271,270.93,56.633,260.287,56.633L260.287,56.633z M44.454,99.475H78.69v114.616H44.454 C44.454,214.091,44.454,99.475,44.454,99.475z M96.422,99.475h34.236v114.616H96.422V99.475z M148.376,99.475h34.236v114.629 h-34.236V99.475z"/></g></svg>
          </el-button>
        </el-form-item>
        <el-button type="primary" class="main-button" @click="mainButtonClicked()">定时抢座</el-button>
      </div>
    </el-form>
    <user-form v-if="hasToken&&showMode==='userForm'"></user-form>
    <history-form v-if="hasToken&&showMode==='historyForm'"></history-form>
    <timer-form v-if="hasToken&&checkReserveTime" v-model="reserveTime" :book-func="grabSeat" :login-func="login" :loginAndBookFunc="loginAndReserveSeat" @btnClick="oppointmentTimechecked($event)"></timer-form>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import userForm from './User'
import historyForm from './History'
import timerForm from './Timer'
import libraryRestApi from '@/api/library.api'
import usageApi from '@/api/usage.api'
import { ipcRenderer } from 'electron'

const emptyMessage = '数据加载失败'
const maxGrabCount = 45
const arbitraryGrabCount = 4

export default {
  props: {
    showMode: {
      type: String,
      require: true
    }
  },
  components: {
    userForm, historyForm, timerForm
  },
  data () {
    return {
      form: {
        date: null,
        library: null,
        room: null,
        beginTime: null,
        endTime: null,
        seatNum: null,
        battery: false,
        sun: false
      },
      roomsDetial: [],
      singleLibRooms: [],
      seats: [],
      seatsForSelect: [],
      seatsSearched: null,
      reserveTime: null,
      checkReserveTime: false,
      grabCount: 0,
      triedSeatIds: [],
      stopGrab: false
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userPasswd',
      'freeDates',
      'freeDatesDefault',
      'freeBeginTime',
      'freeEndTime',
      'libraryInfo',
      'timerInfo',
      'seatInfo',
      'oppointmentTime',
      'hasToken',
      'userToken'
    ]),
    restTime () {
      if (this.timerInfo.totalTime && this.timerInfo.waitedTime) {
        return this.timerInfo.totalTime - this.timerInfo.waitedTime
      } else {
        return -1
      }
    },
    timerSeted () {
      return this.totalTime >= 0
    },
    isVip () {
      return this.userAccount === 2015302590039 || this.userAccount === 2017302590175
    }
  },
  mounted () {
    this.form = {...this.seatInfo}
    this.form.date = this.freeDates.length > 0 ? this.freeDates[0] : null
    this.form.date = this.freeDatesDefault
    if (this.seatInfo.library !== null) {
      this.form.library = this.seatInfo.library
      this.libraryChanged()
      if (this.seatInfo.room !== null) {
        this.form.room = this.seatInfo.room
        this.roomChanged()
      }
    }
  },
  methods: {
    saveSeatInfo (seatInfo) {
      this.$store.dispatch('saveSeatInfo', seatInfo)
    },
    libraryChanged () {
      if (this.form.library === null) { return }
      this.singleLibRooms = this.libraryInfo.rooms.filter((item) => {
        return item[2] === this.form.library
      })
      this.singleLibRooms.sort((x, y) => {
        return parseInt(x[3]) - parseInt(y[3])
      })
      libraryRestApi.RoomStats(this.form.library, this.userToken).then((reponse) => {
        if (reponse.data.status === 'success') {
          this.roomsDetial = reponse.data.data
        }
      }).catch(() => {})
      this.form.room = null
      this.form.seatNum = null
    },
    roomChanged () {
      if (this.form.room === null || this.form.date === null) { return }
      libraryRestApi.LayoutByDate(this.form.room, this.form.date, this.userToken).then((response) => {
        if (response.data.status === 'success') {
          this.seats = []
          for (var key in response.data.data.layout) {
            this.seats.push(response.data.data.layout[key])
          }
          this.filterSeats()
        } else {
          this.$message({
            type: 'error',
            duration: '2000',
            showClose: true,
            message: response.data.message ? response.data.message : emptyMessage
          })
          this.filterSeats()
        }
      }).catch(() => {})
    },
    chargerButtonClicked () {
      this.form.battery = !this.form.battery
      this.filterSeats()
    },
    sunButtonClicked () {
      this.form.sun = !this.form.sun
      this.filterSeats()
    },
    filterSeats () {
      this.seatsForSelect = this.seats.filter((item) => {
        return item.type !== 'empty' && (this.form.battery ? item.power : true) && (this.form.sun ? item.window : true)
      })
      this.seatsForSelect.sort((x, y) => {
        return parseInt(x.name) - parseInt(y.name)
      })
      if (this.form.library && this.form.library === this.seatInfo.library && this.form.room && this.form.room === this.seatInfo.room) {
        this.form.seatNum = this.seatInfo.seatNum
      } else {
        this.form.seatNum = null
      }
    },
    showWarning (message) {
      this.$message({
        type: 'warning',
        duration: '2000',
        message
      })
    },
    getRoomDetail (roomId) {
      for (let i = 0; i < this.roomsDetial.length; i++) {
        if (this.roomsDetial[i].roomId === roomId) {
          return this.roomsDetial[i]
        }
      }
      return null
    },
    oppointmentTimechecked (message) {
      if (message === 'exit') {
        this.checkReserveTime = false
      } else if (message === 'ok') {
      } else if (message === 'cancel') {
        this.stopGrab = true
      }
    },
    mainButtonClicked () {
      if (this.form.date === null) {
        this.showWarning('请选择日期')
        return
      }
      if (this.form.beginTime === null) {
        this.showWarning('请选择开始时间')
        return
      }
      if (this.form.endTime === null) {
        this.showWarning('请选择结束时间')
        return
      }
      if (this.form.beginTime >= this.form.endTime) {
        this.showWarning('结束时间必须大于开始时间')
        return
      }
      if (this.form.library === null) {
        this.showWarning('请选择场馆')
        return
      }
      if (this.form.room === null) {
        this.showWarning('请选择房间')
        return
      }
      if (this.form.seatNum === null) {
        this.showWarning('请选择位置')
        return
      }
      // 保存输入信息
      this.saveSeatInfo(this.form)
      // 打开定时器
      this.checkReserveTime = true
    },
    grabSeat () {
      this.triedSeatIds = []
      this.stopGrab = false
      this.grabCount = 0
      this.seatsSearched = null
      this.reserveSeat(this.form.beginTime, this.form.endTime, this.form.seatNum, this.form.date, this.userToken)
    },
    loginAndReserveSeat () {
      this.triedSeatIds = []
      this.stopGrab = false
      this.grabCount = 0
      this.seatsSearched = null
      libraryRestApi.Login(this.userAccount, this.userPasswd).then((response) => {
        if (response.data.status === 'success') {
          this.$store.dispatch('setToken', response.data.data.token)
          this.reserveSeat(this.form.beginTime, this.form.endTime, this.form.seatNum, this.form.date, response.data.data.token)
        } else {
          this.$message({
            type: 'error',
            duration: '0',
            showClose: true,
            message: response.data.message ? response.data.message : emptyMessage
          })
          usageApi.loginState(this.userInfo.account, false, 12, response.data.message)
        }
      }).catch((error) => {
        usageApi.loginState(this.userInfo.account, false, 13, error.message)
      })
    },
    login () {
      libraryRestApi.Login(this.userAccount, this.userPasswd).then((response) => {
        if (response.data.status === 'success') {
          this.$store.dispatch('setToken', response.data.data.token)
          this.$message({
            type: 'success',
            duration: '1000',
            message: '登录成功'
          })
        } else {
          usageApi.loginState(this.userInfo.account, false, 14, response.data.message)
        }
      }).catch((error) => {
        usageApi.loginState(this.userInfo.account, false, 15, error.message)
      })
    },
    reserveSeat (beginTime, endTime, seatNum, date, userToken, cancelCurrent = false) {
      if (cancelCurrent) {
      // 查询预约历史
        libraryRestApi.History(1, 20, this.userToken).then((response) => {
          if (response.data.status === 'success') {
            var reservations = response.data.data.reservations
            var reservation = reservations.filter((item) => {
              return item.stat === 'RESERVE' || item.stat === 'CHECK_IN' || item.stat === 'AWAY'
            })
            if (reservation && reservation.length > 0) {
              if (reservation[0].stat === 'RESERVE') {
                // 取消当前预约
                libraryRestApi.Cancel(reservation[0].id, this.userToken).then((response) => {
                  if (response.data.status === 'success') {
                    this.$message({
                      type: 'success',
                      duration: '1000',
                      message: '取消已有预约'
                    })
                  }
                  this.reserveSeat(beginTime, endTime, seatNum, date, userToken)
                }).catch(() => {
                  this.reserveSeat(beginTime, endTime, seatNum, date, userToken)
                })
              } else {
                // 终止当前使用
                libraryRestApi.Stop(this.userToken).then((response) => {
                  if (response.data.status === 'success') {
                    this.$message({
                      type: 'success',
                      duration: '1000',
                      message: response.data.message ? response.data.message : emptyMessage
                    })
                  }
                  this.reserveSeat(beginTime, endTime, seatNum, date, userToken)
                }).catch(() => {
                  this.reserveSeat(beginTime, endTime, seatNum, date, userToken)
                })
              }
            } else {
              this.reserveSeat(beginTime, endTime, seatNum, date, userToken)
            }
          } else {
            this.reserveSeat(beginTime, endTime, seatNum, date, userToken)
          }
        }).catch(() => {
          this.reserveSeat(beginTime, endTime, seatNum, date, userToken)
        })
        return
      }
      if (!this.triedSeatIds.includes(seatNum)) { this.triedSeatIds.push(seatNum) }
      libraryRestApi.Book(1, 2, beginTime, endTime, seatNum, date, userToken).then((response) => {
        if (response.data.status === 'success') {
          this.$store.dispatch('updateTimer', 'success')
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
          this.windowsNotification('预约成功', '请打开软件查看')
          usageApi.grabState(this.userAccount, true, 6)
        } else {
          if (response.data.code === 1 || response.data.code === '1') {
            // 位置不可用，如果未达抢座上限则继续抢
            this.grabCount += 1
            var cancelCurrentBool = response.data.message === '已有1个有效预约，请在使用结束后再次进行选择' && this.grabCount < 2
            var newSeatId = -1
            if (cancelCurrentBool) {
              newSeatId = seatNum
            } else {
              newSeatId = this.getNewSeatNum()
            }
            if (this.grabCount >= maxGrabCount) {
              this.$store.dispatch('updateTimer', 'fail')
              this.$message({
                type: 'error',
                duration: 0,
                showClose: true,
                message: `抢座失败：达到抢座尝试上限(${maxGrabCount})，结束抢座`
              })
              this.windowsNotification('抢座失败', `达到抢座尝试上限(${maxGrabCount})，结束抢座`)
              usageApi.grabState(this.userAccount, false, 7, '抢座失败', `达到抢座尝试上限(${maxGrabCount})，结束抢座`)
            } else if (newSeatId === -1) {
              this.$store.dispatch('updateTimer', 'fail')
              this.$message({
                type: 'error',
                duration: 0,
                showClose: true,
                message: '抢座失败：该房间在指定的时间段内没有空闲位置（请确保您要预约的时间无误）'
              })
              this.windowsNotification('抢座失败', '该房间在指定的时间段内没有空闲位置（请确保您要预约的时间无误）')
              usageApi.grabState(this.userAccount, false, 8, '抢座失败：该房间在指定的时间段内没有空闲位置（请确保您要预约的时间无误）')
            } else if (!this.stopGrab) {
              this.$store.dispatch('updateTimer', 'working')
              // 打印信息
              var seatInTheRoom = this.seatsSearched === null ? this.seats.filter((item) => {
                return item.type !== 'empty'
              }) : this.seatsSearched
              for (let index = 0; index < seatInTheRoom.length; index++) {
                if (seatInTheRoom[index].id === newSeatId) {
                  // console.log('第' + (this.grabCount + 1) + '次尝试抢座(座位号: ' + seatInTheRoom[index].name + ', Id: ' + newSeatId + ')')
                  this.$store.dispatch('updateTimer', '尝试 ' + seatInTheRoom[index].name)
                  break
                }
              }
              // 结束打印
              // 开始下一次抢座
              if (!this.isVip) {
                this.sleep(200)
              }
              if (this.grabCount === arbitraryGrabCount) {
                this.searchSeatsByTime(this.form.library, this.form.room, date, beginTime, endTime, userToken)
              }
              this.reserveSeat(beginTime, endTime, newSeatId, date, userToken, cancelCurrentBool)
            } else {
              // 外部终止抢座，即 this.stopGrab === true
            }
          } else if (response.data.code === 12 || response.data.code === '12') {
            // 登录失败: 用户名或密码不正确
            this.$store.dispatch('updateTimer', 'fail')
            this.$message({
              type: 'error',
              duration: 0,
              showClose: true,
              message: response.data.message ? response.data.message : emptyMessage
            })
            this.windowsNotification('抢座失败', response.data.message ? response.data.message : emptyMessage)
            usageApi.grabState(this.userAccount, false, 10, response.data.message)
          } else {
            // 其他
            this.$store.dispatch('updateTimer', 'fail')
            this.$message({
              type: 'error',
              duration: 0,
              showClose: true,
              message: response.data.message ? response.data.message : emptyMessage
            })
            this.windowsNotification('抢座失败', response.data.message ? response.data.message : emptyMessage)
            usageApi.grabState(this.userAccount, false, 11, response.data.message)
          }
        }
      }).catch(() => {})
    },
    // 获得预定房间内未尝试过的 座位 id 号，全部尝试完之后返回 -1
    getNewSeatNum () {
      var seed = this.form.seatNum
      var triedSeatIds = this.triedSeatIds
      // 判断种子点是否已经尝试过了, 如果没有则返回种子点
      if (!triedSeatIds.includes(seed)) { return seed }
      if (this.seatsSearched !== null && this.seatsSearched.length === 0) {
        return -1
      }
      var seatInTheRoom = this.seatsSearched === null ? this.seats.filter((item) => {
        return item.type !== 'empty'
      }) : this.seatsSearched
      seatInTheRoom.sort((x, y) => {
        return parseInt(x.name) - parseInt(y.name)
      })
      var seatInTheRoomBetter = seatInTheRoom.filter((item) => {
        return item.type !== 'empty' && (this.form.battery ? item.power : true) && (this.form.sun ? item.window : true)
      })
      seatInTheRoomBetter.sort((x, y) => {
        return parseInt(x.name) - parseInt(y.name)
      })
      var seatInTheRoomPoor = seatInTheRoom.filter((item) => {
        return !seatInTheRoomBetter.includes(item)
      })
      seatInTheRoomPoor.sort((x, y) => {
        return parseInt(x.name) - parseInt(y.name)
      })
      // 种子点在 seatInTheRoomBetter 中的索引号
      var seedIndex = -1
      for (let index = 0; index < seatInTheRoomBetter.length; index++) {
        if (seatInTheRoomBetter[index].id === seed) {
          seedIndex = index
          break
        }
      }
      // 在筛选过的座位中选择位置
      for (let distance = 1; distance < seatInTheRoomBetter.length; distance++) {
        if (seedIndex - distance >= 0 && !!seatInTheRoomBetter[seedIndex - distance].id && !triedSeatIds.includes(seatInTheRoomBetter[seedIndex - distance].id)) {
          return seatInTheRoomBetter[seedIndex - distance].id
        } else if (seedIndex + distance < seatInTheRoomBetter.length && !!seatInTheRoomBetter[seedIndex + distance].id && !triedSeatIds.includes(seatInTheRoomBetter[seedIndex + distance].id)) {
          return seatInTheRoomBetter[seedIndex + distance].id
        }
      }
      // 在该房间内其他座位中选择位置
      for (let index = 0; index < seatInTheRoomPoor.length; index++) {
        if (!!seatInTheRoomPoor[index].id && !triedSeatIds.includes(seatInTheRoomPoor[index].id)) {
          return seatInTheRoomPoor[index].id
        }
      }
      return -1
    },
    sleep (numberMillis) {
      var now = new Date()
      var exitTime = now.getTime() + numberMillis
      while (true) {
        now = new Date()
        if (now.getTime() > exitTime) { return }
      }
    },
    windowsNotification (title, message) {
      ipcRenderer.send('show-window-notify', title, message)
    },
    searchSeatsByTime (buildingId, roomId, date, startTime, endTime, token) {
      libraryRestApi.SearchSeat(buildingId, roomId, date, startTime, endTime, token).then((response) => {
        if (response.data.status === true) {
          this.seatsSearched = []
          for (var key in response.data.data.seats) {
            if (response.data.data.seats[key].status === 'FREE') {
              this.seatsSearched.push(response.data.data.seats[key])
            }
          }
        }
      }).catch(() => {
        this.seatsSearched = null
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.form {
  margin: ($layout-header-h - $layout-footer-h)/2 0 0px 0;
  .input {
    width: 250px!important;
    margin: 0 5px;
  }
  .time-input {
    width: 120px!important;
    margin: 0 5px;
  }
  .num {
    width: 120px;
    flex: 1;
    float: left;
    margin: 0 5px;
  }
  .toggle-button {
    margin: 0 5px 0 5px;
    padding: 0;
    float: right;
    color: $text-color;
    background: transparent!important;
    border-color: transparent!important;
    svg {
      fill: inherit;
    }
    .icon {
      float: right;
      margin: auto;
      flex: 0.8;
      cursor: pointer;
      width: 30px;
    }
    .charger-checked {
      fill: $button-green;
    }
    .charger-unchecked {
      fill: $text-color;
    }
    .sun-checked {
      width: 26px;
      margin: 2px 20px 2px 8px;
      fill: $button-yellow;
    }
    .sun-unchecked {
      width: 26px;
      margin: 2px 20px 2px 8px;
      fill: $text-color;
    }
  }
  .main-button {
    margin: 15px 0 0 0;
    width: 100px;
    color: $text-color;
    background: $primary-button-background-blur!important;
    border-color: $primary-color!important;
    &:hover {
      background: $primary-button-background-hover!important;
    }
    &:active {
      background: $primary-button-background-click!important;
    }
  }
  span {
    color: $text-color;
    bottom: 0;
  }
}
.room-option-name {
  color: $text-color;
}
.room-option-free {
  float: right;
  margin: 0 20px;
  color: $text-color-lowlight;
  font-size: $text-size-small + 1;
}
.room-option-free-green {
  float: right;
  margin: 0 20px;
  color: mix($button-green, #000, 70%);
  font-size: $text-size-small + 1;
}
.room-option-floor {
  float: right;
  color: mix($button-yellow, #000, 65%);
  font-size: $text-size-small;
}
.seat-option-left {
  float: $text-color;
}
.seat-option-right {
  float: right;
  .seat-flag {
    cursor: default;
    margin: 0 0 0 5px;
    fill: $text-color-lowlight;
    width: $text-size-small;
  }
  .seat-flag-power {
    fill: $button-green;
  }
  .seat-flag-window {
    fill: $button-yellow;
  }
}
</style>
