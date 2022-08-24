import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    keepAlive?: boolean;
    hiddenHeader?: boolean;
  }
}

const routeRecordRaws: Array<RouteRecordRaw> = [
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
      hiddenHeader: true,
      title: "写文章",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routeRecordRaws],
});

router.afterEach((to, _from) => {
  document.title = to.meta.title
    ? "稀土掘金-" + (to.meta.title || "")
    : "Balabala云-稀土掘金";
});

export default router;
