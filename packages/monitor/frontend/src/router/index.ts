import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    keepAlive?: boolean;
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
        { name: "数据总览", path: "/overView" },
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
        meta: {
          title: "数据总览",
        },
        component: () => import("@/pages/systemSet/overView.vue"), //懒加载的方式提高性能优化
      },
      {
        path: "healthStatus",
        name: "healthStatus",
        meta: {
          title: "健康状况",
        },
        component: () => import("@/pages/systemSet/healthStatus.vue"), //懒加载的方式提高性能优化
      },
      {
        path: "performancePreview",
        name: "performancePreview",
        meta: {
          title: "性能预览",
        },
        component: () => import("@/pages/systemSet/performancePreview.vue"), //懒加载的方式提高性能优化
      },
      {
        path: "region",
        name: "region",
        meta: {
          title: "地域分布",
        },
        component: () => import("@/pages/systemSet/WhatRegion.vue"), //懒加载的方式提高性能优化
      },
    ],
  },
  {
    name: "customerSearch",
    path: "/customerSearch",
    component: () => import("@/pages/CustomerPage/customerSearch.vue"),
  },
  {
    name: "details",
    path: "/customerSearch/details",
    component: () => import("@/pages/CustomerPage/CustomerDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routeRecordRaws],
});

router.afterEach((to, _from) => {
  document.title = to.meta.title
    ? "前端监控-" + (to.meta.title || "")
    : "Balabala云-前端监控";
});

export default router;
