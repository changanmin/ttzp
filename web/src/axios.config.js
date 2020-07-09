import axios from 'axios';
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
axios.interceptors.request.use(
  (config) => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    if (sessionStorage.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.common.Authorization = `Bearer ${sessionStorage.token}`;
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.token
    }
    return config;
  },
  (error) => Promise.error(error),
);

// 响应拦截器
axios.interceptors.response.use(
  // 请求成功
  (res) => Promise.resolve(res),
  // 请求失败
  (error) => {
    const { response } = error;
    if (response) {
      if (response.status === 401) {
        sessionStorage.removeItem('token');
        location.reload();
      }
      // 请求已发出，但是不在2xx的范围
      // errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    }
    // 处理断网的情况
    // eg:请求超时或断网时，更新state的network状态
    // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
  },
);
export default axios;
