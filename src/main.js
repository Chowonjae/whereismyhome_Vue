import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import swal from "vue-swal";

import "@/api/fontAwesomeIcon.js"; // fontAwesomeIcon.js 불러옴
import "@/api/vueBootstrap.js";

Vue.config.productionTip = false;
Vue.use(swal);

new Vue({
  router,
  store,
  swal,
  render: (h) => h(App),
}).$mount("#app");
