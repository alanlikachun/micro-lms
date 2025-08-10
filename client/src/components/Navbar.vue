<template>
  <nav class="navbar">
    <div class="navbar-left">
      <RouterLink to="/" class="logo">Micro-LMS</RouterLink>
      <RouterLink
        v-if="authStore.isAuthenticated && authStore.user?.role === Role.ADMIN"
        to="/admin/user-management"
      >
        User
      </RouterLink>
      <RouterLink
        v-if="authStore.isAuthenticated && authStore.user?.role === Role.ADMIN"
        to="/admin/society-management"
      >
        Society
      </RouterLink>
      <RouterLink
        v-if="
          authStore.isAuthenticated && authStore.user?.role === Role.TEACHER
        "
        to="/teacher"
      >
        Teacher
      </RouterLink>
      <RouterLink
        v-if="
          authStore.isAuthenticated && authStore.user?.role === Role.STUDENT
        "
        to="/student"
      >
        Student
      </RouterLink>
    </div>

    <div class="navbar-right">
      <span v-if="authStore.isAuthenticated" class="user-info">
        {{ authStore.user?.name }}
      </span>
      <button v-if="authStore.isAuthenticated" @click="logout">Logout</button>
      <RouterLink v-else to="/login">Login</RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { useRouter, RouterLink } from "vue-router";
import { Role } from "../types/user";

const authStore = useAuthStore();
const router = useRouter();
console.log(authStore.isAuthenticated);

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2d3e50;
  color: white;
  padding: 10px 20px;
}
.navbar-left a {
  margin-right: 15px;
  color: white;
  text-decoration: none;
}
.navbar-left a.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid white;
}
.navbar-right {
  display: flex;
  align-items: center;
}
.user-info {
  margin-right: 10px;
}
button {
  background: #ff4b4b;
  border: none;
  padding: 5px 10px;
  color: white;
  cursor: pointer;
}
button:hover {
  background: #e04141;
}
</style>
