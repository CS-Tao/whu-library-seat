<template>
  <div class="warp">
    
  </div>
</template>

<script>
export default {
  name: 'block-form',
  props: {
    message: {
      type: String,
      default: '本软件已不再提供使用权，感谢您的使用'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.warp {
  width: 100%;
  height: 100%;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-align-items: stretch;
  align-items: stretch;
  justify-content: center;
}
</style>

