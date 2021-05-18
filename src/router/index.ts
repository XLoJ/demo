import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Welcome from '../views/Home/Welcome.vue';
import Home from '../views/Home/Home.vue';
import Contest from '../views/Contest/Contest.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/contest',
    name: 'Contest',
    component: Contest,
    children: [
      {
        path: '/',
        name: 'ContestList',
        component: () => import('../views/Contest/ContestList.vue')
      }
    ]
  },
  {
    path: '/archive',
    name: 'Archive',
    component: Contest
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
