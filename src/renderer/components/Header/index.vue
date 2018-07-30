<template>
	<div class="header" :class="{'header-unlogin': !hasToken}">
    <el-button v-if="!hasToken" class="setting-icon" :class="{'setting-icon-back': settingsVisible}" @click="openSettings()">
      <svg v-show="!settingsVisible" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 268.765 268.765" style="enable-background:new 0 0 268.765 268.765;" xml:space="preserve"><g id="Settings"><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M267.92,119.461c-0.425-3.778-4.83-6.617-8.639-6.617 c-12.315,0-23.243-7.231-27.826-18.414c-4.682-11.454-1.663-24.812,7.515-33.231c2.889-2.641,3.24-7.062,0.817-10.133 c-6.303-8.004-13.467-15.234-21.289-21.5c-3.063-2.458-7.557-2.116-10.213,0.825c-8.01,8.871-22.398,12.168-33.516,7.529 c-11.57-4.867-18.866-16.591-18.152-29.176c0.235-3.953-2.654-7.39-6.595-7.849c-10.038-1.161-20.164-1.197-30.232-0.08 c-3.896,0.43-6.785,3.786-6.654,7.689c0.438,12.461-6.946,23.98-18.401,28.672c-10.985,4.487-25.272,1.218-33.266-7.574 c-2.642-2.896-7.063-3.252-10.141-0.853c-8.054,6.319-15.379,13.555-21.74,21.493c-2.481,3.086-2.116,7.559,0.802,10.214 c9.353,8.47,12.373,21.944,7.514,33.53c-4.639,11.046-16.109,18.165-29.24,18.165c-4.261-0.137-7.296,2.723-7.762,6.597 c-1.182,10.096-1.196,20.383-0.058,30.561c0.422,3.794,4.961,6.608,8.812,6.608c11.702-0.299,22.937,6.946,27.65,18.415 c4.698,11.454,1.678,24.804-7.514,33.23c-2.875,2.641-3.24,7.055-0.817,10.126c6.244,7.953,13.409,15.19,21.259,21.508 c3.079,2.481,7.559,2.131,10.228-0.81c8.04-8.893,22.427-12.184,33.501-7.536c11.599,4.852,18.895,16.575,18.181,29.167 c-0.233,3.955,2.67,7.398,6.595,7.85c5.135,0.599,10.301,0.898,15.481,0.898c4.917,0,9.835-0.27,14.752-0.817 c3.897-0.43,6.784-3.786,6.653-7.696c-0.451-12.454,6.946-23.973,18.386-28.657c11.059-4.517,25.286-1.211,33.281,7.572 c2.657,2.89,7.047,3.239,10.142,0.848c8.039-6.304,15.349-13.534,21.74-21.494c2.48-3.079,2.13-7.559-0.803-10.213 c-9.353-8.47-12.388-21.946-7.529-33.524c4.568-10.899,15.612-18.217,27.491-18.217l1.662,0.043 c3.853,0.313,7.398-2.655,7.865-6.588C269.044,139.917,269.058,129.639,267.92,119.461z M134.595,179.491 c-24.718,0-44.824-20.106-44.824-44.824c0-24.717,20.106-44.824,44.824-44.824c24.717,0,44.823,20.107,44.823,44.824 C179.418,159.385,159.312,179.491,134.595,179.491z"/></g></svg>
      <svg v-show="settingsVisible" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve"><g><path d="M353.812,172.125c-7.478,0-14.21,2.926-19.335,7.612l-0.058-0.077L219.67,284.848c-5.91,5.451-9.295,13.101-9.295,21.152 s3.385,15.701,9.295,21.152L334.42,432.34l0.058-0.076c5.125,4.686,11.857,7.611,19.335,7.611 c15.836,0,28.688-12.852,28.688-28.688c0-8.357-3.634-15.836-9.353-21.076l0.058-0.076L281.52,306l91.685-84.054l-0.058-0.077 c5.719-5.221,9.353-12.68,9.353-21.057C382.5,184.977,369.648,172.125,353.812,172.125z M306,0C137.012,0,0,137.012,0,306 s137.012,306,306,306s306-137.012,306-306S474.988,0,306,0z M306,554.625C168.912,554.625,57.375,443.088,57.375,306 S168.912,57.375,306,57.375S554.625,168.912,554.625,306S443.088,554.625,306,554.625z"/></g></svg>
    </el-button>
    <el-form
      v-show="!settingsVisible"
      :model="userInfo"
      status-icon
      ref="userInfo"
      label-width="50px"
      class="flex-row">
      <div style="margin:auto;">
        <div class="form-item" style="margin: 0 0 40px 0" v-if="!hasToken">
          <svg version="1.1" class="logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.004 512.004" style="enable-background:new 0 0 512.004 512.004;" xml:space="preserve"><g>
            <path d="M291.057,242.811c1.51,2.953,4.514,4.659,7.62,4.659c1.297,0,2.628-0.299,3.866-0.93 c0.503-0.256,50.731-25.771,75.503-33.596c4.489-1.425,6.98-6.221,5.555-10.709c-1.417-4.489-6.178-6.989-10.709-5.572 c-26.095,8.252-75.981,33.596-78.097,34.671C290.596,233.467,288.924,238.605,291.057,242.811z"/>
            <path d="M298.677,145.071c1.297,0,2.628-0.299,3.866-0.93c0.503-0.256,50.731-25.771,75.503-33.596 c4.489-1.425,6.98-6.221,5.555-10.709c-1.417-4.489-6.178-6.989-10.709-5.572c-26.095,8.252-75.981,33.596-78.097,34.671 c-4.198,2.133-5.871,7.27-3.738,11.477C292.567,143.364,295.571,145.071,298.677,145.071z"/>
            <path d="M503.469,128.004c-4.719,0-8.533,3.823-8.533,8.533v332.8c0,14.114-11.486,25.6-25.6,25.6h-204.8v-19.635 c12.442-4.352,44.851-14.498,76.8-14.498c74.334,0,124.809,16.461,125.312,16.631c2.568,0.853,5.436,0.427,7.68-1.178 c2.227-1.604,3.541-4.181,3.541-6.921V93.871c0-4.002-2.773-7.467-6.682-8.329c0,0-6.69-1.493-18.125-3.593 c-4.617-0.853-9.079,2.219-9.933,6.844c-0.853,4.642,2.21,9.088,6.844,9.941c4.361,0.802,8.013,1.51,10.829,2.074v357.188 c-19.337-5.069-62.276-14.259-119.467-14.259c-37.18,0-73.702,12.211-85.001,16.35c-10.044-4.437-40.405-16.35-77.133-16.35 c-58.778,0-107.196,9.694-128,14.618V100.475c17.041-4.19,67.371-15.138,128-15.138c31.113,0,57.796,9.685,68.267,14.063v335.804 c0,3.072,1.655,5.914,4.326,7.424c2.671,1.519,5.965,1.476,8.602-0.111c0.845-0.503,85.393-51.004,160.435-76.015 c3.49-1.169,5.837-4.42,5.837-8.098V8.537c0-2.799-1.374-5.419-3.678-7.014c-2.287-1.596-5.222-1.963-7.859-0.981 C346.856,26.15,277.771,69.141,277.079,69.568c-3.994,2.5-5.214,7.765-2.714,11.759c2.492,3.994,7.757,5.214,11.759,2.714 c0.631-0.401,60.732-37.794,123.477-63.027v331.281c-58.249,20.241-119.066,53.291-145.067,68.087V93.871 c0-3.234-1.826-6.187-4.719-7.637c-1.468-0.725-36.437-17.963-80.614-17.963c-77.107,0-136.388,16.683-138.88,17.399 c-3.661,1.041-6.187,4.395-6.187,8.201v375.467c0,2.671,1.263,5.197,3.388,6.81c1.502,1.135,3.311,1.724,5.146,1.724 c0.785,0,1.57-0.111,2.338-0.333c0.589-0.162,59.597-16.734,134.195-16.734c31.198,0,57.856,9.711,68.267,14.071v20.062h-204.8 c-14.114,0-25.6-11.486-25.6-25.6v-332.8c0-4.71-3.823-8.533-8.533-8.533s-8.533,3.823-8.533,8.533v332.8 c0,23.526,19.14,42.667,42.667,42.667h426.667c23.526,0,42.667-19.14,42.667-42.667v-332.8 C512.002,131.827,508.188,128.004,503.469,128.004z"/>
            <path d="M291.057,191.611c1.51,2.953,4.514,4.659,7.62,4.659c1.297,0,2.628-0.299,3.866-0.93 c0.503-0.256,50.731-25.771,75.503-33.596c4.489-1.425,6.98-6.221,5.555-10.709c-1.417-4.489-6.178-6.989-10.709-5.572 c-26.095,8.252-75.981,33.596-78.097,34.671C290.596,182.267,288.924,187.405,291.057,191.611z"/>
            <path d="M291.057,294.011c1.51,2.953,4.514,4.659,7.62,4.659c1.297,0,2.628-0.299,3.866-0.93 c0.503-0.256,50.731-25.771,75.503-33.596c4.489-1.425,6.98-6.221,5.555-10.709c-1.417-4.489-6.178-6.989-10.709-5.572 c-26.095,8.252-75.981,33.596-78.097,34.671C290.596,284.667,288.924,289.805,291.057,294.011z"/>
            <path d="M206.748,158.366c-52.693-12.365-112.572,3.388-115.089,4.062c-4.548,1.22-7.253,5.896-6.033,10.453 c1.024,3.814,4.471,6.323,8.235,6.323c0.734,0,1.476-0.094,2.219-0.29c0.572-0.162,58.223-15.326,106.778-3.934 c4.565,1.067,9.182-1.775,10.257-6.366C214.189,164.032,211.339,159.441,206.748,158.366z"/>
            <path d="M206.748,209.566c-52.693-12.356-112.572,3.388-115.089,4.062c-4.548,1.22-7.253,5.897-6.033,10.453 c1.024,3.814,4.471,6.323,8.235,6.323c0.734,0,1.476-0.094,2.219-0.29c0.572-0.162,58.223-15.326,106.778-3.934 c4.565,1.067,9.182-1.775,10.257-6.366C214.189,215.232,211.339,210.641,206.748,209.566z"/>
            <path d="M291.057,345.211c1.51,2.953,4.514,4.659,7.62,4.659c1.297,0,2.628-0.299,3.866-0.93 c0.503-0.256,50.731-25.771,75.503-33.596c4.489-1.425,6.98-6.221,5.555-10.709c-1.417-4.488-6.178-6.989-10.709-5.572 c-26.095,8.252-75.981,33.596-78.097,34.671C290.596,335.867,288.924,341.005,291.057,345.211z"/>
            <path d="M206.748,260.766c-52.693-12.356-112.572,3.379-115.089,4.062c-4.548,1.22-7.253,5.897-6.033,10.453 c1.024,3.814,4.471,6.332,8.235,6.332c0.734,0,1.476-0.102,2.219-0.299c0.572-0.162,58.223-15.326,106.778-3.934 c4.565,1.067,9.182-1.775,10.257-6.366C214.189,266.432,211.339,261.841,206.748,260.766z"/>
            <path d="M206.748,363.166c-52.693-12.365-112.572,3.388-115.089,4.062c-4.548,1.22-7.253,5.897-6.033,10.453 c1.024,3.814,4.471,6.332,8.235,6.332c0.734,0,1.476-0.102,2.219-0.299c0.572-0.162,58.223-15.326,106.778-3.934 c4.565,1.058,9.182-1.775,10.257-6.366C214.189,368.832,211.339,364.241,206.748,363.166z"/><path d="M206.748,311.966c-52.693-12.365-112.572,3.379-115.089,4.062c-4.548,1.22-7.253,5.897-6.033,10.453 c1.024,3.814,4.471,6.332,8.235,6.332c0.734,0,1.476-0.102,2.219-0.299c0.572-0.162,58.223-15.326,106.778-3.934 c4.565,1.067,9.182-1.775,10.257-6.366C214.189,317.632,211.339,313.041,206.748,311.966z"/></g>
          </svg>
        </div>
        <el-form-item inline label="学号" prop="account" class="form-item" style="flex-col">
          <el-input
            :disabled="accountLocked"
            v-model.number="userInfo.account"
            clearable
            prefix-icon="el-icon-edit"
            class="input">
          </el-input>
          <el-button class="toggle-button" @click="lockAccount()">
            <svg v-if="!isLover" class="icon" :class="accountLocked?'icon-locked':'icon-unlocked'" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M5 15 L5 30 27 30 27 15 Z M9 15 C9 9 9 5 16 5 23 5 23 9 23 15 M16 20 L16 23" /><circle cx="16" cy="24" r="1" />
            </svg>
            <svg v-else class="icon" :class="accountLocked?'heart-locked':'heart-unlocked'" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 369.486 369.486" xml:space="preserve"><g><path d="M184.743,357.351c-3.478,0-6.798-1.449-9.164-3.998l-147.67-159.16c-0.038-0.041-0.076-0.082-0.113-0.123 C9.871,174.223,0,147.921,0,120.008c0-27.914,9.871-54.215,27.796-74.061l2.244-2.484c18.246-20.201,42.608-31.327,68.599-31.327 s50.354,11.126,68.601,31.328l17.503,19.38l17.503-19.379c18.246-20.202,42.608-31.328,68.6-31.328s50.354,11.126,68.601,31.329 l2.241,2.478c17.928,19.851,27.799,46.152,27.799,74.065s-9.872,54.215-27.796,74.061c-0.037,0.043-0.075,0.084-0.113,0.125 l-147.671,159.16C191.541,355.901,188.221,357.351,184.743,357.351z M46.295,177.252l138.448,149.219l138.448-149.22 c28.485-31.603,28.467-82.97-0.055-114.549l-2.239-2.478c-13.449-14.891-31.224-23.09-50.051-23.09 c-18.828,0-36.603,8.199-50.048,23.085L194.02,89.869c-2.369,2.624-5.74,4.121-9.275,4.121s-6.906-1.497-9.276-4.121 l-26.779-29.648c-13.446-14.887-31.22-23.086-50.048-23.086S62.039,45.333,48.594,60.22l-2.244,2.484 C17.828,94.283,17.809,145.65,46.295,177.252z"/></g></svg>
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
            <svg v-if="!isLover" class="icon" :class="passwdLocked?'icon-locked':'icon-unlocked'" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M5 15 L5 30 27 30 27 15 Z M9 15 C9 9 9 5 16 5 23 5 23 9 23 15 M16 20 L16 23" />
              <circle cx="16" cy="24" r="1" />
            </svg>
            <svg v-else class="icon" :class="passwdLocked?'heart-locked':'heart-unlocked'" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 369.486 369.486" xml:space="preserve"><g><path d="M184.743,357.351c-3.478,0-6.798-1.449-9.164-3.998l-147.67-159.16c-0.038-0.041-0.076-0.082-0.113-0.123 C9.871,174.223,0,147.921,0,120.008c0-27.914,9.871-54.215,27.796-74.061l2.244-2.484c18.246-20.201,42.608-31.327,68.599-31.327 s50.354,11.126,68.601,31.328l17.503,19.38l17.503-19.379c18.246-20.202,42.608-31.328,68.6-31.328s50.354,11.126,68.601,31.329 l2.241,2.478c17.928,19.851,27.799,46.152,27.799,74.065s-9.872,54.215-27.796,74.061c-0.037,0.043-0.075,0.084-0.113,0.125 l-147.671,159.16C191.541,355.901,188.221,357.351,184.743,357.351z M46.295,177.252l138.448,149.219l138.448-149.22 c28.485-31.603,28.467-82.97-0.055-114.549l-2.239-2.478c-13.449-14.891-31.224-23.09-50.051-23.09 c-18.828,0-36.603,8.199-50.048,23.085L194.02,89.869c-2.369,2.624-5.74,4.121-9.275,4.121s-6.906-1.497-9.276-4.121 l-26.779-29.648c-13.446-14.887-31.22-23.086-50.048-23.086S62.039,45.333,48.594,60.22l-2.244,2.484 C17.828,94.283,17.809,145.65,46.295,177.252z"/></g></svg>
          </el-button>
        </el-form-item>
        <div class="form-item" v-if="!hasToken">
          <el-button type="primary" class="login-button" @click="login()">登录</el-button>
        </div>
      </div>
    </el-form>
    <settings-form v-if="!hasToken&&settingsVisible" @exit="settingsVisible=false"></settings-form>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import settingsForm from './Settings'
import libraryRestApi from '@/api/library.api'

export default {
  data () {
    return {
      userInfo: {
        account: '',
        passwd: ''
      },
      accountLocked: false,
      passwdLocked: false,
      serviceLocked: false,
      settingsVisible: false
    }
  },
  components: {
    settingsForm
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userPasswd',
      'hasToken',
      'userToken'
    ]),
    isLover () {
      return this.userInfo.account === 2017302590175
    }
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
    openSettings () {
      this.settingsVisible = !this.settingsVisible
    },
    showWarning (message) {
      this.$message({
        type: 'warning',
        duration: '2000',
        message
      })
    },
    lockAccount () {
      this.accountLocked = !this.accountLocked
      if (this.accountLocked) {
        this.$store.dispatch('setAccount', this.userInfo.account)
        if (this.hasToken) {
          this.login(this.userInfo.account, this.userInfo.passwd)
        }
      }
    },
    lockPasswd () {
      this.passwdLocked = !this.passwdLocked
      if (this.passwdLocked) {
        this.$store.dispatch('setPasswd', this.userInfo.passwd)
        if (this.hasToken) {
          this.login(this.userInfo.account, this.userInfo.passwd)
        }
      }
    },
    login () {
      if (this.userInfo.account === null || this.userInfo.account === '') {
        this.showWarning('学号不能为空')
        return
      }
      if (this.userInfo.passwd === null || this.userInfo.passwd === '') {
        this.showWarning('密码不能为空')
        return
      }
      libraryRestApi.Login(this.userInfo.account, this.userInfo.passwd).then((response) => {
        if (response.data.status === 'success') {
          this.loadRooms(response.data.data.token)
        } else {
          this.$store.dispatch('setToken', null)
          this.$message({
            type: 'error',
            duration: '2000',
            showClose: true,
            message: response.data.message
          })
        }
      }).catch(() => {})
    },
    // 载入房间信息 && 验证 token
    loadRooms (token) {
      libraryRestApi.FreeFilters(token).then((response) => {
        if (response.data.status === 'success') {
          this.$store.dispatch('saveLibraryInfo', response.data.data)
          this.$store.dispatch('setToken', token)
          if (this.isLover) {
            this.$message({
              iconClass: 'null',
              duration: 2000,
              dangerouslyUseHTMLString: true,
              message: '<div><svg style="width:16px;fill:#fd4e71;margin-right:6px;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 369.486 369.486" xml:space="preserve"><g><path d="M184.743,357.351c-3.478,0-6.798-1.449-9.164-3.998l-147.67-159.16c-0.038-0.041-0.076-0.082-0.113-0.123 C9.871,174.223,0,147.921,0,120.008c0-27.914,9.871-54.215,27.796-74.061l2.244-2.484c18.246-20.201,42.608-31.327,68.599-31.327 s50.354,11.126,68.601,31.328l17.503,19.38l17.503-19.379c18.246-20.202,42.608-31.328,68.6-31.328s50.354,11.126,68.601,31.329 l2.241,2.478c17.928,19.851,27.799,46.152,27.799,74.065s-9.872,54.215-27.796,74.061c-0.037,0.043-0.075,0.084-0.113,0.125 l-147.671,159.16C191.541,355.901,188.221,357.351,184.743,357.351z M46.295,177.252l138.448,149.219l138.448-149.22 c28.485-31.603,28.467-82.97-0.055-114.549l-2.239-2.478c-13.449-14.891-31.224-23.09-50.051-23.09 c-18.828,0-36.603,8.199-50.048,23.085L194.02,89.869c-2.369,2.624-5.74,4.121-9.275,4.121s-6.906-1.497-9.276-4.121 l-26.779-29.648c-13.446-14.887-31.22-23.086-50.048-23.086S62.039,45.333,48.594,60.22l-2.244,2.484 C17.828,94.283,17.809,145.65,46.295,177.252z"/></g></svg><span style="font-size: 16px;margin:0 0 4px 0;cursor:default">欢迎小仙女</span><svg style="width:16px;fill:#fd4e71;margin-left:6px;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 369.486 369.486" xml:space="preserve"><g><path d="M184.743,357.351c-3.478,0-6.798-1.449-9.164-3.998l-147.67-159.16c-0.038-0.041-0.076-0.082-0.113-0.123 C9.871,174.223,0,147.921,0,120.008c0-27.914,9.871-54.215,27.796-74.061l2.244-2.484c18.246-20.201,42.608-31.327,68.599-31.327 s50.354,11.126,68.601,31.328l17.503,19.38l17.503-19.379c18.246-20.202,42.608-31.328,68.6-31.328s50.354,11.126,68.601,31.329 l2.241,2.478c17.928,19.851,27.799,46.152,27.799,74.065s-9.872,54.215-27.796,74.061c-0.037,0.043-0.075,0.084-0.113,0.125 l-147.671,159.16C191.541,355.901,188.221,357.351,184.743,357.351z M46.295,177.252l138.448,149.219l138.448-149.22 c28.485-31.603,28.467-82.97-0.055-114.549l-2.239-2.478c-13.449-14.891-31.224-23.09-50.051-23.09 c-18.828,0-36.603,8.199-50.048,23.085L194.02,89.869c-2.369,2.624-5.74,4.121-9.275,4.121s-6.906-1.497-9.276-4.121 l-26.779-29.648c-13.446-14.887-31.22-23.086-50.048-23.086S62.039,45.333,48.594,60.22l-2.244,2.484 C17.828,94.283,17.809,145.65,46.295,177.252z"/></g></svg></div>',
              customClass: 'heart-message'
            })
          }
        } else {
          this.$store.dispatch('setToken', null)
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
.setting-icon {
  position: fixed;
  top: 20px;
  left: $layout-width - 50px;
  z-index: 11;
  padding: 0;
  fill: $text-color;
  background: transparent!important;
  border-color: transparent!important;
	transition: left 0.45s cubic-bezier(.55, 0, .1, 1);
  svg {
    fill: inherit;
    width: 30px;
    height: 30px;
    opacity: $button-blur-opacity;
    &:hover {
      opacity: $button-hover-opacity;
    }
    &:active {
      opacity: $button-click-opacity;
    }
  }
}
.setting-icon-back {
  left: 20px;
	transition: left 0.45s cubic-bezier(.55, 0, .1, 1);
}
.form-item {
  margin: 10px 5px;
  text-align: center;
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
    }
    .icon-unlocked {
      color: $text-color-lowlight;
    }
    .heart-locked {
      fill: $heart-color; 
    } 
    .heart-unlocked { 
      fill: $text-color-lowlight; 
    }
  }
  .login-button {
    margin: 20px 0 60px 0;
    width: 90px;
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
}
.logo {
  fill: $text-color-lowlight;
  width: 120px;
  height: 120px;
}
</style>
