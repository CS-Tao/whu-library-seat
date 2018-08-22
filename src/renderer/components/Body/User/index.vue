<template>
	<div class="flex-row">
    <div class="warp">
      <span class="title">用户信息</span>
      <span class="info"><span class="info-key">Id</span><span class="info-value">{{ userInfo.id }}</span></span>
      <span class="info"><span class="info-key">姓名</span><span class="info-value">{{ userInfo.name }}</span></span>
      <span class="info"><span class="info-key">学号</span><span class="info-value">{{ userInfo.username }}</span></span>
      <span class="info"><span class="info-key">状态</span><span class="info-value">{{ userInfo.status }}</span></span>
      <span class="info"><span class="info-key">是否签到</span><span class="info-value">{{ userInfo.checkedIn === null?'无数据':(userInfo.checkedIn?'是':'否') }}</span></span>
      <span class="info"><span class="info-key">最近入馆</span><span class="info-value">{{ userInfo.lastIn }}</span></span>
      <span class="info"><span class="info-key">最近出馆</span><span class="info-value">{{ userInfo.lastOut }}</span></span>
      <span class="info"><span class="info-key">最近签到地点</span><span class="info-value">{{ userInfo.lastInBuildingName }}</span></span>
      <span class="info"><span class="info-key">最近登录时间</span><span class="info-value">{{ formatDate(new Date(userInfo.lastLogin)) }}</span></span>
      <!-- <span><span class="info-key"></span><span class="info-value">{{ violationCount }}</span></span> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import libraryRestApi from '@/api/library.api'

export default {
  data () {
    return {
      buttonText: '违约记录',
      userInfo: {
        id: '无数据',
        name: '无数据',
        username: '无数据',
        status: '无数据',
        lastLogin: '无数据',
        checkedIn: null,
        lastIn: '无数据',
        lastOut: '无数据',
        lastInBuildingName: '无数据',
        violationCount: '无数据'
      }
    }
  },
  computed: {
    ...mapGetters([
      'userToken'
    ])
  },
  mounted () {
    libraryRestApi.User(this.userToken).then((response) => {
      if (response.data.status === 'success') {
        this.userInfo = response.data.data
      } else {
        this.$message({
          type: 'error',
          duration: '5000',
          showClose: true,
          message: response.data.message
        })
      }
    }).catch(() => {})
  },
  methods: {
    formatDate (time) {
      var year = time.getFullYear()
      var month = time.getMonth() + 1
      var day = time.getDate()
      var hour = time.getHours()
      var minute = time.getMinutes()
      var seconds = time.getSeconds()
      return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${seconds < 10 ? '0' + seconds : seconds}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
$warp-width: 280px;
$warp-height: 300px;
$warp-padding: 20px;
.warp {
  width: $warp-width;
  height: $warp-height;
  margin: $layout-header-h ($layout-width - $warp-width)/2 - $warp-padding $layout-footer-h ($layout-width - $warp-width)/2 - $warp-padding;
  padding: $warp-padding;
  border: 1px solid $text-color;
  border-radius: 4px;
  .title {
    display: block;
    margin-left: (140 - $text-size-large * 2);
    margin-right: (140 - $text-size-large * 2);
    margin-top: 0;
    margin-bottom: 20px;
    color: $text-color;
    font-size: $text-size-large;
  }
  .info {
    display: block;
    margin: 10px 0;
    .info-key {
      left: 0;
      color: $text-color;
      font-size: $text-size-normal;
    }
    .info-value {
      float: right;
      font-size: $text-size-normal - 1;
      color: $text-color-lowlight;
    }
  }
}
span {
  cursor: default!important;
}
</style>
