import "@/assets/iconfont/iconfont.js";
import { createApp } from "vue";
import { client } from "./apis";
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
  .catch((err) => {
    console.error(err);
  });

client.service.httpRequest.config.BASE = "http://localhost:3000";
createApp(App).use(router).mount("#app");
