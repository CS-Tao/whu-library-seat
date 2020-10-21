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
  checkStared: (authToken, cursor = null) => {
    const repoName = 'whu-library-seat'
    const firstUserCount = 10
    const maxUserCount = 100
    var query = null
    if (!cursor) {
      query = `query {
        viewer { id login }
        repository(owner:"CS-Tao", name:"${repoName}") {
          id
          stargazers (first: ${firstUserCount}, orderBy: {field: STARRED_AT, direction: DESC}) {
            edges {
              cursor
              starredAt
              node {
                id
                login
              }
            }
          }
        }
      }`
    } else {
      query = `query {
        viewer { id login }
        repository(owner:"CS-Tao", name:"${repoName}") {
          id
          stargazers (first: ${maxUserCount}, orderBy: {field: STARRED_AT, direction: DESC}, after: "${cursor}") {
            edges {
              cursor
              starredAt
              node {
                id
                login
              }
            }
          }
        }
      }`
    }
    // resolve(token, lastCursor, haveStarted)
    return new Promise((resolve, reject) => {
      service({
        url: urls.githubApi.checkStared.url(),
        method: urls.githubApi.checkStared.method,
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        data: JSON.stringify({query})
      })
        .then((response) => {
          if (response.status === 200) {
            var viewer = response.data.data.viewer
            var stargazers = response.data.data.repository.stargazers.edges
            if (stargazers.length === 0) {
              resolve([authToken, null, false])
            } else {
              var haveStared = stargazers.find(
                stargazer => stargazer.node.id === viewer.id
              ) !== undefined
              var lastCursor = stargazers[stargazers.length - 1].cursor
              resolve([authToken, lastCursor, haveStared])
            }
          } else {
            reject(Error('数据加载失败，请重新尝试'))
          }
        })
        .catch((error) => {
          reject(error)
        })
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
