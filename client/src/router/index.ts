import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../pages/HelloWorld.vue";
import PageNotFound from "../pages/PageNotFound.vue";

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/:pathMatch(.*)*", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
