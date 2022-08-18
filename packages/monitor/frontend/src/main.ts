import "font-awesome/css/font-awesome.min.css";
import { createApp } from "vue";
import { client } from "./apis";
import App from "./App.vue";
import router from "./router";
import "./style.scss";

import { createPinia } from "pinia";

client.service.httpRequest.config.BASE = "http://127.0.0.1:3000";
createApp(App).use(createPinia()).use(router).mount("#app");
