import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "./assets/css/wrapper.less";

import {
  // create naive ui
  create,
  NButton,
  NCarousel,
  NSpace,
  NIcon,
  NMenu,
  NMessageProvider,
  NDropdown,
  NAvatar,
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NBreadcrumb,
  NBreadcrumbItem,
  NTag,
  NCard,
  NGi,
  NGrid,
  NForm,
  NInput,
  NFormItem,
  NFormItemRow,
  NTabs,
  NTabPane,
  NOl,
  NLi,
} from "naive-ui";

const naive = create({
  components: [
    NButton,
    NCarousel,
    NSpace,
    NMenu,
    NIcon,
    NMessageProvider,
    NDropdown,
    NAvatar,
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutContent,
    NBreadcrumb,
    NBreadcrumbItem,
    NTag,
    NCard,
    NGi,
    NGrid,
    NForm,
    NInput,
    NFormItem,
    NFormItemRow,
    NTabs,
    NTabPane,
    NOl,
    NLi,
  ],
});

const app = createApp(App);
app.directive("resize", {
  beforeMount(el, binding) {
    el.$$handler = function () {
      let width = el.offsetWidth;
      let height = el.offsetHeight;
      if (el.dataset.width !== width) {
        el.dataset.width = width;
      }
      if (el.dataset.height !== height) {
        el.dataset.width = width;
      }
      binding.value.call(null, width, height);
    };
    window.addEventListener("resize", el.$$handler);
  },
  unmounted(el) {
    window.removeEventListener("resize", el.$$handler);
  },
});
app.use(naive).use(router).use(store).mount("#app");
