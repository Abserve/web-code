import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbvue/lib/css/mdb.min.css";
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
import VueSpinners from 'vue-spinners';
import moment from 'moment'
import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);
Vue.use(VueSpinners)

Vue.filter('humanize', function(value) {
  //console.log(moment.duration(value))
  return moment.duration(value).humanize();
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
