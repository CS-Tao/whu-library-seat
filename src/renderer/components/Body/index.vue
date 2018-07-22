<template>
	<div class="body">
    <el-form :model="form" ref="seatForm" label-width="50px" class="flex-row">
      <div style="margin:auto;text-align:center;">
        <el-form-item prop="date" label="日期">
          <el-date-picker type="date" placeholder="请选择日期" v-model="form.date" class="input"></el-date-picker>
        </el-form-item>
        <el-form-item label="场馆">
          <el-select v-model="form.library" placeholder="请选择场馆" class="input">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间">
          <el-select v-model="form.room" placeholder="请选择房间" class="input">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="date" label="开始">
          <el-time-picker type="fixed-time" placeholder="请选择开始时间" v-model="form.beginTime" class="input"></el-time-picker>
        </el-form-item>
        <el-form-item prop="date" label="结束">
          <el-time-picker type="fixed-time" placeholder="请选择结束时间" v-model="form.endTime" class="input"></el-time-picker>
        </el-form-item>
        <el-form-item prop="seatNum" label="座位">
          <el-input-number class="num" v-model="form.seatNum" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="main-button">定时抢座</el-button>
        </el-form-item>
      </div>
    </el-form>
	</div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        date: '',
        library: '',
        room: '',
        beginTime: '',
        endTime: '',
        seatNum: 1,
        changer: false,
        sun: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.input {
  width: 250px!important;
  margin: 0 5px;
}
.num {
  background: transparent;
}
.main-button {
  margin: 15px;
  width: 100px;
  color: $text-color-highlight;
  background: $primary-button-background!important;
  border-color: $primary-color!important;
  opacity: $button-blur-opacity;
}
</style>
