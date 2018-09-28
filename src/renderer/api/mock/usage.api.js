export default {
  loginState: config => {
    console.log('Mock: ' + config.url)
    return {
      'status': 'success',
      'code': '0',
      'message': '',
      'data': null
    }
  },
  grabState: config => {
    console.log('Mock: ' + config.url)
    return {
      'status': 'success',
      'code': '0',
      'message': '',
      'data': null
    }
  }
}
