import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import VueAMap from 'vue-amap';
import 'element-ui/lib/theme-chalk/index.css';
// 安装components
import '@/components/install';
import directives from '@/directives';
import '@/mock';

Vue.config.productionTip = false;

VueAMap.initAMapApiLoader({
  // 高德的key
  key: '2e526effb5a82444e19f7dcf3285d248',
  // 插件集合
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor'
  ],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});
Vue.use(directives);
Vue.use(ElementUI);
Vue.use(VueAMap);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
