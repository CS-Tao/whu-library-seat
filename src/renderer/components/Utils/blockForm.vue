<template>
  <div class="block-form">
    <div class="wrap">
      <div class="title">
        <span @click="$openLink('https://github.com/CS-Tao/whu-library-seat')">4</span>
        <span @click="$openLink('https://home.cs-tao.cc/whu-library-seat/')">0</span>
        <span @click="$openLink('https://github.com/CS-Tao/whu-library-seat-mobile')">4</span>
      </div>
      <div class="message">
        {{message}}
      </div>
      <div class="time">
        {{time}}
      </div>
        <el-button
          class="primary-button"
          @click="$openLink('https://gitter.im/whu-library-seat/Lobby')">
          打开 Gitter 聊天室
        </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'block-form',
  props: {
    message: {
      type: String,
      default: '本软件已不再提供使用权，感谢您的使用'
    },
    time: {
      type: String,
      default: '禁用时间另行通知'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.block-form {
  width: 100vw;
  height: 100vh;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-align-items: stretch;
  align-items: stretch;
  justify-content: center;
  text-align: center;
  background-color: $bg-color-2;
  .wrap {
    margin: auto;
    span {
      cursor: pointer;
      font-size: 150px;
      color: $text-color-highlight;
      font-weight: bold;
      letter-spacing: letter-spacing;
      text-shadow: 0px 0px 2px #686868,
        0px 1px 1px #ddd, 0px 2px 1px #d6d6d6,
        0px 3px 1px #ccc, 0px 4px 1px #c5c5c5,
        0px 5px 1px #c1c1c1, 0px 6px 1px #bbb,
        0px 7px 1px #777,
        0px 8px 3px rgba(100, 100, 100, 0.4),
        0px 9px 5px rgba(100, 100, 100, 0.1),
        0px 10px 7px rgba(100, 100, 100, 0.15),
        0px 11px 9px rgba(100, 100, 100, 0.2),
        0px 12px 11px rgba(100, 100, 100, 0.25),
        0px 13px 15px rgba(100, 100, 100, 0.3);
      transition: all .1s linear;
      &:hover {
        text-shadow: 0px 0px 2px #686868,
          0px 1px 1px #fff,
          0px 2px 1px #fff,
          0px 3px 1px #fff,
          0px 4px 1px #fff,
          0px 5px 1px #fff,
          0px 6px 1px #fff,
          0px 7px 1px #777,
          0px 8px 3px #fff,
          0px 9px 5px #fff,
          0px 10px 7px #fff,
          0px 11px 9px #fff,
          0px 12px 11px #fff,
          0px 13px 15px #fff;
        transition: all .1s linear;
      }
    }
    .message {
      cursor: default;
      font-size: $text-size-normal;
      font-weight: bold;
      color: $button-green;
    }
    .time {
      cursor: default;
      margin-top: 10px;
      font-size: $text-size-normal;
      font-weight: bold;
      color: $button-red;
    }
    .primary-button {
      color: $text-color;
      background: $primary-button-background-blur!important;
      border-color: $primary-color!important;
      margin-top: 20px;
      margin-bottom: 25%;
      &:hover {
        background: $primary-button-background-hover!important;
      }
      &:active {
        background: $primary-button-background-click!important;
      }
    }
  }
}
</style>

