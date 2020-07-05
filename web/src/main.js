import Vue from 'vue';
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"
import App from './App.vue';
import router from './router';
import axios from "./axios.config"

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


window.$axios = axios;
Vue.use(ElementUI)
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
