import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Welcome from '../views/Home/Welcome.vue';
import Home from '../views/Home/Home.vue';
import Contest from '../views/Contest/Main.vue';
import Archive from '../views/Archive/Main.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    meta: {
      title: '欢迎'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '主页'
    }
  },
  {
    path: '/contest',
    name: 'ContestMain',
    component: Contest,
    children: [
      {
        path: '/contest',
        name: 'ContestList',
        component: () => import('../views/Contest/ContestList.vue'),
        meta: {
          title: '比赛列表'
        }
      },
      {
        path: '/contest/:id',
        name: 'Contest',
        component: () => import('../views/Contest/Contest.vue'),
        props: true,
        meta: {
          title: '比赛'
        }
      }
    ]
  },
  {
    path: '/archive',
    name: 'Archive',
    component: Archive,
    children: [],
    meta: {
      title: '题库'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: '关于'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title !== undefined && typeof to.meta.title === 'string') {
    document.title = to.meta.title + ' - XLor Online Judge';
  }
  next();
});

export default router;
