import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

const routeRecordRaws: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "/",
    // meta: { hiddenAside: true, hiddenHeader: true },
    component: () => import("@/pages/HomePage/HomePage.vue"),
    redirect: "/Home/overView",
    children: [
      {
        path: "/Home/overView",
        name: "overView",
        component: () => import("@/pages/systemSet/overView.vue"), //懒加载的方式提高性能优化
      },
      {
        path: "/Home/healthStatus",
        name: "healthStatus",
        component: () => import("@/pages/systemSet/healthStatus.vue"), //懒加载的方式提高性能优化
      },
      {
        path: "/Home/performancePreview",
        name: "performancePreview",
        component: () => import("@/pages/systemSet/performancePreview.vue"), //懒加载的方式提高性能优化
      },
      {
        path: "/Home/region",
        name: "region",
        component: () => import("@/pages/systemSet/region.vue"), //懒加载的方式提高性能优化
      },
    ],
  },
  {
    name: "customerSearch",
    path: "/customerSearch",
    meta: { hiddenAside: true, hiddenHeader: true },
    component: () => import("@/pages/CustomerPage/customerSearch.vue"),
  },
  {
    name: "details",
    path: "/customerSearch/details",
    meta: { hiddenAside: true, hiddenHeader: true },
    component: () => import("@/pages/CustomerPage/details.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routeRecordRaws],
});

export default router;
