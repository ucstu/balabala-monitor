import "font-awesome/css/font-awesome.min.css";
import { createApp } from "vue";
import { client } from "./apis";
import App from "./App.vue";
import router from "./router";
import "./style.scss";

import { createPinia } from "pinia";

client.service.httpRequest.config.BASE = import.meta.env.VITE_BASE_URL;
createApp(App).use(createPinia()).use(router).mount("#app");
