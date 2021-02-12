import Vue from 'vue';
import StartingPage from './StartingPage.vue';
import router from './routes';
import axios from "axios";

const base = axios.create({
  baseURL: "http://localhost:4000"
});

Vue.prototype.$http = base;
Vue.config.productionTip = false;

new Vue({
  router,
  // el: '#app',
  render:h => h(StartingPage)
}).$mount("#app");