class Ajax {
  login(data) {
    return new Promise((resolve, reject) => {
      $axios.post('/login', data).then((res) => {
        if (res.data.code === 1) {
          sessionStorage.setItem('token', res.data.token);
          sessionStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));
          // Bearer是JWT的认证头部信息
          $axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
          resolve(true);
        } else {
          sessionStorage.removeItem('token');
          resolve(false);
        }
      });
    });
  }

  query() {
    $axios.get('/user').then((res) => {

    });
  }
}
export default Ajax;
