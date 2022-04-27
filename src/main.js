import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from "vue-lazyload";
import APlaye from '@moefe/vue-aplayer'
// 全局样式表
import "./assets/css/base.css"
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueLazyload);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
