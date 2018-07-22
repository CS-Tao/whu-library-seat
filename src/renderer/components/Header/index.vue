<template>
	<div class="header">
    <el-form
      :model="userInfo"
      status-icon
      ref="userInfo"
      label-width="50px"
      class="flex-row">
      <div style="margin:auto;">
        <el-form-item inline label="学号" prop="account" class="form-item">
          <el-input
            v-model.number="userInfo.account"
            clearable
            prefix-icon="el-icon-edit"
            class="input">
          </el-input>
          <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M5 15 L5 30 27 30 27 15 Z M9 15 C9 7 9 3 16 3 23 3 23 8 23 9 M16 20 L16 23" />
            <circle cx="16" cy="24" r="1" />
          </svg>
        </el-form-item>
        <el-form-item label="密码" prop="passwd" class="form-item">
          <el-input type="password"
            v-model="userInfo.passwd"
            auto-complete="off"
            clearable
            prefix-icon="el-icon-edit"
            class="input">
          </el-input>
          <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M5 15 L5 30 27 30 27 15 Z M9 15 C9 9 9 5 16 5 23 5 23 9 23 15 M16 20 L16 23" />
            <circle cx="16" cy="24" r="1" />
          </svg>
        </el-form-item>
      </div>
    </el-form>
	</div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        account: '',
        passwd: ''
      }
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
}
svg {
  display: none;
  cursor: pointer;
  width: 20px;
  stroke: $second-color;
}
</style>
