<template>
  <div class="dialog" :style="{opacity: this.transparent}">
    <div class="warp-content">
      <el-form
        status-icon
        label-width="40px"
        class="flex-row">
        <span class="form-item title">
          <svg @mousedown="transparent=0.001" @mouseup="transparent=1" @mouseout="transparent=1" class="hide-btn hide-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.009 512.009" style="enable-background:new 0 0 512.009 512.009;" xml:space="preserve">
            <g transform="translate(-1)">
              <path d="M111.942,311.468c-42.415,0-76.8,34.385-76.8,76.8s34.385,76.8,76.8,76.8s76.8-34.385,76.8-76.8 C188.694,345.872,154.338,311.515,111.942,311.468z M111.942,448.001c-32.99,0-59.733-26.744-59.733-59.733 s26.744-59.733,59.733-59.733s59.733,26.744,59.733,59.733C171.637,421.241,144.916,447.962,111.942,448.001z"/>
              <path d="M402.075,311.468c-31.063,0-59.067,18.712-70.954,47.41c-11.887,28.698-5.316,61.731,16.648,83.696 c21.965,21.965,54.998,28.535,83.696,16.648c28.698-11.887,47.41-39.891,47.41-70.954 C478.827,345.872,444.471,311.515,402.075,311.468z M402.075,448.001c-32.99,0-59.733-26.744-59.733-59.733 s26.744-59.733,59.733-59.733s59.733,26.744,59.733,59.733C461.77,421.241,435.049,447.962,402.075,448.001z"/>
              <path d="M491.375,322.428L443.95,185.513c-0.058-0.221-0.117-0.438-0.192-0.654l-20.65-59.65 c-0.453-1.247-1.173-2.38-2.108-3.321c-2.95-2.928-6.133-5.61-9.518-8.022l-12.416-41.395c-0.11-0.364-0.244-0.72-0.4-1.067 l-5.483-18.375c-0.07-0.245-0.154-0.485-0.25-0.721c-3.868-24.167-25.661-41.302-50.058-39.359 c-24.397,1.943-43.204,22.31-43.2,46.784v70.416c-0.335,0.866-0.537,1.778-0.6,2.705l-0.249,7.945h-83.637l-0.247-7.85 c-0.018-1.016-0.222-2.02-0.6-2.963V59.734c0.004-24.472-18.799-44.838-43.193-46.784c-24.394-1.947-46.188,15.18-50.065,39.343 c-0.092,0.242-0.175,0.487-0.25,0.737l-5.475,18.358c-0.159,0.352-0.295,0.714-0.408,1.084l-12.419,41.405 c-3.409,2.435-6.616,5.141-9.59,8.091c-0.915,0.912-1.61,2.021-2.033,3.242l-20.65,59.65c-0.067,0.2-0.125,0.408-0.183,0.621 L22.637,322.441c-28.571,38.762-28.874,91.53-0.748,130.617c28.125,39.087,78.255,55.567,124.086,40.792 c45.832-14.775,76.898-57.429,76.9-105.583c0-0.092,0-0.179-0.009-0.267l-0.161-5.271l0.003-0.016l-2.722-88.313h74.044 l-2.722,88.313l0.007,0.041l-0.173,5.514c0.01,48.149,31.08,90.794,76.908,105.563c45.829,14.768,95.951-1.713,124.072-40.797 C520.244,413.949,519.942,361.188,491.375,322.428z M316.742,59.734c-0.006-15.846,12.368-28.936,28.19-29.82 c15.821-0.884,29.577,10.747,31.335,26.495c0.14,0.879,0.423,1.73,0.84,2.517c-20.266-6.54-42.393-3.714-60.365,7.709V59.734z M316.742,88.206c17.926-17.616,45.556-20.735,66.959-7.558l6.655,22.19c-24.75-8.884-52.288-4.999-73.614,10.385V88.206z M316.034,136.376c19.74-21.721,51.672-27.342,77.642-13.667c2.002,1.038,3.937,2.201,5.792,3.483 c2.918,1.913,5.655,4.091,8.175,6.504l19.792,57.175c0.058,0.221,0.117,0.442,0.192,0.654l36.697,105.957 c-24.384-16.571-54.369-22.735-83.312-17.125c-28.943,5.609-54.455,22.529-70.882,47.009l0.999-32.402 c1.184-0.319,2.284-0.892,3.224-1.68c6.94-6.084,14.706-11.157,23.067-15.067c3.005-1.402,4.925-4.418,4.925-7.734v-26.283 c0-0.138-0.072-0.253-0.079-0.389c-0.006-0.13,0.057-0.251,0.045-0.382l-8.533-93.867c-0.399-4.396-4.085-7.763-8.5-7.763h-9.378 L316.034,136.376z M317.484,157.868l6.983,76.8H189.55l6.983-76.8H317.484z M137.75,56.409 c1.758-15.748,15.514-27.379,31.335-26.495s28.196,13.974,28.19,29.82v6.9c-17.97-11.433-40.103-14.253-60.366-7.693 C137.322,58.148,137.606,57.293,137.75,56.409z M130.313,80.649c21.403-13.179,49.035-10.061,66.963,7.556v25.015 c-21.327-15.382-48.865-19.266-73.615-10.383L130.313,80.649z M86.392,190.526c0.067-0.2,0.125-0.408,0.183-0.621l19.808-57.208 c2.603-2.486,5.428-4.727,8.442-6.696c1.766-1.207,3.606-2.304,5.508-3.283c25.966-13.684,57.9-8.07,77.642,13.65l0.14,4.433 h-9.373c-4.415,0-8.101,3.366-8.5,7.763l-8.533,93.867c-0.012,0.131,0.051,0.252,0.045,0.382 c-0.006,0.136-0.079,0.251-0.079,0.389v26.283c0,3.316,1.92,6.331,4.925,7.733c8.361,3.91,16.126,8.983,23.067,15.067 c0.939,0.788,2.04,1.361,3.223,1.68l0.997,32.355c-16.441-24.467-41.956-41.371-70.896-46.969 c-28.941-5.599-58.919,0.57-83.299,17.139L86.392,190.526z M111.942,482.134c-35.654-0.02-68.222-20.226-84.074-52.163 s-12.253-70.095,9.291-98.504c0.158-0.208,0.308-0.425,0.45-0.65c5.896-7.521,12.881-14.12,20.725-19.579 c0.175-0.117,0.333-0.242,0.5-0.367c27.965-19.193,64.11-21.803,94.542-6.825c30.432,14.977,50.413,45.211,52.263,79.078 l0.004,0.115l0.009,0.041l0.158,5.117C205.678,440.163,163.708,482.075,111.942,482.134z M208.434,277.334 c-6.095-5.044-12.694-9.446-19.692-13.137v-12.463h136.533v12.463c-6.998,3.691-13.596,8.094-19.692,13.137H208.434z M486.149,429.972c-15.852,31.936-48.42,52.143-84.074,52.163c-51.726-0.029-93.694-41.874-93.875-93.6l0.167-5.129 c2.054-39.189,28.257-72.969,65.703-84.705s78.242,1.046,102.297,32.051c0.151,0.247,0.316,0.487,0.492,0.717 C498.402,359.877,502,398.035,486.149,429.972z"/>
              <path d="M231.409,217.601h51.2c9.421-0.011,17.056-7.645,17.067-17.067v-17.067c-0.011-9.421-7.646-17.056-17.067-17.067h-51.2 c-9.421,0.011-17.056,7.645-17.067,17.067v17.067C214.353,209.955,221.987,217.59,231.409,217.601z M231.409,183.468h51.2 l0.008,17.067h-51.208V183.468z"/>
              <path d="M110.726,213.209c-1.165-1.942-3.054-3.34-5.251-3.887c-2.195-0.556-4.521-0.213-6.463,0.952 c-1.941,1.165-3.338,3.057-3.879,5.256L86.6,249.663c-0.74,2.956,0.154,6.083,2.344,8.202c2.19,2.119,5.345,2.908,8.275,2.071 s5.191-3.175,5.931-6.131l8.533-34.133C112.235,217.476,111.891,215.151,110.726,213.209z"/>
              <path d="M126.942,251.48c2.195,0.548,4.517,0.202,6.457-0.962c1.939-1.164,3.337-3.051,3.885-5.246l8.533-34.133 c0.74-2.956-0.154-6.083-2.344-8.202c-2.19-2.119-5.345-2.908-8.275-2.071c-2.93,0.837-5.191,3.175-5.931,6.131l-8.533,34.133 c-0.552,2.196-0.207,4.521,0.957,6.463C122.856,249.534,124.745,250.933,126.942,251.48z"/>
              <path d="M410.867,253.805c0.74,2.956,3.001,5.294,5.931,6.131c2.93,0.837,6.085,0.048,8.275-2.071 c2.19-2.119,3.084-5.245,2.344-8.202l-8.533-34.133c-0.74-2.956-3.001-5.293-5.931-6.131c-2.93-0.837-6.085-0.048-8.275,2.071 s-3.084,5.245-2.344,8.202L410.867,253.805z"/>
              <path d="M376.734,245.272c0.74,2.956,3.001,5.293,5.931,6.131c2.93,0.838,6.085,0.048,8.275-2.071 c2.19-2.119,3.084-5.245,2.344-8.202l-8.533-34.133c-0.74-2.956-3.001-5.293-5.931-6.131c-2.93-0.838-6.085-0.048-8.275,2.071 c-2.19,2.119-3.084,5.245-2.344,8.202L376.734,245.272z"/>
            </g>
          </svg>
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
