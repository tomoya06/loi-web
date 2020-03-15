import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home/index.vue';
import Detail from '../views/Detail/index.vue';
import About from '../views/About.vue';
import Add from '../views/Add.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/add',
    name: 'Add',
    component: Add,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
