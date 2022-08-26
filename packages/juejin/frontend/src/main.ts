import "@/assets/iconfont/iconfont.js";
import "bytemd/dist/index.css";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import { createApp } from "vue";
import { client } from "./apis";
import App from "./App.vue";
import router from "./router";
import "./style.scss";

function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

import("@balabala/monitor-sdk")
  .then(({ createMonitor }) => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = guid();
      localStorage.setItem("userId", userId);
    }
    createMonitor({
      url: import.meta.env.VITE_MONITOR_URL,
      appId: "b2FdF9cb-1EE7-Dc6e-de9C-1cAcf37dcdd5",
      userId: userId as string,
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
