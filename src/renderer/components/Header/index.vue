<template>
	<div class="header">
    <el-form
      :model="userInfo"
      status-icon
      ref="userInfo"
      label-width="50px"
      class="flex-row">
      <div style="margin:auto;">
        <el-form-item inline label="学号" prop="account" class="form-item" style="flex-col">
          <el-input
            :disabled="accountLocked"
            v-model.number="userInfo.account"
            clearable
            prefix-icon="el-icon-edit"
            class="input">
          </el-input>
          <el-button class="toggle-button" @click="lockAccount()">
            <svg class="icon" :class="accountLocked?'icon-locked':'icon-unlocked'" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M5 15 L5 30 27 30 27 15 Z M9 15 C9 9 9 5 16 5 23 5 23 9 23 15 M16 20 L16 23" />
            <circle cx="16" cy="24" r="1" />
          </svg>
          </el-button>
        </el-form-item>
        <el-form-item label="密码" prop="passwd" class="form-item">
          <el-input
            :disabled="passwdLocked"
            type="password"
            v-model="userInfo.passwd"
            auto-complete="off"
            clearable
            prefix-icon="el-icon-edit"
            class="input">
          </el-input>
          <el-button class="toggle-button" @click="lockPasswd()">
            <svg class="icon" :class="passwdLocked?'icon-locked':'icon-unlocked'" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M5 15 L5 30 27 30 27 15 Z M9 15 C9 9 9 5 16 5 23 5 23 9 23 15 M16 20 L16 23" />
            <circle cx="16" cy="24" r="1" />
          </svg>
          </el-button>
        </el-form-item>
      </div>
    </el-form>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      userInfo: {
        account: '',
        passwd: ''
      },
      accountLocked: false,
      passwdLocked: false
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userPasswd'
    ])
  },
  mounted () {
    this.userInfo.account = this.userAccount
    this.userInfo.passwd = this.userPasswd
    if (this.userAccount && this.userAccount !== '') {
      this.accountLocked = true
    }
    if (this.userPasswd && this.userAccount !== '') {
      this.passwdLocked = true
    }
  },
  methods: {
    lockAccount () {
      this.accountLocked = !this.accountLocked
      this.$store.dispatch('setAccount', this.userInfo.account)
    },
    lockPasswd () {
      this.passwdLocked = !this.passwdLocked
      this.$store.dispatch('setPasswd', this.userInfo.passwd)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.form-item {
  margin:10px 5px;
  .input {
    width: 250px;
    margin: 0 5px;
  }
  .toggle-button {
    padding: 0;
    float: right;
    color: $text-color;
    background: transparent!important;
    border-color: transparent!important;
    svg {
      color: inherit;
    }
    .icon {
      float: right;
      margin: auto;
      cursor: pointer;
      width: 28px;
      height: 28px;
    }
    .icon-locked {
      color: $button-green;
      opacity: $button-blur-opacity;
      &:hover {
        opacity: $button-hover-opacity;
      }
      &:active {
        color: $text-color;
        opacity: $button-click-opacity;
      }
    }
    .icon-unlocked {
      color: $text-color;
      opacity: $button-blur-opacity;
      &:hover {
        color: $text-color-highlight;
      }
      &:active {
        color: $button-green;
        opacity: $button-click-opacity;
      }
    }
  }
}
</style>
