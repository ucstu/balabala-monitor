import "@/assets/iconfont/iconfont.js";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.scss";

import("@balabala/monitor-sdk")
  .then(({ createMonitor }) => {
    createMonitor({
      url: "https://mock.apifox.cn/m1/1350111-0-default",
      appId: "5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
    });
  })
  .catch(() => {
    throw new Error("Load monitor-sdk failed");
  });

createApp(App).use(router).mount("#app");
