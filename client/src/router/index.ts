import { createRouter, createWebHistory } from "vue-router";
import PageNotFound from "../pages/PageNotFound.vue";
import UserManagement from "../pages/UserManagement.vue";
import Login from "../pages/Login.vue";
import { useAuthStore } from "../stores/auth";
import { Role } from "../types/user";

const routes = [
  { path: "/", component: Login },
  { path: "/login", component: Login },
  { path: "/admin/user-management", component: UserManagement },
  { path: "/admin/society-management", component: SocietyManagement },
  { path: "/:pathMatch(.*)*", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.path !== "/" && !auth.isAuthenticated) {
    return next("/");
  }

  if (to.path === "/" && auth.isAuthenticated) {
    switch (auth.user?.role) {
      case Role.ADMIN:
        return next("/admin/user-management");
      case Role.TEACHER:
        return next("/teacher");
      case Role.STUDENT:
        return next("/student");
      default:
        return next("/");
    }
  }

  next();
});

export default router;
