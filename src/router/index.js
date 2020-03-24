import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home/index.vue';
// import About from '../views/About.vue';
// import Add from '../views/Add.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "page.home" */ '../views/Home/index.vue'),
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "page.detail" */ '../views/Detail/index.vue'),
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: About,
  // },
  // {
  //   path: '/add',
  //   name: 'Add',
  //   component: Add,
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
