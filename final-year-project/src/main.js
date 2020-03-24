import Vue from 'vue'
import App from './App.vue'
import BlockHolder from "./components/BlockHolder.vue"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import PortalVue from 'portal-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2';           // If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
import VueRouter from 'vue-router'
import Routes from './routes.js'

Vue.config.productionTip = false

//using vue-router
Vue.use(VueRouter)
const router = new VueRouter({
  routes: Routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } 
      return { x: 0, y: 0 }
  },
})
//Install VueSweetAlert
Vue.use(VueSweetalert2);
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(PortalVue)

Vue.component("block-holder", BlockHolder)

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')



