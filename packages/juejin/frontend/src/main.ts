import "@/assets/iconfont/iconfont.js";
import SvgIcon from "@/components/SvgIcon.vue";
import "bytemd/dist/index.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.scss";

// import { setBaseURL } from "@balabala/api";
// import { createMonitor } from "@balabala/monitor-sdk";

// createMonitor({
//   url: "https://mock.apifox.cn/m1/1350111-0-default",
//   appId: "5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
// });

// setBaseURL("http://localhost:3000");

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});

createApp(App).use(router).component("SvgIcon", SvgIcon).mount("#app");
