import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VeeValidate from "vee-validate";
import Notifications from "vue-notification";
import store from "@/core/services/store";

Vue.config.productionTip = false;

// Global 3rd party plugins
import "popper.js";
import "tooltip.js";
import PerfectScrollbar from "perfect-scrollbar";
window.PerfectScrollbar = PerfectScrollbar;

// Vue 3rd party plugins
import "@/core/plugins/portal-vue";
import "@/core/plugins/bootstrap-vue";
import "@/core/plugins/perfect-scrollbar";
import "@/core/plugins/inline-svg";
import "@/core/plugins/apexcharts";
import "@/core/plugins/metronic";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Notifications);
Vue.use(require("vue-moment"));
Vue.use(VeeValidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
