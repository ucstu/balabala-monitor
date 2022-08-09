import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

const routeRecordRaws: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "/",
    // meta: { hiddenAside: true, hiddenHeader: true },
    component: () => import("@/pages/HomePage/HomePage.vue"),
    redirect: "/overView",
    children: [
      {
        path: "overView",
        name: "overView",
        component: () => import("@/pages/systemSet/overView.vue"), //懒加载的方式提高性能优化
      },
      {
        path: "healthStatus",
        name: "healthStatus",
        component: () => import("@/pages/systemSet/healthStatus.vue"), //懒加载的方式提高性能优化
      },
      {
        path: "performancePreview",
        name: "performancePreview",
        component: () => import("@/pages/systemSet/performancePreview.vue"), //懒加载的方式提高性能优化
      },
      {
        path: "region",
        name: "region",
        component: () => import("@/pages/systemSet/region.vue"), //懒加载的方式提高性能优化
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routeRecordRaws],
});

export default router;
