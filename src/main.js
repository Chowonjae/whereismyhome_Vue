import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import swal from "vue-swal";
import VueCookies from "vue-cookies";

import "@/api/fontAwesomeIcon.js"; // fontAwesomeIcon.js 불러옴
import "@/api/vueBootstrap.js";

Vue.config.productionTip = false;
Vue.use(swal);
Vue.use(VueCookies);

Vue.$cookies.config("1d");

new Vue({
  router,
  store,
  swal,
  render: (h) => h(App),
}).$mount("#app");
