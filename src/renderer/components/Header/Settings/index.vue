<template>
  <el-form
    :model="settings"
    status-icon
    label-width="70px"
    class="flex-row">
    <div style="margin:auto;">
      <span class="form-item title">设置</span>
      <el-form-item label="服务地址" class="form-item">
        <el-input v-model="settings.baseUrl" prefix-icon="el-icon-tickets" class="input"></el-input>
      </el-form-item>
      <!-- <el-form-item label="开馆时间" class="form-item">
        <time-picker class="input" v-model="settings.beginTime"></time-picker>
      </el-form-item>
      <el-form-item label="闭馆时间" class="form-item">
        <time-picker class="input" v-model="settings.endTime"></time-picker>
      </el-form-item> -->
      <el-form-item label="预约时间" class="form-item">
        <time-picker class="input" v-model="settings.oppointmentTime"></time-picker>
      </el-form-item>
      <el-form-item label="点击窗口的关闭按钮时退出到托盘" label-width="224px" class="form-item" style="margin-top: 15px;text-align: center;">
        <el-switch v-model="settings.backgroundEnable" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-form-item>
      <div class="form-item" style="text-align: center;">
        <el-button type="primary" class="save-button" @click="saveSettings()">保存设置</el-button>
        <el-button type="primary" class="cancel-button" @click="restoreSettings()">恢复默认</el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
import timePicker from '@/components/Utils/timePicker'
import Store from 'electron-store'

const store = new Store({
  name: 'whu-library-seat'
})

export default {
  data () {
    return {
      settings: {
        baseUrl: null,
        oppointmentTime: null,
        beginTime: null,
        endTime: null,
        backgroundEnable: true
      }
    }
  },
  components: {
    timePicker
  },
  computed: {
    ...mapGetters([
      'settingInfo'
    ])
  },
  mounted () {
    this.settings = {...this.settingInfo}
  },
  methods: {
    saveSettings () {
      var saveMessage = '保存成功'
      if (this.settings.baseUrl !== store.get('baseUrl', 'https://seat.lib.whu.edu.cn:8443')) {
        saveMessage = '保存成功，重启生效'
      }
      this.$store.dispatch('saveSettings', this.settings)
      this.$message({
        type: 'success',
        duration: '800',
        message: saveMessage
      })
    },
    restoreSettings () {
      var restoreMessage = '已恢复默认设置'
      if (this.settings.baseUrl !== store.get('baseUrl', 'https://seat.lib.whu.edu.cn:8443')) {
        restoreMessage = '已恢复默认设置，重启生效'
      }
      this.$store.dispatch('restoreSettings')
      this.settings = {...this.settingInfo}
      this.$message({
        type: 'success',
        duration: '800',
        message: restoreMessage
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.title {
  display: block;
  margin-bottom: 20px!important;
  color: $text-color;
  font-size: $text-size-large + 6;
}
.form-item {
  margin: 10px 5px;
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
