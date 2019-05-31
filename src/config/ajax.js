import axios from 'axios';


/**
 * @description axios请求拦截器
 */
axios.interceptors.request.use(config => {
  console.log("config====")
  console.log(config)

  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

/**
 * @description axios响应拦截器
 */
axios.interceptors.response.use(response => {
  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 404:
        err.response.message = '系统异常'
        break
      default:
        err.response.message = '系统异常'
    }
  } else {
    err.response.message = '系统异常'
  }
  console.log(err.response)
  //Vue.prototype.$messagebox({ message: err.message })
  return Promise.resolve(err.response)
})

/**
 * @description axios配置文件
 * headers: 设置请求头
 * timeout: 设置超时60s后取消请求
 */
axios.defaults.headers = {
  'Content-Type': 'application/json',
  'Authorization': localStorage.getItem("token") || "0"
}
axios.defaults.timeout = 60000

/**
 * @description 封装axios请求
 * get: get请求
 * post: post请求
 * put: put请求
 * delete: delete请求
 */
export default {
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param
      }).then(res => {
        resolve(res)
      })
    })
  },
  post(url, param) {
    console.log("res1232132")
    console.log(url)
    console.log(param)
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: param
      }).then(res => {
        resolve(res)
      })
    })
  },
  put(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url,
        data: param
      }).then(res => {
        resolve(res)
      })
    })
  },
  delete(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url,
        params: param
      }).then(res => {
        resolve(res)
      })
    })
  }
}
