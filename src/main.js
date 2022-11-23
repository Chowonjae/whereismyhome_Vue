import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import swal from "vue-swal";
import GAuth from 'vue-google-oauth2'
import VueCookies from "vue-cookies";

import "@/api/fontAwesomeIcon.js"; // fontAwesomeIcon.js 불러옴
import "@/api/vueBootstrap.js";

Vue.config.productionTip = false;
Vue.use(swal);
Vue.use(VueCookies);
const gauthOption = {
  clientId: '319638889241-tc384jb2vg2o2gvjelkus258n3qb5j1v.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
Vue.$cookies.config("1d");
window.Kakao.init(process.env.VUE_APP_KAKAO_JAVASCRIPT_KEY);

new Vue({
  router,
  store,
  swal,
  render: (h) => h(App),
}).$mount("#app");
