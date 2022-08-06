import "@/assets/iconfont/iconfont.js";
import SvgIcon from "@/components/SvgIcon.vue";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.scss";

import { createMonitor } from "@balabala/monitor-sdk";

createMonitor({
  url: "https://mock.apifox.cn/m1/1350111-0-default",
  appId: "5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
});

createApp(App).use(router).component("SvgIcon", SvgIcon).mount("#app");
