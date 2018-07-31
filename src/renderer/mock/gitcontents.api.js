export default {
  validateUser: config => {
    console.log('Mock: ' + config.url)
    return {
      'status': 'success',
      'code': '0',
      'message': '',
      'data': {
        'groups': [
          {
            'id': 1,
            'name': 'admin',
            'status': true
          },
          {
            'id': 2,
            'name': 'friends',
            'status': true
          }
        ],
        'users': [
          {
            'id': 1,
            'account': 2015302590039,
            'groupId': 1,
            'status': true
          },
          {
            'id': 1,
            'account': 2017302590175,
            'groupId': 1,
            'status': true
          }
        ]
      }
    }
  }
}
