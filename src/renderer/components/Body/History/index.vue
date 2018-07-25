<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'
import libraryRestApi from '@/api/library.api'

export default {
  data () {
    return {
      reservations: []
    }
  },
  computed: {
    ...mapGetters([
      'hasToken',
      'userToken'
    ])
  },
  mounted () {
    libraryRestApi.History(1, 10, this.userToken).then((response) => {
      if (response.data.status === 'success') {
        this.reservations = response.data.data.reservations
        console.log(JSON.stringify(this.reservations))
      } else {
        this.$store.dispatch('setToken', '0')
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
</script>
