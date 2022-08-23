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
    path: "/",
    name: "Home",
    redirect: "/Overview",
  },
  // 概览页面
  {
    name: "Overview",
    path: "/Overview",
    meta: {
      menu: [
        { name: "数据总览", path: "/Overview/DataOverview" },
        { name: "健康状况", path: "/Overview/HealthStatusOverview" },
        { name: "性能预览", path: "/Overview/PerformanceOverview" },
      ],
    },
    component: () => import("@/pages/PageContent.vue"),
    redirect: "/Overview/DataOverview",
    children: [
      {
        path: "DataOverview",
        name: "Overview-DataOverview",
        meta: {
          title: "数据总览",
        },
        component: () => import("@/pages/OverviewPage/DataOverview.vue"),
      },
      {
        path: "HealthStatusOverview",
        name: "Overview-HealthStatusOverview",
        meta: {
          title: "健康状况",
        },
        component: () =>
          import("@/pages/OverviewPage/HealthStatusOverview.vue"),
      },
      {
        path: "PerformanceOverview",
        name: "Overview-PerformanceOverview",
        meta: {
          title: "性能预览",
        },
        component: () => import("@/pages/OverviewPage/PerformanceOverview.vue"),
      },
    ],
  },
  // 错误页面
  {
    name: "Mistaken-BasicMistaken",
    path: "/Mistaken/BasicMistaken",
    meta: {
      menu: [
        {
          name: "错误概览",
          path: "/Mistaken/BasicMistaken/MistakenOverview",
        },
        {
          name: "错误列表",
          path: "/Mistaken/BasicMistaken/MistakenList",
        },
      ],
    },
    component: () => import("@/pages/PageContent.vue"),
    redirect: "/Mistaken/BasicMistaken/MistakenOverview",
    children: [
      {
        path: "MistakenOverview",
        name: "Mistaken-BasicMistaken-MistakenOverview",
        meta: {
          title: "基础错误概览",
        },
        component: () =>
          import("@/pages/MistakenPage/BasicMistaken/MistakenOverview.vue"),
      },
      {
        path: "MistakenList",
        name: "Mistaken-BasicMistaken-MistakenList",
        meta: {
          title: "基础错误列表",
        },
        component: () =>
          import("@/pages/MistakenPage/BasicMistaken/MistakenList.vue"),
      },
    ],
  },
  {
    name: "Mistaken-InterfaceMistaken",
    path: "/Mistaken/InterfaceMistaken",
    meta: {
      menu: [
        {
          name: "错误概览",
          path: "/Mistaken/InterfaceMistaken/MistakenOverview",
        },
        {
          name: "错误列表",
          path: "/Mistaken/InterfaceMistaken/MistakenList",
        },
      ],
    },
    component: () => import("@/pages/PageContent.vue"),
    redirect: "/Mistaken/InterfaceMistaken/MistakenOverview",
    children: [
      {
        path: "MistakenOverview",
        name: "Mistaken-InterfaceMistaken-MistakenOverview",
        meta: {
          title: "接口错误概览",
        },
        component: () =>
          import("@/pages/MistakenPage/InterfaceMistaken/MistakenOverview.vue"),
      },
      {
        path: "/MistakenPage/InterfaceMistaken/",
        name: "Mistaken-InterfaceMistaken-MistakenList",
        meta: {
          title: "接口错误列表",
        },
        component: () =>
          import("@/pages/MistakenPage/InterfaceMistaken/MistakenList.vue"),
      },
    ],
  },
  {
    name: "Mistaken-ResourceMistaken",
    path: "/Mistaken/ResourceMistaken",
    meta: {
      title: "资源错误",
    },
    component: () => import("@/pages/MistakenPage/ResourceMistaken.vue"),
  },
  // 行为页面
  {
    name: "Behavior-BehaviorSearch",
    path: "/Behavior/BehaviorSearch",
    meta: {
      title: "行为搜索",
    },
    component: () => import("@/pages/BehaviorPage/BehaviorSearch.vue"),
  },
  {
    name: "Behavior-BehaviorDetail",
    path: "/Behavior/BehaviorDetail",
    meta: {
      title: "行为详情",
    },
    component: () => import("@/pages/BehaviorPage/BehaviorDetail.vue"),
  },
  // 性能页面
  {
    name: "Performance-PagePerformance",
    path: "/Performance/PagePerformance",
    meta: {
      title: "页面性能",
    },
    component: () => import("@/pages/PerformancePage/PagePerformance.vue"),
  },
  {
    name: "Performance-InterfacePerformance",
    path: "/Performance/InterfacePerformance",
    meta: {
      title: "接口性能",
    },
    component: () => import("@/pages/PerformancePage/InterfacePerformance.vue"),
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
