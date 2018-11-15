import axios from 'axios'
import store from '../store'

const request = axios.create({
  baseURL: 'http://task.syudao.com/api',
  // baseURL: 'http://localhost/api',
  timeout: 15 * 1000
})
// const ErrorMessages = {
//   1001: '系统错误，请稍后重试',
//   1000: '未知错误',
//   1002: '缺失参数',
//   1003: '请求资源未找到'
// }
request.defaults.headers['Access-Control-Allow-Origin'] = '*'
request.interceptors.request.use((config) => {
  if (!config.params) {
    config.params = {}
  }
  if (!config.data) {
    config.data = {}
  }
  if (config.method === 'get') {
    config.params.open_id = store.state.userInfo.open_id
    config.params.member_id = store.state.userInfo.id
  } else if (config.method === 'post') {
    config.data.open_id = store.state.userInfo.open_id
    config.data.member_id = store.state.userInfo.id
  }

  return config
})
request.interceptors.response.use((res) => {
  if (!res.data) {
    return Promise.reject(new Error('服务器出错啦'))
  }
  if (res.data.err_code) {
    return Promise.reject(new Error(res.data.msg))
  }
  return res.data.data
}, (res) => {
  return Promise.reject(new Error('网络错误'))
})

export default request
