<template>
  <div v-if="!lockInfo.locked" class="main">
    <main-header></main-header>
    <transition name="el-fade-in-linear">
      <main-body v-if="hasToken" :showMode="bodyMode"></main-body>
    </transition>
    <main-footer :bodyMode="bodyMode" @iconClicked="footerIconClicked($event)"></main-footer>
  </div>
  <block-form v-else :message="lockInfo.message" :time="lockInfo.time"></block-form>
</template>

<script>
import { mapGetters } from 'vuex'
import MainHeader from './Header'
import MainFooter from './Footer'
import MainBody from './Body'
import BlockForm from './Utils/blockForm'

export default {
  data () {
    return {
      bodyMode: 'normal'
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
      'announceViewed',
      'lockInfo'
    ])
  },
  mounted () {
    this.$store.dispatch('checkIfLocked')
    this.$store.dispatch('checkIfAuthed')
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
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/index.scss';
</style>
