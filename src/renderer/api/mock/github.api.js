export default {
  getUserInfo: config => {
    console.log('Mock: ' + config.url)
    return {
      'login': 'GIS-Hacker',
      'id': 31750841,
      'node_id': 'MDQ6VXNlcjMxNzUwODQx',
      'avatar_url': 'https://avatars3.githubusercontent.com/u/31750841?v=4',
      'gravatar_id': '',
      'url': 'https://api.github.com/users/GIS-Hacker',
      'html_url': 'https://github.com/GIS-Hacker',
      'followers_url': 'https://api.github.com/users/GIS-Hacker/followers',
      'following_url': 'https://api.github.com/users/GIS-Hacker/following{/other_user}',
      'gists_url': 'https://api.github.com/users/GIS-Hacker/gists{/gist_id}',
      'starred_url': 'https://api.github.com/users/GIS-Hacker/starred{/owner}{/repo}',
      'subscriptions_url': 'https://api.github.com/users/GIS-Hacker/subscriptions',
      'organizations_url': 'https://api.github.com/users/GIS-Hacker/orgs',
      'repos_url': 'https://api.github.com/users/GIS-Hacker/repos',
      'events_url': 'https://api.github.com/users/GIS-Hacker/events{/privacy}',
      'received_events_url': 'https://api.github.com/users/GIS-Hacker/received_events',
      'type': 'User',
      'site_admin': false,
      'name': 'GIS-Hacker',
      'company': 'Wuhan University',
      'blog': 'https://home.cs-tao.cc/',
      'location': 'Wuhan · China',
      'email': null,
      'hireable': null,
      'bio': 'A student in Wuhan University, working on GWmodel and GIS.',
      'public_repos': 11,
      'public_gists': 0,
      'followers': 0,
      'following': 1,
      'created_at': '2017-09-08T01:03:54Z',
      'updated_at': '2018-11-24T15:43:24Z'}
  },
  checkStared: config => {
    console.log('Mock: ' + config.url)
    return {
      'data': {
        'viewer': {
          'id': 'MDQ6VXNlcjMxNzUwODQx',
          'login': 'GIS-Hacker'
        },
        'repository': {
          'id': 'MDEwOlJlcG9zaXRvcnkxNTE1MDUyOTM=',
          'stargazers': {
            'nodes': [
              {
                'id': 'MDQ6VXNlcjM0ODA2ODA2',
                'login': 'lsq210'
              },
              {
                'id': 'MDQ6VXNlcjM1NzI2MTUy',
                'login': 'zhgruiyi'
              },
              {
                'id': 'MDQ6VXNlcjE3OTA1ODkw',
                'login': 'GeoLibra'
              },
              {
                'id': 'MDQ6VXNlcjQ0OTQ2NDM2',
                'login': 'RedRumLiu'
              },
              {
                'id': 'MDQ6VXNlcjE3Mjk3MjQy',
                'login': 'laoheimao'
              },
              {
                'id': 'MDQ6VXNlcjMxNzUwODQx',
                'login': 'GIS-Hacker'
              },
              {
                'id': 'MDQ6VXNlcjIyMzYwNjMy',
                'login': 'CS-Tao'
              },
              {
                'id': 'MDQ6VXNlcjM0ODgwNzYz',
                'login': 'UI-Mario'
              }
            ]
          }
        }
      }
    }
  }
}
