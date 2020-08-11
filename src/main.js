import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'

import moment from 'vue-moment'
Vue.use(moment)

import VCalendar from 'v-calendar'
Vue.use(VCalendar)

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router: router, //router, storeだけに省略も可能
  store: store,
  render: h => h(App),
}).$mount('#app')
