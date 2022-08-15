import "@/assets/iconfont/iconfont.js";
import "bytemd/dist/index.css";
import { createApp } from "vue";
import { client } from "./apis";
import App from "./App.vue";
import router from "./router";
import "./style.scss";

import("@balabala/monitor-sdk")
  .then(({ createMonitor }) => {
    createMonitor({
      url: "https://qxyjkapi.ucstu.com",
      appId: "b2FdF9cb-1EE7-Dc6e-de9C-1cAcf37dcdd5",
      userId: "ce124A07-9111-C9b7-84C5-5644CEdB4Abf",
    });
  })
  .catch((err) => {
    console.error(err);
  });

client.service.httpRequest.config.BASE = "https://qxyjjapi.ucstu.com";
createApp(App).use(router).mount("#app");
