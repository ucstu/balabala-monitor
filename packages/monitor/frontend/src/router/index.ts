import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

const routeRecordRaws: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "/",
    component: () => import("@/pages/HomePage/HomePage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routeRecordRaws],
});

export default router;
