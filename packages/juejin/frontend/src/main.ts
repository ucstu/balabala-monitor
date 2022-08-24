import "@/assets/iconfont/iconfont.js";
import "bytemd/dist/index.css";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import { createApp } from "vue";
import { client } from "./apis";
import App from "./App.vue";
import router from "./router";
import "./style.scss";

import("@balabala/monitor-sdk")
  .then(({ createMonitor }) => {
    createMonitor({
      url: import.meta.env.VITE_MONITOR_URL,
      appId: "b2FdF9cb-1EE7-Dc6e-de9C-1cAcf37dcdd5",
      userId: "ce124A07-9111-C9b7-84C5-5644CEdB4Abf",
    });
  })
  .catch((err) => {
    console.error(err);
  });

client.service.httpRequest.config.BASE = import.meta.env.VITE_BASE_URL;
createApp(App)
  .use(createPinia().use(piniaPluginPersist))
  .use(router)
  .mount("#app");
