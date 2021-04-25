import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    // route level code-splitting
    // this generates a separate chunk (profile.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
  },
  {
    path: "/things/:hash",
    name: "Thing",
    // route level code-splitting
    // this generates a separate chunk (thing.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "thing" */ "../views/Thing.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
