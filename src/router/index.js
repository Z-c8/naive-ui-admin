import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

//配置进度条
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 200, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});

const Home = () =>
  import(/* webpackChunkName: "group-user" */ "/@/views/Home/index.vue");
const Login = () =>
  import(/* webpackChunkName: "group-user" */ "/@/views/Login/index.vue");
const Dashboard = () =>
  import(/* webpackChunkName: "group-user" */ "/@/views/Dashboard/index.vue");
const Tinymce = () =>
  import(/* webpackChunkName: "group-user" */ "/@/views/Tinymce/index.vue");
const Count = () =>
  import(/* webpackChunkName: "group-user" */ "/@/views/Count/index.vue");
const Mixin = () =>
  import(/* webpackChunkName: "Mixin" */ "/@/views/Mixin/index.vue");

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
        component: Dashboard,
      },
      {
        path: "/tinymce",
        name: "tinymce",
        meta: {
          title: "富文本编辑器",
        },
        component: Tinymce,
      },
      {
        path: "/count",
        name: "count",
        meta: {
          title: "数字滚动",
        },
        component: Count,
      },
      {
        path: "/mixin",
        name: "mixin",
        meta: {
          title: "小组件",
        },
        component: Mixin,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: Login,
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

//页面加载结束
router.afterEach((to, from, next) => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done();
});

export default router;
