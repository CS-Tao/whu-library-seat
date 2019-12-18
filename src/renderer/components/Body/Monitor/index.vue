<template>
  <div class="dialog">
    <div class="warp-content">
      <el-form
        status-icon
        label-width="40px"
        class="flex-row">
        <span class="form-item title">
          监控器
        </span>
        <div class="date-info">
          <span class="date">
            <el-tag v-if="date" type="warning">{{date}}</el-tag>
          </span>
          <span class="time">
            <el-tag v-if="beginTime.length > 0" type="success">{{beginTime[0].label}}</el-tag>
            <span class="text">-</span>
            <el-tag v-if="endTime.length > 0" type="success">{{endTime[0].label}}</el-tag>
          </span>
        </div>
        <div class="room-info">
          <span class="room">
            <el-tag v-if="room.length > 0" class="tag">{{room[0][1]}}</el-tag>
          </span>
          <span class="options">
            <el-tag v-if="battery" type="success">电源(已选)</el-tag>
            <el-tag v-else type="info">电源(未选)</el-tag>
            <el-tag v-if="window" type="warning">靠窗(已选)</el-tag>
            <el-tag v-else type="info">靠窗(未选)</el-tag>
          </span>
        </div>
        <el-form-item label="监控间隔(毫秒)" label-width="auto" class="form-item">
          <el-input-number
            v-model="interval"
            controls-position="right"
            :disabled="isWorking"
            :min="1000"
            :max="10000"
            @change="warnIntervalTooLow()">
          </el-input-number>
        </el-form-item>
        <el-form-item label="监控时长(分钟)" label-width="auto" class="form-item">
          <el-input-number
            v-model="last"
            controls-position="right"
            :disabled="isWorking"
            :min="1"
            :max="360">
          </el-input-number>
        </el-form-item>
        <div class="form-item" style="text-align: center;">
          <el-button
            :disabled="isWorking"
            type="primary"
            :class="isWorking ? 'button-disabled' : 'save-button'"
            :icon="isWorking ? 'el-icon-loading' : null"
            :style="isWorking ? 'width: 100px;':'width: 80px;'"
            @click="okBtnClicked()">
            {{okBtnText}}
          </el-button>
          <el-button
            type="primary"
            class="cancel-button"
            @click="cancelBtnClicked()">
            {{cancelBtnText}}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'monitor-form',
  props: {
    room: {
      type: Array,
      require: true
    },
    date: {
      type: String,
      require: true
    },
    beginTime: {
      type: Array,
      require: true
    },
    endTime: {
      type: Array,
      require: true
    },
    battery: {
      type: Boolean,
      require: true
    },
    window: {
      type: Boolean,
      require: true
    },
    okBtnText: {
      type: String,
      require: true
    },
    cancelBtnText: {
      type: String,
      require: true
    },
    workingStatus: {
      type: String,
      require: true
    },
    isWorking: {
      type: Boolean,
      require: true
    }
  },
  data () {
    return {
      interval: 1500,
      last: 60,
      intervalTooLowWarned: false
    }
  },
  methods: {
    okBtnClicked () {
      this.$emit('btnClick', {
        btn: 'ok',
        data: {
          interval: this.interval,
          last: this.last
        }
      })
    },
    cancelBtnClicked () {
      this.$emit('btnClick', {
        btn: 'cancel'
      })
    },
    warnIntervalTooLow () {
      if (!this.intervalTooLowWarned) {
        if (this.interval < 1500) {
          this.$message({
            type: 'warning',
            duration: '0',
            showClose: true,
            message: '敬告：监控间隔过低可能会被后台识别，有封号风险'
          })
        }
        this.intervalTooLowWarned = true
      }
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
    }
    .date-info {
      margin: 6px 17px 10px 17px;
      display: flex;
      justify-content: flex-start;
      cursor: default !important;
      .text {
        color: $text-color
      }
      .time {
        .text {
          color: $text-color
        }
      }
      .date {
        margin-left: 14px;
        width: 100px;
      }
    }
    .room-info {
      margin-bottom: 6px;
      cursor: default !important;
      .room {
        .tag {
          padding-left: 10px;
          padding-right: 10px;
          max-width: 110px;
        }
      }
    }
    .form-item {
      margin: 10px 17px;
      border: none!important;
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
