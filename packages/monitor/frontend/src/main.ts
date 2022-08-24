import { BarChart, PieChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  TitleComponent,
} from "echarts/components";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import "font-awesome/css/font-awesome.min.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { client } from "./apis";
import App from "./App.vue";
import router from "./router";
import "./style.scss";

import piniaPluginPersist from "pinia-plugin-persist";
use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  PieChart,
]);

client.service.httpRequest.config.BASE = import.meta.env.VITE_BASE_URL;
createApp(App)
  .use(createPinia().use(piniaPluginPersist))
  .use(router)
  .mount("#app");
