import Vue from 'vue';
import VueRouter from 'vue-router';
import config from './config';

import { createRouteGuard } from './guard';
Vue.use(VueRouter);

const createRoute = routes => {
  return routes.map(item => {
    const { children, component, ...args } = item;
    return {
      component: () => import(`@/views/${component}`),
      children: children ? createRoute(children) : [],
      ...args
    };
  });
};

const routers = [
  {
    path: '/',
    name: 'Home',
    component: 'home/index',
    meta: { title: '首页' },
    children: config
  },
  {
    path: '/login',
    name: 'Login',
    component: 'login/index'
  },
  {
    path: '/error:type',
    name: 'Error',
    component: 'error/index'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: createRoute(routers)
});

createRouteGuard(router);
export default router;
