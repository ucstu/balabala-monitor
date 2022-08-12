import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("@/pages/HomePage/HomePage.vue"),
  },
  {
    path: "/detail/:id",
    component: () => import("@/pages/DetailPage/DetailPage.vue"),
  },
  {
    path: "/editor",
    component: () => import("@/pages/EditorPage/EditorPage.vue"),
    meta: {
      title: "写文章",
    },
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
