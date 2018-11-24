import axios from 'axios'

var service = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 10000,
  withCredentials: true
})

export default {
  // GitHub 登录
  loginGithub: () => {
    return service({
      url: '/',
      method: 'post'
    })
  },
  getUserInfo: (token) => {
    return service({
      url: '/user',
      method: 'get',
      headers: {
        Authorization: `token ${token}`
      }
    })
  },
  // 检查是否点星
  checkStared: (authToken) => {
    const query = `query {
      viewer { id login }
      repository(owner:"CS-Tao", name:"whu-library-seat") {
        id
        stargazers (first: 100) {
          nodes {
            id
            login
          }
        }
      }
    }`
    return service({
      url: '/graphql',
      method: 'post',
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      data: JSON.stringify({query})
    })
  },
  // 点星
  starRepo: (authToken) => {
    const query = `mutation {
      addStar (input: {starrableId: "MDEwOlJlcG9zaXRvcnkxNDE3NzU1ODY="}) {
        starrable {
          id
          viewerHasStarred
        }
      }
    }`
    return service({
      url: '/graphql',
      method: 'post',
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      data: JSON.stringify({query})
    })
  }
}
