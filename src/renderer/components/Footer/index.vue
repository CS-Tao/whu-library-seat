<template>
	<div class="footer" :class="{'footer-unlogin': !hasToken}">
    <div class="warper flex-col" @click="openMainBody()">
      <span class="text">&nbsp; © 2018 CS-Tao</span>
      <i v-if="!hasToken" class="operation-icon" @click="openSource()">
        <svg class="operation-icon" aria-labelledby="simpleicons-github-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-github-icon">GitHub icon</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      </i>
      <i v-if="hasToken" class="toggle-button" @click.stop="openUserForm()">
        <svg v-if="!isLover" class="icon" :class="isLover?(userBtnChecked?'icon-checked-red':'icon-uncheckedred'):(userBtnChecked?'icon-checked':'icon-unchecked')" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 350 350" style="enable-background:new 0 0 350 350;" xml:space="preserve"><g><path d="M175,171.173c38.914,0,70.463-38.318,70.463-85.586C245.463,38.318,235.105,0,175,0s-70.465,38.318-70.465,85.587 C104.535,132.855,136.084,171.173,175,171.173z"/><path d="M41.909,301.853C41.897,298.971,41.885,301.041,41.909,301.853L41.909,301.853z"/><path d="M308.085,304.104C308.123,303.315,308.098,298.63,308.085,304.104L308.085,304.104z"/><path d="M307.935,298.397c-1.305-82.342-12.059-105.805-94.352-120.657c0,0-11.584,14.761-38.584,14.761 s-38.586-14.761-38.586-14.761c-81.395,14.69-92.803,37.805-94.303,117.982c-0.123,6.547-0.18,6.891-0.202,6.131 c0.005,1.424,0.011,4.058,0.011,8.651c0,0,19.592,39.496,133.08,39.496c113.486,0,133.08-39.496,133.08-39.496 c0-2.951,0.002-5.003,0.005-6.399C308.062,304.575,308.018,303.664,307.935,298.397z"/></g></svg>
        <svg v-else class="icon" :class="isLover?(userBtnChecked?'icon-checked-red':'icon-unchecked-red'):(userBtnChecked?'icon-checked':'icon-unchecked')" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M833.8 939.5H892s-7.7-160.9-95-190c-97.5-32.5-190-45.4-190-76v-57s52.2 23.3 110.4-5.8C819.8 559.5 835 578.5 835 578.5s-88.5-50.5-88.5-142.4 32.7-169.3-25.5-256.6c-58.2-87.3-176-95-209-95-25.2 0-150.8 7.7-209 95-64.2 96.3-22.1 164.7-22.1 256.6 0 91.9-91.9 142.4-91.9 142.4s29.1-13.8 121 32.2c58.2 29.1 107 5.8 107 5.8v57c0 30.6-92 45.4-190 76-98.1 30.6-95 190-95 190h701.8z"></path></svg>
      </i>
      <span style="cursor: default!important;" v-if="hasToken">&nbsp;&nbsp;</span>
      <i v-if="hasToken" class="toggle-button" @click.stop="openHistoryForm()">
        <svg class="icon" :class="isLover?(historyBtnChecked?'icon-checked-red':'icon-unchecked-red'):(historyBtnChecked?'icon-checked':'icon-unchecked')" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve"><g><path d="M304.427,147.399H275.38v-29.046c0-10.706-8.68-19.386-19.386-19.386c-10.706,0-19.386,8.68-19.386,19.386V147.4h-29.047 c-10.706,0-19.386,8.68-19.386,19.386s8.68,19.386,19.386,19.386h29.047v29.046c0,10.706,8.68,19.386,19.386,19.386 c10.706,0,19.386-8.68,19.386-19.386v-29.046h29.047c10.706,0,19.386-8.68,19.386-19.386 C323.813,156.079,315.135,147.399,304.427,147.399z"/><path d="M446.704,19.386C446.704,8.68,438.024,0,427.318,0H84.672C73.966,0,65.286,8.68,65.286,19.386 c0,19.634-0.004,395.991-0.004,415.78c0,10.706,8.68,19.386,19.386,19.386h56.06v38.045c0,17.236,20.909,25.888,33.091,13.71 l33.746-33.736l33.735,33.733c12.109,12.114,33.094,3.665,33.094-13.707v-38.045h152.938c10.706,0,19.386-8.68,19.386-19.386 C446.72,423.13,446.704,234.426,446.704,19.386z M104.059,38.773h303.873v256.026H104.059V38.773z M235.623,445.793 l-14.346-14.345c-7.568-7.571-19.842-7.571-27.413-0.003l-14.363,14.357c0-22.535,0-29.22,0-51.734h56.122 C235.623,416.595,235.623,423.285,235.623,445.793z M407.947,415.78H274.395v-21.714h94.993c10.706,0,19.386-8.68,19.386-19.386 c0-10.706-8.68-19.386-19.386-19.386H142.614c-10.706,0-19.386,8.68-19.386,19.386c0,10.071,7.68,18.342,17.501,19.291v21.81 h-36.674v-82.207h303.892V415.78z"/></g></svg>
      </i>
      <span style="cursor: default!important;" v-if="hasToken">&nbsp;&nbsp;&nbsp;</span>
      <i v-if="hasToken" class="operation-icon" @click.stop="logout()">
        <svg version="1.1" class="operation-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><path d="M330.667,384h-21.333c-5.891,0-10.667,4.776-10.667,10.667v74.667h-256V42.667h256v74.667 c0,5.891,4.776,10.667,10.667,10.667h21.333c5.891,0,10.667-4.776,10.667-10.667V42.667C341.333,19.103,322.231,0,298.667,0h-256 C19.103,0,0,19.103,0,42.667v426.667C0,492.898,19.103,512,42.667,512h256c23.564,0,42.667-19.102,42.667-42.667v-74.667 C341.333,388.776,336.558,384,330.667,384z"/><path d="M508.542,248.135l-128-117.333c-3.125-2.844-7.656-3.625-11.5-1.896c-3.875,1.698-6.375,5.531-6.375,9.76V160 c0,3.021,1.281,5.906,3.531,7.927l74.151,66.74H138.667c-5.896,0-10.667,4.771-10.667,10.667v21.333 c0,5.896,4.771,10.667,10.667,10.667h301.682l-74.151,66.74c-2.25,2.021-3.531,4.906-3.531,7.927v21.333 c0,4.229,2.5,8.063,6.375,9.76c1.375,0.615,2.844,0.906,4.292,0.906c2.615,0,5.198-0.969,7.208-2.802l128-117.333 C510.75,261.844,512,258.99,512,256S510.75,250.156,508.542,248.135z"/></g></svg>
      </i>
      <span style="cursor: default!important;" v-if="!hasToken">&nbsp;&nbsp;</span>
      <i v-if="!hasToken" class="exit-button" @click.stop="exitApp()">
        <svg version="1.1" class="exit-button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1024 1024"><path d="M781.194185 160.84995c31.350391 22.292411 59.220235 47.543694 83.600362 75.756906 24.380128 28.213212 45.279709 58.691428 62.700781 91.432611 17.414959 32.742202 30.649391 67.400945 39.70737 103.975212 9.051866 36.570191 13.581875 73.670208 13.581875 111.289862 0 64.787479-12.366333 125.571718-37.093904 182.344566-24.733684 56.773867-58.17281 106.241235-100.320435 148.383765-42.14253 42.148643-91.607861 75.590826-148.382746 100.319416-56.77998 24.733684-117.557087 37.098998-182.346604 37.098998-64.092592 0-124.52735-12.366333-181.302236-37.098998-56.77998-24.727571-106.411391-58.170772-148.907478-100.319416-42.496087-42.14253-75.935213-91.609898-100.319416-148.383765-24.385222-56.772848-36.576305-117.557087-36.576305-182.344566 0-36.923748 4.352721-73.146496 13.062238-108.676395 8.705442-35.531937 21.071774-69.317487 37.094922-101.363783 16.022129-32.046296 35.878361-61.999781 59.563602-89.864531 23.683203-27.870863 50.156142-52.944858 79.418816-75.237269 15.326224-11.145696 31.870027-15.327243 49.638543-12.542602 17.763421 2.788717 32.216452 11.493139 43.362148 26.124476 11.146715 14.631337 15.327243 31.001928 12.544639 49.112793-2.790754 18.110865-11.500272 32.742202-26.125495 43.888917-43.887898 32.045277-77.503293 71.404185-100.839052 118.081818-23.340854 46.676614-35.006187 96.833775-35.006187 150.471482 0 45.980709 8.705442 89.343875 26.124476 130.100707 17.414959 40.751738 41.276469 76.281637 71.577397 106.588679 30.306023 30.306023 65.836941 54.337688 106.58766 72.100091 40.756832 17.763421 84.119999 26.645132 130.101726 26.645132 45.976633 0.004076 89.3398-8.876616 130.095613-26.645132 40.750719-17.768516 76.281637-41.800181 106.58766-72.100091 30.301947-30.307042 54.338707-65.831846 72.102128-106.588679 17.763421-40.755813 26.644113-84.124074 26.644113-130.100707 0-54.338707-12.537507-105.710391-37.618635-154.127278-25.076033-48.416887-60.259508-88.301545-105.539217-119.651936-15.326224-10.449791-24.556396-24.733684-27.693575-42.844549-3.137179-18.110865 0.524731-34.829918 10.974522-50.156142 10.444696-14.631337 24.727571-23.514067 42.839454-26.650226 18.11494-3.131065 34.835013 0.524731 50.161236 10.974522L781.194185 160.84995zM512.639866 546.442738c-18.110865 0-33.614376-6.446551-46.501364-19.33252-12.891064-12.891064-19.330482-28.389481-19.330482-46.501364L446.80802 83.517832c0-18.110865 6.440437-33.78555 19.330482-47.018963 12.886988-13.239526 28.389481-19.857251 46.501364-19.857251 18.807789 0 34.658744 6.617725 47.545732 19.857251 12.891064 13.233413 19.330482 28.908098 19.330482 47.018963l0 397.091022c0 18.110865-6.440437 33.6103-19.330482 46.501364C547.29861 539.996187 531.45275 546.442738 512.639866 546.442738L512.639866 546.442738zM512.639866 546.442738"></path></svg>
      </i>
      <!-- <el-button v-if="!hasToken" type="primary" class="exit-button" @click="exitApp()">退出</el-button> -->
      <span style="cursor: default!important;">&nbsp;&nbsp;</span>
    </div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ipcRenderer } from 'electron'

export default {
  props: {
    bodyMode: {
      type: String,
      require: true
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'hasToken'
    ]),
    userBtnChecked () {
      return this.bodyMode === 'userForm'
    },
    historyBtnChecked () {
      return this.bodyMode === 'historyForm'
    },
    isLover () {
      return this.userAccount === 2017302590175
    }
  },
  methods: {
    openSource () {
      this.$openLink('https://github.com/CS-Tao/whu-library-seat')
    },
    logout () {
      this.$emit('iconClicked', 'normal')
      this.$store.dispatch('setToken', null)
    },
    openUserForm () {
      this.$emit('iconClicked', this.bodyMode !== 'userForm' ? 'user' : 'normal')
    },
    openHistoryForm () {
      this.$emit('iconClicked', this.bodyMode !== 'historyForm' ? 'history' : 'normal')
    },
    openMainBody () {
      this.$emit('iconClicked', 'normal')
    },
    exitApp () {
      ipcRenderer.sendSync('exit-app', 0)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.warper {
  .toggle-button {
    padding: 0;
    float: right;
    margin: auto;
    background: transparent!important;
    border-color: transparent!important;
    svg {
      fill: inherit;
    }
    .icon {
      float: right;
      margin: auto;
      cursor: pointer;
      width: 25px;
      height: 25px;
    }
    .icon-checked {
      fill: $button-blue;
    }
    .icon-unchecked {
      fill: $text-color-lowlight;
    }
    .icon-checked-red { 
      fill: $heart-color; 
    } 
    .icon-unchecked-red { 
      fill: $text-color-lowlight; 
    }
  }
  .exit-button {
    fill: $exit-button-background-blur;
    float: right;
    margin: auto;
    cursor: pointer;
    width: 25px;
    background: transparent;
    &:hover {
      fill: $exit-button-background-hover;
    }
    &:active {
      fill: $exit-button-background-click;
    }
  }
  .text {
    color: $second-color;
    margin: auto;
    flex: 10;
    font-size: $text-size-normal;
    cursor: default!important;
  }
  svg {
    fill: inherit;
  }
  .operation-icon {
    fill: $text-color;
    float: right;
    margin: auto;
    cursor: pointer;
    width: 25px;
    opacity: $button-blur-opacity;
    &:hover {
      opacity: $button-hover-opacity;
    }
    &:active {
      opacity: $button-click-opacity;
    }
  }
}
</style>
