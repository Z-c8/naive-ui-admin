import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/index.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

//配置进度条
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/",
    name: "Home",
    meta: {
      title: "首页",
    },
    component: Home,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: "系统首页",
        },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */
            "/@/views/Dashboard/index.vue"
          ),
      },
      {
        path: "/components",
        name: "components",
        meta: {
          title: "组件",
        },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */
            "/@/views/components/components.vue"
          ),
        children: [
          {
            path: "/tinymce",
            name: "tinymce",
            meta: {
              title: "富文本编辑器",
            },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */
                "/@/views/components/tinymce.vue"
              ),
          },
        ],
      },
      {
        path: "/echarts",
        name: "echarts",
        meta: {
          title: "Echarts",
        },
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */
            "/@/views/Echarts/index.vue"
          ),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () => import("/@/views/Login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

// //页面加载结束
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done();
});

export default router;
