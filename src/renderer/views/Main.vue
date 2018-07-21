<template>
  <div class="main">
    <main-header></main-header>
    <main-body></main-body>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainHeader from '@/components/Header'
import MainFooter from '@/components/Footer'
import MainBody from '@/components/Body'
export default {
  components: {
    MainHeader, MainBody, MainFooter
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
@import '@/styles/index.scss';
</style>
