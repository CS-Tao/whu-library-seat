import Store from 'electron-store'
import { Message } from 'element-ui'
import githubApi from '@/api/github.api'

const store = new Store({
  name: 'whu-library-seat'
})

const githubAuth = {
  state: {
    authInfo: {
      useListForAuth: store.get('authInfo_useListForAuth', false),
      githubLogined: store.get('authInfo_githubLogined', false),
      githubLoginId: store.get('authInfo_githubLoginId', null),
      githubLoginName: store.get('authInfo_githubLoginName', null),
      githubAuthToken: store.get('authInfo_githubAuthToken', null),
      githubUserInfo: store.get('authInfo_githubUserInfo', null),
      haveStaredRepo: store.get('authInfo_haveStaredRepo', false)
    },
    formVisible: false
  },
  mutations: {
    TRIGGER_AUTH_FORM: (state, visible) => {
      if (visible === undefined) {
        state.formVisible = !state.formVisible
      } else {
        state.formVisible = visible
      }
    },
    RESTORE_AUTH: (state) => {
      state.authInfo.useListForAuth = false
      state.authInfo.githubLogined = false
      state.authInfo.githubLoginId = null
      state.authInfo.githubLoginName = null
      state.authInfo.githubAuthToken = null
      state.authInfo.githubUserInfo = null
      state.authInfo.haveStaredRepo = false
      store.set('authInfo_useListForAuth', false)
      store.set('authInfo_githubLogined', false)
      store.set('authInfo_githubLoginId', null)
      store.set('authInfo_githubLoginName', null)
      store.set('authInfo_githubAuthToken', null)
      store.set('authInfo_githubUserInfo', null)
      store.set('authInfo_haveStaredRepo', false)
    },
    USE_LIST_FOR_AUTH: (state) => {
      state.authInfo.useListForAuth = true
      state.authInfo.githubLogined = false
      state.authInfo.githubLoginId = null
      state.authInfo.githubLoginName = null
      state.authInfo.githubAuthToken = null
      state.authInfo.githubUserInfo = null
      state.authInfo.haveStaredRepo = false
      store.set('authInfo_useListForAuth', true)
      store.set('authInfo_githubLogined', false)
      store.set('authInfo_githubLoginId', null)
      store.set('authInfo_githubLoginName', null)
      store.set('authInfo_githubAuthToken', null)
      store.set('authInfo_githubUserInfo', null)
      store.set('authInfo_haveStaredRepo', false)
    },
    SAVE_AUTH_TOKEN: (state, token) => {
      state.authInfo.githubAuthToken = token
      store.set('authInfo_githubAuthToken', token)
    },
    SAVE_GITHUB_LOGIN_NAME: (state, name) => {
      state.authInfo.githubLoginName = name
      store.set('authInfo_githubLoginName', name)
    },
    SAVE_GITHUB_USER_INFO: (state, info) => {
      state.authInfo.githubUserInfo = info
      store.set('authInfo_githubUserInfo', info)
    },
    TRIGGER_STAERD: (state, stared) => {
      state.authInfo.haveStaredRepo = stared
      store.set('authInfo_haveStaredRepo', stared)
      if (stared) {
        state.authInfo.useListForAuth = false
        store.set('authInfo_useListForAuth', false)
      }
    }
  },
  actions: {
    checkIfAuthed ({ commit, dispatch, state }) {
      console.log('state.authInfo.useListForAuth', state.authInfo.useListForAuth)
      console.log('state.authInfo.githubAuthToken', state.authInfo.githubAuthToken)
      console.log('state.authInfo.haveStaredRepo', state.authInfo.haveStaredRepo)
      if (!state.authInfo.useListForAuth &&
        (!state.authInfo.githubAuthToken ||
        !state.authInfo.haveStaredRepo)
      ) {
        commit('RESTORE_AUTH')
      } else if (!state.authInfo.useListForAuth) {
        dispatch('updateUserInfo', state.authInfo.githubAuthToken)
      }
    },
    saveAuthToken ({ commit, dispatch, state }, token) {
      return new Promise((resolve, reject) => {
        commit('SAVE_AUTH_TOKEN', token)
        dispatch('updateUserInfo', token)
        resolve(token)
      })
    },
    updateUserInfo ({ commit, state }, token) {
      // get user info
      githubApi.getUserInfo(token).then((response) => {
        if (response.status === 200) {
          commit('SAVE_GITHUB_USER_INFO', response.data)
        } else {
          commit('SAVE_GITHUB_USER_INFO', null)
          Message({
            message: `获取 ${state.authInfo.githubLoginName} 用户信息失败`,
            type: 'error',
            duration: 3000,
            showClose: true
          })
        }
      }).catch(() => {
        commit('SAVE_GITHUB_USER_INFO', null)
        Message({
          message: `获取 ${state.authInfo.githubLoginName} 用户信息失败`,
          type: 'error',
          duration: 3000,
          showClose: true
        })
      })
    }
  }
}

export default githubAuth
