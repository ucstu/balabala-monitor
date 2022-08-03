import "font-awesome/css/font-awesome.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.scss";

createApp(App).use(router).mount("#app");
