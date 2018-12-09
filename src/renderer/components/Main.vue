<template>
  <div v-if="!locked" class="main">
    <main-header></main-header>
    <transition name="el-fade-in-linear">
      <main-body v-if="hasToken" :showMode="bodyMode"></main-body>
    </transition>
    <main-footer :bodyMode="bodyMode" @iconClicked="footerIconClicked($event)"></main-footer>
  </div>
  <block-form v-else :message="lockedMessage"></block-form>
</template>

<script>
import { mapGetters } from 'vuex'
import MainHeader from './Header'
import MainFooter from './Footer'
import MainBody from './Body'
import BlockForm from './Utils/blockForm'
import gitcontentsApi from '@/api/gitcontents.api'

export default {
  data () {
    return {
      bodyMode: 'normal',
      locked: false,
      lockedMessage: '本软件已不再提供使用权，感谢您的使用'
    }
  },
  components: {
    MainHeader,
    MainBody,
    MainFooter,
    BlockForm
  },
  computed: {
    ...mapGetters([
      'hasToken',
      'announceViewed'
    ])
  },
  beforeMount () {
    this.$store.dispatch('checkIfAuthed')
  },
  mounted () {
    this.checkIfLocked()
  },
  methods: {
    footerIconClicked (param) {
      if (param === 'user') {
        this.bodyMode = 'userForm'
      } else if (param === 'history') {
        this.bodyMode = 'historyForm'
      } else if (param === 'normal') {
        this.bodyMode = 'normal'
      } else if (param === 'announce') {
        this.bodyMode = 'announce'
      } else {
        this.bodyMode = 'normal'
        console.log('bodyMode', '参数错误')
      }
    },
    checkIfLocked () {
      return new Promise((resolve, reject) => {
        gitcontentsApi.ban()
          .then((response) => {
            if (response.status === 200) {
              if (response.data.data !== 'normal') {
                this.locked = true
                this.lockedMessage = response.data.message
                  ? response.data.message
                  : this.lockedMessage
              }
            } else {
              console.error('CheckIfLocked Status Code', response.status)
            }
            resolve()
          })
          .catch((error) => {
            console.error('CheckIfLocked Error', error.message)
            resolve()
          })
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/index.scss';
</style>
