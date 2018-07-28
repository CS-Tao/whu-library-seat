<template>
  <div class="warp">
    <el-input-number
      :disabled="disabled"
      class="num"
      v-model="hour"
      controls-position="right"
      :min="0"
      :max="23">
    </el-input-number>
    <span class="unit">h</span>
    <el-input-number
      :disabled="disabled"
      class="num"
      v-model="minutes"
      controls-position="right"
      :min="0" :max="59">
    </el-input-number>
    <span class="unit">m</span>
    <el-input-number
      :disabled="disabled"
      class="num"
      v-model="seconds"
      controls-position="right"
      :min="0" :max="59">
    </el-input-number>
    <span class="unit">s</span>
  </div>
</template>

<script>
export default {
  name: 'time-picker',
  props: {
    value: {
      type: Date,
      require: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hour: null,
      minutes: null,
      seconds: null
    }
  },
  mounted () {
    if (this.value) {
      this.hour = this.value.getHours()
      this.minutes = this.value.getMinutes()
      this.seconds = this.value.getSeconds()
    }
  },
  computed: {
    dateSelected () {
      var today = new Date()
      today.setHours(this.hour)
      today.setMinutes(this.minutes)
      today.setSeconds(this.seconds)
      return today
    }
  },
  watch: {
    value: {
      handler: function () {
        if (this.value) {
          this.hour = this.value.getHours()
          this.minutes = this.value.getMinutes()
          this.seconds = this.value.getSeconds()
        }
      },
      deep: true
    },
    dateSelected () {
      this.$emit('input', this.dateSelected)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.warp {
  width: 100%;
  height: 100%;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-align-items: stretch;
  align-items: stretch;
  justify-content: center;
  .num {
    flex: 7;
  }
  .unit {
    margin: 0 4px;
    text-align: center;
    flex: 2;
    color: $text-color-lowlight;
    font-size: 15px;
    &:nth-child(6) {
      margin: 0 0 0 4px;
    }
  }
}
span {
  cursor: default!important;
}
</style>

