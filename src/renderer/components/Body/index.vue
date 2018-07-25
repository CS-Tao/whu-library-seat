<template>
	<div class="body">
    <el-form v-show="showMode==='normal'" :model="form" ref="seatForm" label-width="50px" class="flex-row form">
      <div style="margin:auto;text-align:center;">
        <el-form-item label="日期">
          <el-select v-model="form.date" placeholder="请选择日期" class="input">
            <el-option v-for="n in freeDates.length" :key="n-1" :label="freeDates[n-1]" :value="freeDates[n-1]"></el-option>
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
            <el-option v-for="library in freeLibrarys" :key="library[0]" :label="library[1]" :value="library[0]"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间">
          <el-select v-model="form.room" placeholder="请选择房间" class="input" @change="roomChanged()">
            <el-option v-for="room in singleLibRooms" :key="room[0]" :label="room[1]" :value="room[0]">
              <span class="room-option-left">{{ room[1] }}</span>
              <span class="room-option-right">{{ room[3] }} F</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="位置" :inline="true" style="flex-col">
          <el-select v-model="form.seatNum" placeholder="座位号" class="num">
            <el-option v-for="n in seatsForSelect.length" :key="n-1" :label="seatsForSelect[n-1].name" :value="seatsForSelect[n-1].id">
              <span class="seat-option-left">{{ seatsForSelect[n-1].name }}</span>
              <span class="seat-option-right">
                <svg class="seat-flag" :class="{'seat-flag-power':seatsForSelect[n-1].power}" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 313.585 313.585" style="enable-background:new 0 0 313.585 313.585;" xml:space="preserve"><g><path d="M260.287,69.487c3.541,0,6.427,2.879,6.427,6.427v26.511v12.854h12.854h14.737c3.541,0,6.427,2.879,6.427,6.427v70.168 c0,3.541-2.886,6.427-6.427,6.427h-14.737h-12.854v12.854v26.511c0,3.541-2.886,6.427-6.427,6.427H19.281 c-3.554,0-6.427-2.886-6.427-6.427V75.914c0-3.548,2.873-6.427,6.427-6.427H260.287 M260.287,56.633H19.281 C8.631,56.633,0,65.271,0,75.914v161.757c0,10.636,8.631,19.281,19.281,19.281h241.006c10.636,0,19.281-8.644,19.281-19.281V211.16 h14.737c10.636,0,19.28-8.644,19.28-19.281v-70.175c0-10.643-8.644-19.281-19.28-19.281h-14.737V75.914 C279.567,65.271,270.93,56.633,260.287,56.633L260.287,56.633z M44.454,99.475H78.69v114.616H44.454 C44.454,214.091,44.454,99.475,44.454,99.475z M96.422,99.475h34.236v114.616H96.422V99.475z M148.376,99.475h34.236v114.629 h-34.236V99.475z"/></g></svg>
                <svg class="seat-flag" :class="{'seat-flag-window':seatsForSelect[n-1].window}" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.34 511.34" style="enable-background:new 0 0 511.34 511.34;" xml:space="preserve"><g><path d="M497.78,326.334l-51.395-70.808l51.395-70.804c1.711-2.475,2.088-5.232,1.14-8.276c-0.767-2.859-2.669-4.762-5.712-5.712 l-83.363-27.408V55.959c0-3.044-1.242-5.519-3.721-7.421c-2.85-1.902-5.615-2.284-8.274-1.143l-83.367,26.836L263.092,3.427 C261.378,1.143,258.905,0,255.667,0c-3.234,0-5.708,1.146-7.422,3.427l-51.394,70.805l-83.368-26.836 c-2.662-1.142-5.424-0.76-8.28,1.143c-2.474,1.903-3.711,4.377-3.711,7.421v87.366l-83.367,27.408 c-3.044,0.953-4.947,2.856-5.708,5.712c-0.95,3.044-0.571,5.802,1.143,8.276l51.391,70.804L13.56,326.334 c-1.714,2.282-2.093,5.041-1.143,8.278c0.76,2.847,2.664,4.753,5.708,5.712l83.367,27.407v87.364c0,3.043,1.237,5.521,3.711,7.423 c2.856,1.903,5.618,2.283,8.28,1.144l83.368-26.837l51.394,70.805c1.902,2.471,4.377,3.71,7.422,3.71s5.522-1.239,7.424-3.71 l51.391-70.805l83.371,26.837c2.659,1.143,5.421,0.76,8.271-1.144c2.479-1.902,3.721-4.38,3.721-7.423v-87.364l83.363-27.407 c3.043-0.955,4.945-2.861,5.712-5.712C499.875,331.375,499.491,328.616,497.78,326.334z M407.134,319.339 c-8.661,20.27-20.365,37.78-35.114,52.534c-14.753,14.749-32.261,26.456-52.534,35.118c-20.266,8.657-41.541,12.99-63.811,12.99 c-22.27,0-43.537-4.333-63.81-12.99c-20.27-8.665-37.782-20.369-52.532-35.118c-14.75-14.754-26.455-32.265-35.117-52.534 c-8.66-20.272-12.99-41.541-12.99-63.813c0-22.27,4.331-43.537,12.99-63.81c8.658-20.27,20.367-37.781,35.117-52.534 c14.753-14.749,32.262-26.457,52.532-35.115c20.27-8.663,41.54-12.99,63.81-12.99c22.266,0,43.545,4.327,63.811,12.99 c20.273,8.658,37.781,20.366,52.534,35.115c14.749,14.753,26.453,32.264,35.114,52.534c8.658,20.273,12.991,41.543,12.991,63.81 C420.125,277.798,415.789,299.066,407.134,319.339z"/></g></svg>
              </span>
            </el-option>
          </el-select>
          <el-button class="toggle-button" @click="sunButtonClicked()">
            <svg class="icon" :class="form.sun?'sun-checked':'sun-unchecked'" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.34 511.34" style="enable-background:new 0 0 511.34 511.34;" xml:space="preserve"><g><path d="M497.78,326.334l-51.395-70.808l51.395-70.804c1.711-2.475,2.088-5.232,1.14-8.276c-0.767-2.859-2.669-4.762-5.712-5.712 l-83.363-27.408V55.959c0-3.044-1.242-5.519-3.721-7.421c-2.85-1.902-5.615-2.284-8.274-1.143l-83.367,26.836L263.092,3.427 C261.378,1.143,258.905,0,255.667,0c-3.234,0-5.708,1.146-7.422,3.427l-51.394,70.805l-83.368-26.836 c-2.662-1.142-5.424-0.76-8.28,1.143c-2.474,1.903-3.711,4.377-3.711,7.421v87.366l-83.367,27.408 c-3.044,0.953-4.947,2.856-5.708,5.712c-0.95,3.044-0.571,5.802,1.143,8.276l51.391,70.804L13.56,326.334 c-1.714,2.282-2.093,5.041-1.143,8.278c0.76,2.847,2.664,4.753,5.708,5.712l83.367,27.407v87.364c0,3.043,1.237,5.521,3.711,7.423 c2.856,1.903,5.618,2.283,8.28,1.144l83.368-26.837l51.394,70.805c1.902,2.471,4.377,3.71,7.422,3.71s5.522-1.239,7.424-3.71 l51.391-70.805l83.371,26.837c2.659,1.143,5.421,0.76,8.271-1.144c2.479-1.902,3.721-4.38,3.721-7.423v-87.364l83.363-27.407 c3.043-0.955,4.945-2.861,5.712-5.712C499.875,331.375,499.491,328.616,497.78,326.334z M407.134,319.339 c-8.661,20.27-20.365,37.78-35.114,52.534c-14.753,14.749-32.261,26.456-52.534,35.118c-20.266,8.657-41.541,12.99-63.811,12.99 c-22.27,0-43.537-4.333-63.81-12.99c-20.27-8.665-37.782-20.369-52.532-35.118c-14.75-14.754-26.455-32.265-35.117-52.534 c-8.66-20.272-12.99-41.541-12.99-63.813c0-22.27,4.331-43.537,12.99-63.81c8.658-20.27,20.367-37.781,35.117-52.534 c14.753-14.749,32.262-26.457,52.532-35.115c20.27-8.663,41.54-12.99,63.81-12.99c22.266,0,43.545,4.327,63.811,12.99 c20.273,8.658,37.781,20.366,52.534,35.115c14.749,14.753,26.453,32.264,35.114,52.534c8.658,20.273,12.991,41.543,12.991,63.81 C420.125,277.798,415.789,299.066,407.134,319.339z"/></g></svg>
          </el-button>
          <el-button class="toggle-button" @click="chargerButtonClicked()">
            <svg class="icon" :class="form.changer?'charger-checked':'charger-unchecked'" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 313.585 313.585" style="enable-background:new 0 0 313.585 313.585;" xml:space="preserve"><g><path d="M260.287,69.487c3.541,0,6.427,2.879,6.427,6.427v26.511v12.854h12.854h14.737c3.541,0,6.427,2.879,6.427,6.427v70.168 c0,3.541-2.886,6.427-6.427,6.427h-14.737h-12.854v12.854v26.511c0,3.541-2.886,6.427-6.427,6.427H19.281 c-3.554,0-6.427-2.886-6.427-6.427V75.914c0-3.548,2.873-6.427,6.427-6.427H260.287 M260.287,56.633H19.281 C8.631,56.633,0,65.271,0,75.914v161.757c0,10.636,8.631,19.281,19.281,19.281h241.006c10.636,0,19.281-8.644,19.281-19.281V211.16 h14.737c10.636,0,19.28-8.644,19.28-19.281v-70.175c0-10.643-8.644-19.281-19.28-19.281h-14.737V75.914 C279.567,65.271,270.93,56.633,260.287,56.633L260.287,56.633z M44.454,99.475H78.69v114.616H44.454 C44.454,214.091,44.454,99.475,44.454,99.475z M96.422,99.475h34.236v114.616H96.422V99.475z M148.376,99.475h34.236v114.629 h-34.236V99.475z"/></g></svg>
          </el-button>
        </el-form-item>
        <el-button type="primary" class="main-button" @click="mainButtonClicked()">定时抢座</el-button>
      </div>
    </el-form>
    <user-form v-if="hasToken&&showMode==='userForm'"></user-form>
    <history-form v-if="hasToken&&showMode==='historyForm'"></history-form>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import userForm from './User'
import historyForm from './History'
import libraryRestApi from '@/api/library.api'

export default {
  props: {
    showMode: {
      type: String,
      require: true
    }
  },
  components: {
    userForm, historyForm
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
        changer: false,
        sun: false
      },
      singleLibRooms: [],
      seats: [],
      seatsForSelect: []
    }
  },
  computed: {
    ...mapGetters([
      'freeLibrarys',
      'freeRooms',
      'freeDates',
      'freeBeginTime',
      'freeEndTime',
      'seatInfoLibrary',
      'seatInfoRoom',
      'seatInfoBeginTime',
      'seatInfoEndTime',
      'seatInfoSeatNum',
      'seatInfoBattery',
      'seatInfoSun',
      'hasToken',
      'userToken'
    ])
  },
  mounted () {
    this.form.date = this.freeDates.length > 1 ? this.freeDates[1] : (this.freeDates.length > 0 ? this.freeDates[0] : '')
    // this.form.library = this.seatInfoLibrary
    // this.libraryChanged()
    // this.form.room = this.seatInfoRoom
    // this.roomChanged()
    // this.form.seatNum = this.seatInfoSeatNum
    this.form.beginTime = this.seatInfoBeginTime
    this.form.endTime = this.seatInfoEndTime
    this.form.changer = this.seatInfoBattery
    this.form.sun = this.seatInfoSun
  },
  methods: {
    saveSeatInfo (settings) {
      this.$store.dispatch('saveSeatInfo', settings)
    },
    libraryChanged () {
      this.singleLibRooms = this.freeRooms.filter((item) => {
        return item[2] === this.form.library
      })
      this.form.room = null
      this.form.seatNum = null
    },
    roomChanged () {
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
            message: response.data.message
          })
        }
      }).catch(() => {})
    },
    chargerButtonClicked () {
      this.form.changer = !this.form.changer
      this.filterSeats()
    },
    sunButtonClicked () {
      this.form.sun = !this.form.sun
      this.filterSeats()
    },
    filterSeats () {
      this.seatsForSelect = this.seats.filter((item) => {
        return item.type !== 'empty' && (this.form.changer ? item.power : true) && (this.form.sun ? item.window : true)
      })
      this.seatsForSelect.sort((x, y) => {
        return parseInt(x.name) - parseInt(y.name)
      })
      this.form.seatNum = null
    },
    showWarning (message) {
      this.$message({
        type: 'warning',
        duration: '2000',
        message
      })
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
      this.saveSeatInfo(this.form)
      libraryRestApi.Book().then((response) => {
        if (response.data.status === 'success') {
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
        } else {
          this.$message({
            type: 'error',
            duration: '2000',
            showClose: true,
            message: response.data.message
          })
        }
      }).catch(() => {})
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
      // opacity: $button-blur-opacity;
      // &:hover {
      //   opacity: $button-hover-opacity;
      // }
      // &:active {
      //   fill: $text-color;
      //   // opacity: $button-click-opacity;
      // }
    }
    .charger-unchecked {
      fill: $text-color;
      // opacity: $button-blur-opacity;
      // &:hover {
      //   opacity: $button-hover-opacity;
      // }
      // &:active {
      //   fill: $button-green;
      //   // opacity: $button-click-opacity;
      // }
    }
    .sun-checked {
      width: 26px;
      margin: 2px 20px 2px 8px;
      fill: $button-yellow;
      // opacity: $button-blur-opacity;
      // &:hover {
      //   opacity: $button-hover-opacity;
      // }
      // &:active {
      //   fill: $text-color;
      //   // opacity: $button-click-opacity;
      // }
    }
    .sun-unchecked {
      width: 26px;
      margin: 2px 20px 2px 8px;
      fill: $text-color;
      // opacity: $button-blur-opacity;
      // &:hover {
      //   opacity: $button-hover-opacity;
      // }
      // &:active {
      //   fill: $button-yellow;
      //   // opacity: $button-click-opacity;
      // }
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
.room-option-left {
  float: $text-color;
}
.room-option-right {
  float: right;
  color: $text-color-lowlight;
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
