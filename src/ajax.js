import axios from 'axios';
import config from './config';

const client = axios.create({
  //setURL(config)
  baseURL: config.apiBaseUrl
})

function setURL(config){

    if(config.apiBaseUrl.includes('localhost'))
     {
     config.apiBaseUrl='localhost'
     }

    return config.apiBaseUrl
}

client.interceptors.request.use(config => {
  // const user = loginUtils.getCurrentUser(store.getState())
  // const username = user.get('login_id')
  // const password = user.get('password')

  // if (username) {
  //   config.auth = {
  //     username,
  //     password
  //   }
  // }

  if(config.method=='get'){
                        var separator = config.url.indexOf('?') === -1 ? '?' : '&';
                        config.url = config.url+separator+'noCache=' + new Date().getTime();
                    }

  return config
});

client.interceptors.response.use(resp => resp, resp => {
  if (resp instanceof Error) {

  }
  // const errors = resp.data && resp.data.errors ? resp.data.errors : [{detail: 'Error'}]
  const errors = (resp.response && resp.response.data) ? resp.response.data : [{ detail: 'Error' }]

  return Promise.reject(errors);
});

export default client