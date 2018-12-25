<template>
	<div class="authen">
    <div class="auth-tip">
      <span>选择授权方式</span>
    </div>
		<div class="auth-button" :class="{'checked': authInfo.useListForAuth}" @click="useListBtnClicked()">
      <i class="button-icon">
				<svg class="button-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M608 352h288c17.7 0 32-14.3 32-32s-14.3-32-32-32H608c-17.7 0-32 14.3-32 32s14.3 32 32 32zM896 480H608c-17.7 0-32 14.3-32 32s14.3 32 32 32h288c17.7 0 32-14.3 32-32s-14.3-32-32-32zM896 672H608c-17.7 0-32 14.3-32 32s14.3 32 32 32h288c17.7 0 32-14.3 32-32s-14.3-32-32-32zM510.9 624.2C484.3 555 432.4 512 375.4 512H265c-30.2 0-59 12.1-83.4 33.7-15.5 13.8-29.2 31.5-40.3 52.4-4.4 8.2-8.3 16.9-11.8 26L73.3 770.5c-7.4 19.2-10.2 40.6-8.4 61.5 1.1 13.1 4 26 8.7 38 3.8 9.6 8.6 18.4 14.3 26 4 5.4 8.4 10.2 13.2 14.3 13.5 11.6 29.5 17.7 46.2 17.7h346c16.7 0 32.7-6.1 46.2-17.7 11.6-9.9 21.1-23.9 27.5-40.3 12.1-31.1 12.2-68.2 0.3-99.5l-56.4-146.3z m-3.7 222.5c-4.7 11.9-11 17.3-14 17.3h-346c-3 0-9.4-5.4-14-17.3-1.8-4.6-3.1-9.6-3.9-14.7-2-12.9-0.8-26.8 3.8-38.6L189 647.8l0.3-0.7c9.7-25.3 24-45.4 40.1-57.7 11.3-8.6 23.5-13.4 35.7-13.4h110.4c29.4 0 59.2 27.9 75.8 71.1l56.2 146.3c6.2 16.5 6.1 36.9-0.3 53.3zM213.3 447.6c30.5 20.5 67.3 32.4 106.8 32.4 106 0 192-86 192-192s-86-192-192-192c-73.5 0-137.3 41.3-169.6 101.9-9.2 17.3-15.9 36.2-19.4 56.2-2 11-3 22.4-3 34 0 45.1 15.5 86.5 41.5 119.3 12.4 15.5 27.1 29.1 43.7 40.2z m-9.9-212.3c6.3-13.9 15.1-26.7 26.2-37.8 24.2-24.2 56.3-37.5 90.5-37.5s66.3 13.3 90.5 37.5c24.2 24.2 37.5 56.3 37.5 90.5s-13.3 66.3-37.5 90.5c-24.2 24.2-56.3 37.5-90.5 37.5-28.5 0-55.6-9.3-77.9-26.4-4.4-3.4-8.7-7.1-12.7-11.1-24.2-24.2-37.5-56.3-37.5-90.5 0.1-18.5 4-36.4 11.4-52.7z"></path></svg>
      </i>
			<div class="gap"></div>
			<span v-if="authInfo.useListForAuth" class="text">[ √ ]&nbsp;&nbsp;用户白名单验证</span>
			<span v-else class="text">登录时验证用户白名单</span>
		</div>
		<div class="auth-button" :class="{'checked': authInfo.haveStaredRepo, 'disable': ghBtnDisable}" @click="ghAuthBtnClicked()">
      <i class="button-icon">
				<i v-if="ghBtnloading" class="el-icon-loading"></i>
        <svg v-else class="button-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      </i>
			<div class="gap"></div>
			<span v-if="authInfo.haveStaredRepo" class="text">[ √ ]&nbsp;&nbsp;GitHub 已授权</span>
			<span v-else class="text">{{ghBtnMessage}}</span>
		</div>
    <span v-if="socketFailMessage" class="socket-err-msg">{{socketFailMessage}}</span>
		<div class="help-link-wrap">
			<a class="help-link" href="javascript:void(0)" @click="$openLink('https://home.cs-tao.cc/whu-library-seat/specification/auth.html')">了解授权机制</a>
		</div>
		<el-dialog
			title="通过 Github Star 授权"
			:visible.sync="comfirmDialogVisible"
      :modal-append-to-body="false"
      :close-on-press-escape="false"
      :show-close="false"
      :close-on-click-modal="false"
			width="70%"
      top="38%"
			center>
			<span>{{'检测到您尚未 Star 本软件，请点击软件下方的&nbsp;'}}</span>
      <i class="operation-icon" @click="$openLink('https://github.com/CS-Tao/whu-library-seat')">
        <svg class="operation-icon" aria-labelledby="simpleicons-github-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      </i>
			<span>{{'&nbsp;图标进入本软件的 GitHub 地址，点星后回到本软件，点击确定按钮即可完成授权'}}</span>
			<span slot="footer" class="dialog-footer">
				<el-button class="comfirm-button" @click="onComfirmDialogYes()">确 定</el-button>
				<el-button class="cancel-button" @click="onComfirmDialogNo()">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import io from 'socket.io-client'

const workFlowModes = {
  none: 'none',
  logining: 'logining',
  waitConfirm: 'waitConfirm',
  logined: 'logined',
  staring: 'staring'
}

const socketBaseUrl = 'https://seat-ghauth.cs-tao.cc'

export default {
  name: 'authen',
  data () {
    return {
      workMode: workFlowModes.none,
      comfirmDialogVisible: false,
      socket: null,
      socketFailMessage: null
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userPasswd',
      'hasToken',
      'userToken',
      'announceViewed',
      'authInfo'
    ]),
    ghBtnloading () {
      return this.workMode !== workFlowModes.none
    },
    ghBtnDisable () {
      return this.ghBtnloading
    },
    ghBtnMessage () {
      switch (this.workMode) {
        case workFlowModes.logining:
          return '正在连接服务器'
        case workFlowModes.waitConfirm:
          return '等待网页端确认'
        case workFlowModes.logined:
        case workFlowModes.staring:
          return '检测是否点星'
        default:
          return 'GitHub star 永久授权'
      }
    }
  },
  mounted () {
    this.workMode = workFlowModes.none
  },
  beforeDestroy () {
    this.disconnectSocket()
  },
  methods: {
    showError (message) {
      console.trace()
      this.$message({
        type: 'error',
        duration: '2000',
        showClose: true,
        message: message
      })
    },
    useListBtnClicked () {
      if (this.authInfo.useListForAuth) {
        this.$store.commit('TRIGGER_AUTH_FORM', false)
        return
      }
      this.workMode = workFlowModes.none
      this.$store.commit('USE_LIST_FOR_AUTH')
      this.$store.commit('TRIGGER_AUTH_FORM', false)
    },
    ghAuthBtnClicked () {
      if (this.ghBtnDisable) {
        return
      }
      if (this.authInfo.haveStaredRepo) {
        this.$store.commit('TRIGGER_AUTH_FORM', false)
        return
      }
      this.socketFailMessage = null
      this.loginGitHub()
    },
    connectSocket () {
      this.disconnectSocket()
      this.socket = io.connect(socketBaseUrl, {
        reconnection: false,
        transportOptions: {
          polling: {
            extraHeaders: {
              'x-clientid': 'whu-library-seat'
            }
          }
        }
      })
      this.socket.on('connect', () => {
        this.socketFailMessage = null
        this.workMode = workFlowModes.waitConfirm
      })
      this.socket.on('connect_error', (error) => {
        this.socketFailMessage = '无法连接服务器：' + error
        this.disconnectSocket()
        this.workMode = workFlowModes.none
      })
      this.socket.on('error', (error) => {
        this.socketFailMessage = '无法连接服务器：' + error
        this.disconnectSocket()
        this.workMode = workFlowModes.none
      })
      this.socket.on('disconnect', (reason) => {
        if (reason !== 'io client disconnect') {
          this.socketFailMessage = '已断开和服务器的连接'
          this.disconnectSocket()
          this.workMode = workFlowModes.none
        }
      })
      this.socket.on('socketId', (socketId) => {
        this.$openLink(`${socketBaseUrl}/comfirm?socketid=${socketId}&device=desktop`)
        this.workMode = workFlowModes.waitConfirm
      })
      this.socket.on('token', (token) => {
        this.disconnectSocket()
        this.loginGitHubCallback((token))
      })
      this.socket.on('cancel', (socketId) => {
        this.$message({
          type: 'info',
          duration: '0',
          showClose: true,
          message: '已取消授权'
        })
        this.cancelAuthen()
        this.disconnectSocket()
      })
    },
    disconnectSocket () {
      if (this.socket !== null && this.socket.connected) {
        this.socket.disconnect(true)
      }
    },
    cancelAuthen () {
      this.comfirmDialogVisible = false
      this.workMode = workFlowModes.none
      this.$store.commit('RESTORE_AUTH')
    },
    loginGitHub () {
      this.workMode = workFlowModes.logining
      this.$nextTick(() => {
        this.connectSocket()
      })
    },
    loginGitHubCallback (token) {
      this.workMode = workFlowModes.logined
      this.$store.dispatch('saveAuthToken', token)
        .then((token) => {
          return this.checkIfStared(token)
        })
        .then(([token, haveStared]) => {
          if (haveStared) {
            this.workMode = workFlowModes.none
            this.$store.commit('TRIGGER_STAERD', true)
            this.$store.commit('TRIGGER_AUTH_FORM', false)
            this.$message({
              type: 'success',
              duration: '3000',
              showClose: true,
              message: `GitHub 授权成功`
            })
          } else {
            this.comfirmDialogVisible = true
          }
        })
        .catch((error) => {
          this.cancelAuthen()
          this.workMode = workFlowModes.none
          this.showError(error.message)
        })
    },
    checkIfStared (token) {
      this.workMode = workFlowModes.staring
      return this.$store.dispatch('checkIfStared', {token, cursor: null})
    },
    onComfirmDialogYes () {
      this.comfirmDialogVisible = false
      if (this.authInfo.githubAuthToken) {
        this.checkIfStared(this.authInfo.githubAuthToken)
          .then(([token, haveStared]) => {
            if (haveStared) {
              this.workMode = workFlowModes.none
              this.$store.commit('TRIGGER_STAERD', true)
              this.$store.commit('TRIGGER_AUTH_FORM', false)
              this.$message({
                type: 'success',
                duration: '3000',
                showClose: true,
                message: `GitHub 授权成功`
              })
            } else {
              this.comfirmDialogVisible = true
            }
          })
          .catch((error) => {
            this.cancelAuthen()
            this.workMode = workFlowModes.none
            this.showError(error.message)
          })
      } else {
        this.$message({
          type: 'warning',
          duration: '3000',
          showClose: true,
          message: '无 GitHub 令牌，请点击取消按钮，然后重新授权'
        })
      }
    },
    onComfirmDialogNo () {
      this.$message({
        type: 'warning',
        duration: '2000',
        showClose: true,
        message: '取消授权'
      })
      this.cancelAuthen()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.authen {
	text-align: center;
  margin: 10px 0 60px 0;
  .auth-tip {
    color: $text-color;
    margin-bottom: 10px;
    text-align: left;
    cursor: default;
  }
	.auth-button {
		width: 60vw;
		height: auto;
		margin-bottom: 10px;
		padding: 4px 16px;
		display: flex;
		align-items: center;
		cursor: pointer;
    color: $text-color;
    font-size: $text-size-normal;
    background: $primary-button-background-blur!important;
		border: 1px solid $primary-color!important;
		border-radius: 0;
    &:hover {
      background: $primary-button-background-hover!important;
    }
    &:active {
      background: $primary-button-background-click!important;
    }
    &.checked {
			color: $text-color;
			background: $ok-button-background-blur!important;
			border-color: $button-green!important;
			&:hover {
			  background: $ok-button-background-hover!important;
			}
			&:active {
			  background: $ok-button-background-click!important;
			}
    }
		&.disable {
			cursor: not-allowed;
			color: $text-color;
			background: $disabled-button-background-blur!important;
			border-color: $disabled-button-border!important;
			&:hover {
				background: $disabled-button-background-blur!important;
			}
			&:active {
				background: $disabled-button-background-blur!important;
			}
		}
		.button-icon {
			fill: $text-color;
			width: 20px;
			height: 20px;
			opacity: $button-click-opacity;
		}
		.gap {
			margin: 0 10px;
			cursor: pointer;
			width: 2px;
			height: 26px;
			background-color: $text-color-middlelight;
		}
		.text {
			vertical-align: middle;
			color: $text-color;
			text-align: center;
			fill: $text-color;
			font-size: $text-size-normal;
			line-height: 30px;
			opacity: $button-click-opacity;
		}
	}
  .socket-err-msg {
    display: block;
    text-align: center;
    margin: auto;
    max-width: 55vw;
    font-size: $text-size-normal;
    word-wrap: break-word;
    cursor: default;
    color: $button-red;
  }
	.help-link-wrap {
		text-align: right;
		.help-link {
			color: $button-green;
		}
	}
}
.comfirm-button {
  margin: 0 8px;
  padding-left: 20px;
  padding-right: 20px;
  color: $text-color;
  background: $ok-button-background-blur!important;
  border-color: $button-green!important;
  &:hover {
    background: $ok-button-background-hover!important;
  }
  &:active {
    background: $ok-button-background-click!important;
  }
}
.cancel-button {
  margin: 0 8px;
  padding-left: 20px;
  padding-right: 20px;
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
.operation-icon {
  fill: $text-color;
  margin: auto;
  cursor: pointer;
  width: 20px;
  opacity: $button-hover-opacity;
  &:hover {
    opacity: $button-click-opacity;
  }
}
</style>
