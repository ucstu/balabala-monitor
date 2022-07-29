import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("@/pages/HomePage/HomePage.vue"),
    children: [
      {
        path: "android",
        component: () => import("@/pages/HomePage/ChildPage/Android.vue"),
      },
      {
        path: "backend",
        component: () => import("@/pages/HomePage/ChildPage/Backend.vue"),
      },
      {
        path: "frontend",
        component: () => import("@/pages/HomePage/ChildPage/Frontend.vue"),
      },
    ],
  },
  {
    path: "/detail/:id",
    component: () => import("@/pages/DetailPage/DetailPage.vue"),
  },
  {
    path: "/editor",
    component: () => import("@/pages/EditorPage/EditorPage.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
