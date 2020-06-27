import Vue from 'vue';
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"
import App from './App.vue';
import router from './router';
import axios from "axios"

router.beforeEach((to, form, next) => {
  if (to.path === '/login') {
    return next();
  }
  const token = window.sessionStorage.getItem("token");
  if (!token) {
    return next('/login');
  }
  next();
})
//axios拦截器，目的是为了在请求头上带上token
axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) {
      config.headers.token = sessionStorage.getItem('token');
      // debugger
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });
Vue.use(ElementUI)
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
