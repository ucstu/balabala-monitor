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
      //url: "https://mock.apifox.cn/m1/1410646-0-default",
      url: "http://127.0.0.1:3000",
      appId: "b2FdF9cb-1EE7-Dc6e-de9C-1cAcf37dcdd5",
      userId: "ce124A07-9111-C9b7-84C5-5644CEdB4Abf",
    });
  })
  .catch((err) => {
    console.error(err);
  });

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});

client.service.httpRequest.config.BASE =
  //"https://mock.apifox.cn/m1/1410641-0-default";
  "http://127.0.0.1:3000";
createApp(App).use(router).mount("#app");
