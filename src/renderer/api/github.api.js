import axios from 'axios'
import urls from './urls'

var service = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 10000,
  withCredentials: true
})

export default {
  // 得到 GitHub 用户信息
  getUserInfo: (token) => {
    return service({
      url: urls.githubApi.getUserInfo.url(),
      method: urls.githubApi.getUserInfo.method,
      headers: {
        Authorization: `token ${token}`
      }
    })
  },
  // 检查是否点星
  checkStared: (authToken) => {
    const repoName = 'whu-library-seat'
    const maxUserCount = 100
    const query = `query {
      viewer { id login }
      repository(owner:"CS-Tao", name:"${repoName}") {
        id
        stargazers (first: ${maxUserCount}) {
          nodes {
            id
            login
          }
        }
      }
    }`
    return service({
      url: urls.githubApi.checkStared.url(),
      method: urls.githubApi.checkStared.method,
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      data: JSON.stringify({query})
    })
  }
  // 点星，弃用
  // starRepo: (authToken) => {
  //   const query = `mutation {
  //     addStar (input: {starrableId: "MDEwOlJlcG9zaXRvcnkxNDE3NzU1ODY="}) {
  //       starrable {
  //         id
  //         viewerHasStarred
  //       }
  //     }
  //   }`
  //   return service({
  //     url: '/graphql',
  //     method: 'post',
  //     headers: {
  //       Authorization: `Bearer ${authToken}`
  //     },
  //     data: JSON.stringify({query})
  //   })
  // }
}
