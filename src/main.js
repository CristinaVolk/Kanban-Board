import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import { authHeader } from './auth_header'

Vue.prototype.$http = Axios;

const token = authHeader();
if (token) {
  Vue.prototype.$http.defaults.headers.common[ 'Authorization' ] = token
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
