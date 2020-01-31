import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "./App.scss";

// Vue Toastr
import VueToastr from "vue-toastr";

import axios from "@/shared/axios";

Vue.use(VueToastr, {
  defaultPosition: "toast-top-right"
});

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
