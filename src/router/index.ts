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
    path: '/login',
    name: 'Login',
    component: () => import('../views/User/Login.vue'),
    meta: {
      title: '登录'
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
        component: () => import('../views/Contest/Contest.vue'),
        props: true,
        children: [
          {
            path: '/contest/:id',
            name: 'Contest',
            redirect: '/contest/:id/dashboard',
            props: true,
            meta: {
              title: '仪表盘'
            }
          },
          {
            path: '/contest/:id/dashboard',
            name: 'Dashboard',
            component: () => import('../views/Contest/Dashboard.vue'),
            props: true,
            meta: {
              title: '仪表盘'
            }
          },
          {
            path: '/contest/:id/submission',
            name: 'Submission',
            component: () => import('../views/Contest/Submission.vue'),
            props: true,
            meta: {
              title: '我的提交'
            }
          },
          {
            path: '/contest/:id/status',
            name: 'Status',
            component: () => import('../views/Contest/Status.vue'),
            props: true,
            meta: {
              title: '所有提交'
            }
          },
          {
            path: '/contest/:id/standings',
            name: 'Standings',
            component: () => import('../views/Contest/Standings.vue'),
            props: true,
            meta: {
              title: '排行榜'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/archive',
    name: 'ArchiveMain',
    component: Archive,
    children: [
      {
        path: '/archive',
        name: 'Archive',
        component: () => import('../views/Archive/Archive.vue'),
        meta: {
          title: '题库'
        }
      }
    ]
  },
  {
    path: '/polygon',
    name: 'PolygonList',
    component: () => import('../views/Polygon/Main.vue'),
    meta: {
      title: 'Polygon'
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
