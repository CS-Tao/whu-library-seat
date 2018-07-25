<template>
  <div class="main">
    <main-header></main-header>
    <transition name="el-fade-in-linear">
      <main-body v-if="hasToken" :showMode="bodyMode"></main-body>
    </transition>
    <main-footer :bodyMode="bodyMode" @iconClicked="footerIconClicked($event)"></main-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MainHeader from '@/components/Header'
import MainFooter from '@/components/Footer'
import MainBody from '@/components/Body'

export default {
  data () {
    return {
      bodyMode: 'normal'
    }
  },
  components: {
    MainHeader, MainBody, MainFooter
  },
  computed: {
    ...mapGetters([
      'hasToken'
    ])
  },
  methods: {
    footerIconClicked (param) {
      if (param === 'user') {
        this.bodyMode = 'userForm'
      } else if (param === 'history') {
        this.bodyMode = 'historyForm'
      } else if (param === 'normal') {
        this.bodyMode = 'normal'
      } else {
        console.log('参数错误')
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/index.scss';
</style>
