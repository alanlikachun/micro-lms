<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="submitLogin">
      <input
        class="form-input"
        v-model="email"
        type="email"
        placeholder="Email"
        required
      />
      <input
        class="form-input"
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { Role } from "../types/user";

const email = ref("");
const password = ref("");
const error = ref("");
const authStore = useAuthStore();
const router = useRouter();

const submitLogin = async () => {
  try {
    await authStore.login(email.value, password.value);

    if (authStore.user?.role === Role.ADMIN) {
      router.push("/user-management");
    } else if (authStore.user?.role === Role.TEACHER) {
      router.push("/teacher");
    } else {
      router.push("/student");
    }
  } catch (err: any) {
    error.value = err.response?.data?.error || "Login failed";
  }
};
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
}
.error {
  color: red;
}

.form-input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  box-sizing: border-box;
}
</style>
