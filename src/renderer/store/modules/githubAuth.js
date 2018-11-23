const githubAuth = {
  state: {
    authInfo: {
      githubLoginName: 'GIS-Hacker',
      githubLoginId: 'MDQ6VXNlcjMxNzUwODQx',
      githubAuthToken: '',
      haveStaredRepo: true,
      formVisible: true
    }
  },
  mutations: {
    TRGGER_AUTH_FORM: (state, visible) => {
      state.authInfo.formVisible = visible
    }
  },
  actions: {
  }
}

export default githubAuth
