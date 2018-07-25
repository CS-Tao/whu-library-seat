<template>
  <el-form
    :model="settings"
    status-icon
    ref="settingForm"
    label-width="70px"
    class="flex-row">
    <div style="margin:auto;">
      <el-form-item label="服务地址" class="form-item">
        <el-input
          v-model="settings.baseUrl"
          prefix-icon="el-icon-tickets"
          class="input">
        </el-input>
      </el-form-item>
      <el-form-item label="有效时间" class="form-item">
        <el-time-picker
          is-range class="input"
          v-model="settings.availableTime"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围">
        </el-time-picker>
      </el-form-item>
      <el-form-item label="预约时间" class="form-item">
        <el-time-picker
          class="input" align="center"
          v-model="settings.oppointmentTime"
          placeholder="开始预约的时间">
        </el-time-picker>
      </el-form-item>
      <el-form-item label="点击窗口的关闭按钮时退出到托盘" label-width="224px" class="form-item" style="margin-top: 15px;">
        <el-switch
          v-model="settings.backgroundEnable"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <div class="form-item">
        <el-button type="primary" class="save-button" @click="saveSettings()">保存设置</el-button>
        <el-button type="primary" class="cancel-button" @click="restoreSettings()">恢复默认</el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      settings: {
        baseUrl: 'https://seat.lib.whu.edu.cn:8443',
        oppointmentTime: new Date(2018, 4, 10, 22, 45),
        availableTime: [new Date(2018, 4, 10, 8, 0), new Date(2018, 4, 10, 22, 30)],
        backgroundEnable: true
      }
    }
  },
  computed: {
    ...mapGetters([
      'settingInfo'
    ])
  },
  mounted () {
    this.settings = JSON.parse(JSON.stringify(this.settingInfo))
  },
  methods: {
    saveSettings () {
      this.$store.dispatch('saveSettings', this.settings)
      this.$message({
        type: 'success',
        duration: '800',
        message: '保存成功'
      })
    },
    restoreSettings () {
      this.$store.dispatch('restoreSettings')
      this.settings = JSON.parse(JSON.stringify(this.settingInfo))
      this.$message({
        type: 'success',
        duration: '800',
        message: '已恢复默认设置'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.form-item {
  margin: 10px 5px;
  text-align: center;
  .input {
    width: 240px;
    margin: 0 5px;
  }
  .save-button {
    margin: 16px 8px;
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
    margin: 16px 8px;
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
}
</style>
