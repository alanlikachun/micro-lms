<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h2>Edit User</h2>
      <form @submit.prevent="saveUser">
        <div class="form-row">
          <label class="form-label">Name:</label>
          <input class="form-input" v-model="form.name" type="text" required />
        </div>

        <div class="form-row">
          <label class="form-label">Email:</label>
          <input
            class="form-input"
            v-model="form.email"
            type="email"
            required
          />
        </div>

        <div class="form-row">
          <label class="form-label">Role:</label>
          <select class="form-input" v-model="form.role">
            <option value="ADMIN">Admin</option>
            <option value="TEACHER">Teacher</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>

        <div class="actions">
          <button type="submit">Save</button>
          <button type="button" @click="close">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { type User, Role } from "../types/user";

const props = defineProps<{
  visible: boolean;
  user: User | null;
}>();

const emits = defineEmits<{
  (e: "close"): void;
  (e: "save", updatedUser: User): void;
}>();

const form = reactive<User>({
  _id: "",
  name: "",
  email: "",
  role: Role.STUDENT,
});

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      Object.assign(form, newUser);
    }
  },
  { immediate: true }
);

const saveUser = () => {
  emits("save", { ...form });
};

const close = () => {
  emits("close");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #242424;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}
.actions {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
.actions button {
  margin-left: 10px;
}
.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
.form-label {
  flex: 1 0;
  text-align: left;
}
.form-input {
  flex: 2 1 0;
}
</style>
