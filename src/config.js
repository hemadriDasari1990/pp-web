const config = {
  application: 'pp-web',
  environment: global.NODE_ENV,
  apiBaseUrl: 'http://' + window.location.href.split('/')[2],
  API_URL: 'https://api.feedbacklib.com/api',
  CLIENT_ROOT_URL: 'http://localhost:8080',
  URL_PREFIX: 'https://api.feedbacklib.com/api',
}

switch (global.NODE_ENV) {
  case 'production': {
    const { protocol, hostname, port } = window.location
    config.apiBaseUrl = `https://api.feedbacklib.com`

    break
  }
  case 'staging': {
    break
  }
  case 'testing':
    break
  default: {
    config.URL_PREFIX = 'https://api.feedbacklib.com/api'

    break
  }
}

export default config
