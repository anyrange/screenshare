import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "index",
      path: "/",
      component: () => import("../pages/Index.vue"),
    },
    {
      name: "room",
      path: "/room/:id",
      component: () => import("../pages/Room.vue"),
    },
  ],
});

export default router;
