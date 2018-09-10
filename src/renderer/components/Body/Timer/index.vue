<template>
  <div class="dialog" :style="{opacity: this.transparent}">
    <div class="warp-content">
      <el-form
        status-icon
        label-width="40px"
        class="flex-row">
        <span class="form-item title">
          <svg @mousedown="transparent=0.001" @mouseup="transparent=1" @mouseout="transparent=1" class="hide-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1971" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M273.066667 273.066667h136.533333v68.266666H273.066667zM273.066667 477.866667h136.533333v68.266666H273.066667z" p-id="1972"></path><path d="M68.266667 68.266667v887.466666h887.466666V68.266667H68.266667z m819.2 819.2H136.533333V136.533333h750.933334v750.933334z" p-id="1973"></path><path d="M273.066667 682.666667h136.533333v68.266666H273.066667z" p-id="1974"></path></svg>
          定时器
        </span>
        <el-form-item label="日期" class="form-item">
          <el-select :disabled="useCurrentTime||!timerInfo.complete" class="input" v-model="datePicked" placeholder="请选择日期">
            <el-option key="0" :value="0" label="今天"><span>今天&nbsp;&nbsp;{{freeDates[0]}}</span></el-option>
            <el-option key="1" :value="1" label="明天"><span>明天&nbsp;&nbsp;{{freeDates[1]}}</span></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间" class="form-item">
          <time-picker :disabled="useCurrentTime||!timerInfo.complete" class="input" v-model="timePicked"></time-picker>
        </el-form-item>
        <el-form-item label="使用当前时间" label-width="100px" class="form-item" style="margin-top: 15px;text-align: center;">
          <el-switch
            :disabled="!timerInfo.complete"
            v-model="useCurrentTime"
            @change="useCurrentTimeClicked()"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <div class="form-item" style="text-align: center;">
          <el-button
            :disabled="!timerInfo.complete"
            type="primary"
            :class="timerInfo.complete?'save-button':'button-disabled'"
            :icon="timerInfo.status === 'working'?'el-icon-loading':null"
            :style="timerInfo.status === 'working'?'width: 100px;':'width: 80px;'"
            @click="okBtnClicked()">
            {{timerInfo.message}}
          </el-button>
          <el-button
            type="primary"
            class="cancel-button"
            @click="cancelBtnClicked()">
            {{timerInfo.complete?'退出':'取消'}}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import timePicker from '@/components/Utils/timePicker'
import { mapGetters } from 'vuex'

export default {
  name: 'confirm-reserve-time',
  props: {
    value: {
      type: Date,
      require: true
    },
    grabSeat: {
      type: Function,
      require: true
    }
  },
  components: {
    timePicker
  },
  data () {
    return {
      datePicked: 0,
      timePicked: new Date(),
      useCurrentTime: false,
      transparent: 1
    }
  },
  computed: {
    ...mapGetters([
      'freeDates',
      'oppointmentTime',
      'timerInfo'
    ]),
    result () {
      if (this.useCurrentTime) {
        this.datePicked = 0
        return new Date()
      }
      if (this.datePicked === 0) {
        let temp = this.timePicked
        return this.getTodayTime(
          temp.getHours(),
          temp.getMinutes(),
          temp.getSeconds())
      } else {
        let temp = this.timePicked
        return this.getTomorrowTime(
          temp.getHours(),
          temp.getMinutes(),
          temp.getSeconds())
      }
    }
  },
  mounted () {
    this.datePicked = 0
    if (this.oppointmentTime) {
      this.timePicked.setHours(this.oppointmentTime.getHours())
      this.timePicked.setMinutes(this.oppointmentTime.getMinutes())
      this.timePicked.setSeconds(this.oppointmentTime.getSeconds())
      this.timePicked = new Date(this.timePicked)
    }
  },
  methods: {
    okBtnClicked () {
      if (this.useCurrentTime) {
        this.$emit('input', new Date())
      }
      this.$emit('input', this.result)
      this.$emit('btnClick', 'ok')
      this.$store.dispatch('setTimer', {
        bookFunc: this.grabSeat,
        time: this.result
      })
      this.$message({
        type: 'success',
        duration: 1500,
        showClose: true,
        message: '定时开始'
      })
    },
    cancelBtnClicked () {
      if (this.timerInfo.complete) {
        this.$emit('btnClick', 'exit')
      } else {
        this.$store.dispatch('updateTimer', 'unset')
        this.$message({
          type: 'info',
          duration: 1000,
          showClose: true,
          message: '已取消定时器'
        })
        this.$emit('btnClick', 'cancel')
      }
    },
    useCurrentTimeClicked () {
      if (this.useCurrentTime) {
        this.datePicked = 0
        this.timePicked = new Date()
      } else {
        this.datePicked = 0
        this.timePicked = new Date(this.oppointmentTime)
      }
    },
    getTodayTime (hours, minutes, seconds) {
      var today = new Date()
      today.setHours(hours)
      today.setMinutes(minutes)
      today.setSeconds(seconds)
      return today
    },
    getTomorrowTime (hours, minutes, seconds) {
      var tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(hours)
      tomorrow.setMinutes(minutes)
      tomorrow.setSeconds(seconds)
      return tomorrow
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
$warp-width: 280px;
$warp-height: 300px;
$warp-padding: 0px;
.dialog {
  z-index: 15;
  padding: $warp-padding;
  background: $bg-color-2;
  border-radius: 6px;
  position: fixed;
  width: $warp-width;
  height: $warp-height;
  top: $layout-header-h + ($layout-height - $layout-header-h - $layout-footer-h - $warp-height) / 2;
  left: ($layout-width - $warp-width)/2 - $warp-padding;
	box-shadow: 0 0px 14px black;
  .warp-content {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    text-align: center;
    .title {
      display: block;
      color: $text-color;
      font-size: $text-size-large + 4;
      padding: 0 0 0 41px;
    }
    .hide-icon {
      width: 22px;
      height: 22px;
      fill: $text-color-lowlight;
      float: right;
      margin: 0 8px;
      cursor: pointer;
      opacity: $button-blur-opacity;
      &:hover {
        opacity: $button-click-opacity;
      }
    }
    .form-item {
      margin: 10px 17px;
      border: none!important;
      .input {
        width: 200px;
        margin: 0 5px;
      }
      .save-button {
        margin: 10px 8px;
        width: 80px;
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
      .cancel-button {
        margin: 10px 8px;
        width: 80px;
        color: $text-color;
        background: $cancel-button-background-blur!important;
        border-color: $cancel-button-border!important;
        &:hover {
          background: $cancel-button-background-hover!important;
        }
        &:active {
          background: $cancel-button-background-click!important;
        }
      }
      .button-disabled {
        margin: 10px 8px;
        width: 80px;
        color: $text-color;
        background: $disabled-button-background-blur!important;
        border-color: $disabled-button-border!important;
      }
    }
  }
}
span {
  cursor: default!important;
}
</style>
