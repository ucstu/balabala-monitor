import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    keepAlive?: boolean;
    hiddenAside?: boolean;
    hiddenHeader?: boolean;
    menu?: Array<{ name: string; path: string }>;
  }
}

const routeRecordRaws: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "/",
    meta: {
      menu: [
        { name: "总览", path: "/overView" },
        { name: "健康状况", path: "/healthStatus" },
        { name: "性能预览", path: "/performancePreview" },
        { name: "地域分布", path: "/region" },
      ],
    },
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
