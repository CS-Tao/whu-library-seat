import Vue from 'vue'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'
import store from './store'

import './mock'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

Vue.openLink = (url) => {
  try {
    if (process.env.BUILD_TARGET !== 'web') { require('electron').shell.openExternal(url) }
  } catch (e) {
    // for web (process is not defined)
    window.open(url)
  }
}

Vue.prototype.$openLink = Vue.openLink

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
