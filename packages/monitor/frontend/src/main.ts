import "font-awesome/css/font-awesome.min.css";
import { createApp } from "vue";
import { client } from "./apis";
import App from "./App.vue";
import router from "./router";
import "./style.scss";

client.service.httpRequest.config.BASE = "http://localhost:3000";
createApp(App).use(router).mount("#app");
