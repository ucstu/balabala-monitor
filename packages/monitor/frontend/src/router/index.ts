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
        { name: "数据总览", path: "/Home/overView" },
        { name: "健康状况", path: "/Home/healthStatus" },
        { name: "性能预览", path: "/Home/performancePreview" },
        { name: "地域分布", path: "/Home/region" },
      ],
    },
    component: () => import("@/pages/HomePage/HomePage.vue"),
    redirect: "/Home/overView",
    children: [
      {
        path: "/Home/overView",
        name: "overView",
        meta: {
          title: "数据总览",
        },
        component: () => import("@/pages/systemSet/overView.vue"), //懒加载的方式提高性能优化
      },
      {
        path: "/Home/healthStatus",
        name: "healthStatus",
        meta: {
          title: "健康状况",
        },
        component: () => import("@/pages/systemSet/healthStatus.vue"), //懒加载的方式提高性能优化
      },
      {
        path: "/Home/performancePreview",
        name: "performancePreview",
        meta: {
          title: "性能预览",
        },
        component: () => import("@/pages/systemSet/performancePreview.vue"), //懒加载的方式提高性能优化
      },
      {
        path: "/Home/region",
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
  {
    name: "LogPage",
    path: "/errors/LogPage",
    meta: { hiddenAside: true, hiddenHeader: false },
    component: () => import("@/pages/errors/LogPage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routeRecordRaws],
});

router.afterEach((to, _from) => {
  document.title = to.meta.title
    ? "前端监控-" + (to.meta.title || "")
    : "BalaBala云-前端监控";
});

export default router;
