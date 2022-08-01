import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.scss";

import { getArticle, setBaseURL } from "@balabala/api";
import { createMonitor } from "@balabala/monitor-sdk";

createMonitor({
  url: "http://localhost:3000/monitor",
  appId: "5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
});

setBaseURL("http://localhost:3000/api/v1");
getArticle({ class: 1 }).then((res) => {
  console.log(res);
});

createApp(App).use(router).mount("#app");
