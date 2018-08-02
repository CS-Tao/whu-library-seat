<template>
  <div class="flex-row">
    <div class="warp">
      <el-table class="table" height="320" :data="reservations" border>
        <el-table-column label="场馆">
          <template slot-scope="scope">
            <span style="display:block;">{{ scope.row.loc }}</span>
            <span style="font-size:10px;font-family:'Times New Roman'!important;">{{ scope.row.date }}&nbsp;&nbsp;&nbsp;&nbsp;{{ scope.row.begin }} 到 {{ scope.row.end }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stat" label="状态" width="100">
          <template slot-scope="scope">
            <el-button v-if="scope.row.stat === 'RESERVE'" type="primary" class="cancel-button" @click="cancelReserve(scope.$index)">取消预约</el-button>
            <el-tag v-else-if="scope.row.stat === 'CANCEL'" class="tag" type="warning">已取消</el-tag>
            <el-tag v-else-if="scope.row.stat === 'COMPLETE'" class="tag" type="success">已履约</el-tag>
            <el-tag v-else-if="scope.row.stat === 'STOP'" class="tag">结束使用</el-tag>
            <el-tag v-else-if="scope.row.stat === 'MISS'" class="tag" type="danger">失约</el-tag>
            <el-tag v-else-if="scope.row.stat === 'INCOMPLETE'" class="tag" type="danger">早退</el-tag>
            <el-tag v-else-if="scope.row.stat === 'CHECK_IN'" class="tag" type="success">已签到</el-tag>
            <el-tag v-else-if="scope.row.stat === 'AWAY'" class="tag">暂离</el-tag>
            <el-tag v-else type="info">未知状态</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
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
    this.initList()
  },
  methods: {
    initList () {
      libraryRestApi.History(1, 50, this.userToken).then((response) => {
        if (response.data.status === 'success') {
          this.reservations = response.data.data.reservations
        } else {
          this.$message({
            type: 'error',
            duration: '5000',
            showClose: true,
            message: response.data.message
          })
        }
      }).catch(() => {})
    },
    cancelReserve (index) {
      if (!this.reservations[index].id) {
        this.$message({
          type: 'warning',
          duration: '1500',
          showClose: true,
          message: '当前无预约'
        })
        this.initList()
        return
      }
      let reserveId = this.reservations[index].id
      libraryRestApi.Cancel(reserveId, this.userToken).then((response) => {
        if (response.data.status === 'success') {
          this.$message({
            type: 'success',
            duration: '1000',
            message: '预约已取消'
          })
          this.initList()
        } else {
          this.$message({
            type: 'error',
            duration: '5000',
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
$warp-width: 300px;
$warp-height: 320px;
$warp-padding: 10px;
.warp {
  cursor: default!important;
  width: $warp-width;
  height: $warp-height;
  margin: $layout-header-h ($layout-width - $warp-width)/2 - $warp-padding $layout-footer-h ($layout-width - $warp-width)/2 - $warp-padding;
  padding: $warp-padding;
  border: 1px solid $text-color;
  border-radius: 4px;
  .table {
    height: 100%;
    .cancel-button {
      width: 80px;
      color: $text-color-highlight;
      background: $cancel-button-background-blur!important;
      border-color: $cancel-button-border!important;
      &:hover {
        background: $cancel-button-background-hover!important;
      }
      &:active {
        background: $cancel-button-background-click!important;
      }
    }
    .tag {
      width: 80px;
      text-align: center;
    }
  }
}
</style>
