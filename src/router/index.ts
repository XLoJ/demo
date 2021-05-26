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
    },
    beforeEnter(to, from, next) {
      if (from.name === 'Welcome') {
        to.params.redirect = '/home';
      } else if (from.name) {
        to.params.redirect = from.fullPath;
      } else {
        to.params.redirect = '/home';
      }
      next();
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/User/Register.vue'),
    meta: {
      title: '注册'
    },
    beforeEnter(to, from, next) {
      if (from.name === 'Welcome') {
        to.params.redirect = '/home';
      } else if (from.name) {
        to.params.redirect = from.fullPath;
      } else {
        to.params.redirect = '/home';
      }
      next();
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
        path: '/contest/create',
        name: 'CreateContest',
        component: () => import('../views/Contest/CreateContest.vue'),
        meta: {
          title: '创建比赛'
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
            path: '/contest/:id/problem/:index',
            name: 'ContestProblem',
            component: () => import('../views/Contest/ContestProblem.vue'),
            props: true,
            meta: {
              title: '题目'
            }
          },
          {
            path: '/contest/:id/submission',
            name: 'MySubmission',
            component: () => import('../views/Contest/MySubmission.vue'),
            props: true,
            meta: {
              title: '我的提交'
            }
          },
          {
            path: '/contest/:id/status',
            name: 'Status',
            component: () => import('../views/Contest/AllSubmission.vue'),
            props: true,
            meta: {
              title: '所有提交'
            }
          },
          {
            path: '/contest/:id/submission/:sid',
            name: 'ContestSubmission',
            component: () => import('../views/Contest/Submission.vue'),
            props: true,
            meta: {
              title: '提交'
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
          },
          {
            path: '/contest/:id/edit',
            name: 'EditContest',
            component: () => import('../views/Contest/EditContest.vue'),
            props: true,
            meta: {
              title: '编辑比赛'
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
      },
      {
        path: '/status',
        name: 'ArchiveStatus',
        component: () => import('../views/Archive/ArchiveStatus.vue'),
        meta: {
          title: '评测队列'
        }
      },
      {
        path: '/archive/edit',
        name: 'EditArchive',
        component: () => import('../views/Archive/EditArchive.vue'),
        meta: {
          title: '编辑题库'
        }
      },
      {
        path: '/archive/problem/:index',
        name: 'ArchiveProblem',
        component: () => import('../views/Archive/ArchiveProblem.vue'),
        meta: {
          title: '题目'
        }
      },
      {
        path: '/archive/submission/:sid',
        name: 'ArchiveSubmission',
        component: () => import('../views/Archive/Submission.vue'),
        meta: {
          title: '提交记录'
        }
      }
    ]
  },
  {
    path: '/polygon',
    component: () => import('../views/Polygon/Main.vue'),
    children: [
      {
        path: '/polygon',
        name: 'PolygonList',
        component: () => import('../views/Polygon/PolygonList.vue'),
        meta: {
          title: 'Polygon'
        }
      },
      {
        path: '/polygon/create',
        name: 'PolygonCreateProblem',
        component: () => import('../views/Polygon/CreateProblem.vue'),
        meta: {
          title: '创建题目'
        }
      },
      {
        path: '/polygon/:id',
        name: 'PolygonMain',
        props: true,
        component: () => import('../views/Polygon/Polygon.vue'),
        meta: {
          title: 'Polygon'
        },
        children: [
          {
            path: '/polygon/:id',
            name: 'Polygon',
            props: true,
            component: () => import('../views/Polygon/ProblemInfo.vue'),
            meta: {
              title: '题目信息'
            }
          },
          {
            path: '/polygon/:id/statement',
            name: 'PolygonStatement',
            props: true,
            component: () => import('../views/Polygon/EditStatement.vue'),
            meta: {
              title: '题面编辑'
            }
          },
          {
            path: '/polygon/:id/preview',
            name: 'PolygonPreviewStatement',
            props: true,
            component: () => import('../views/Polygon/PreviewStatement.vue'),
            meta: {
              title: '题面预览'
            }
          },
          {
            path: '/polygon/:id/validator',
            name: 'PolygonValidator',
            props: true,
            component: () => import('../views/Polygon/UploadValidator.vue'),
            meta: {
              title: 'Validator'
            }
          },
          {
            path: '/polygon/:id/checker',
            name: 'PolygonChecker',
            props: true,
            component: () => import('../views/Polygon/UploadChecker.vue'),
            meta: {
              title: 'Checker'
            }
          },
          {
            path: '/polygon/:id/solution',
            name: 'PolygonSolution',
            props: true,
            component: () => import('../views/Polygon/UploadSolution.vue'),
            meta: {
              title: 'Solution'
            }
          },
          {
            path: '/polygon/:id/generators',
            name: 'PolygonGenerators',
            props: true,
            component: () => import('../views/Polygon/EditGenerators.vue'),
            meta: {
              title: 'Generators'
            }
          },
          {
            path: '/polygon/:id/static',
            name: 'PolygonStaticFile',
            props: true,
            component: () => import('../views/Polygon/UploadStaticFile.vue'),
            meta: {
              title: '静态文件'
            }
          },
          {
            path: '/polygon/:id/testcases',
            name: 'PolygonTestcases',
            props: true,
            component: () => import('../views/Polygon/EditTestcases.vue'),
            meta: {
              title: '测试数据'
            }
          },
          {
            path: '/polygon/:id/build',
            name: 'PolygonBuild',
            props: true,
            component: () => import('../views/Polygon/Build.vue'),
            meta: {
              title: '构建'
            }
          },
          {
            path: '/polygon/:id/judge',
            name: 'PolygonJudge',
            props: true,
            component: () => import('../views/Polygon/TestJudge.vue'),
            meta: {
              title: '评测'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/User/Profile.vue'),
    meta: {
      title: '个人资料'
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
