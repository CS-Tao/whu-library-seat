import axios from 'axios'

var service = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 10000,
  withCredentials: true
})

export default {
  // GitHub 授权
  login: () => {
    const authToken = ''
    return service({
      url: '/',
      method: 'post',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
  },
  // GitHub 授权
  checkStared: () => {
    const authToken = ''
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
  starRepo: () => {
    const authToken = ''
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
