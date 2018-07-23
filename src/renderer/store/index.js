import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  getters,
  strict: process.env.NODE_ENV !== 'production'
})
