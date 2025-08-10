<template>
  <div>
    <EditUserModal
      :visible="isModalVisible"
      :user="currentUser"
      @close="closeModal"
      @save="saveUser"
    />
    <h1>User Management</h1>

    <div
      v-if="authStore.isAuthenticated && authStore.user?.role === Role.ADMIN"
    >
      <h2>Add New User</h2>
      <form class="add-user-form" @submit.prevent="addUser">
        <input v-model="newUser.name" placeholder="Name" required />
        <input
          v-model="newUser.email"
          placeholder="Email"
          type="email"
          required
        />
        <input
          v-model="newUser.password"
          placeholder="Password"
          type="password"
          required
        />
        <select v-model="newUser.role" required>
          <option disabled value="">Select role</option>
          <option value="ADMIN">Admin</option>
          <option value="TEACHER">Teacher</option>
          <option value="STUDENT">Student</option>
        </select>
        <button type="submit">Add User</button>
      </form>
    </div>
    <h2>Existing Users</h2>
    <table class="user-table" border="1" cellspacing="0" cellpadding="6">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td class="actions">
            <button @click="openModal(user)">Edit</button
            ><button
              v-if="authStore.user?.role === Role.ADMIN"
              @click="deleteUser(user._id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  createUser,
  deleteUsers,
  getUsers,
  updateUser,
} from "../services/userService";
import EditUserModal from "../components/EditUserModal.vue";
import type { User } from "../types/user";
import { Role } from "../types/user";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

const users = ref<User[]>([]);
const newUser = ref({
  name: "",
  email: "",
  password: "",
  role: "",
});
const isModalVisible = ref(false);
const currentUser = ref<User | null>(null);

const fetchUsers = async () => {
  let query;

  if (authStore.user?.role === Role.TEACHER) {
    query = { role: Role.STUDENT };
  }

  try {
    const response = await getUsers(query);
    users.value = response.data;
  } catch (err) {
    alert("Failed to fetch users");
  }
};

const addUser = async () => {
  if (!newUser.value.role) {
    alert("Please select a role");
    return;
  }
  try {
    await createUser(newUser.value);
    alert("User added");
    newUser.value = { name: "", email: "", password: "", role: "" };
    fetchUsers();
  } catch (err) {
    alert("Failed to add user");
  }
};

const saveUser = async (updatedUserData: User) => {
  try {
    console.log("Saving user:", updatedUserData);

    await updateUser(updatedUserData._id, updatedUserData);
    alert("User updated");
    closeModal();
    fetchUsers();
  } catch (err) {
    alert("Failed to update user");
  }
};

const deleteUser = async (id: string) => {
  if (confirm("Are you sure you want to delete this user?")) {
    try {
      await deleteUsers([id]);
      users.value = users.value.filter((user) => user._id !== id);
    } catch (err) {
      alert("Failed to delete user");
    }
  }
};

const openModal = (user: User) => {
  currentUser.value = user;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
  currentUser.value = null;
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.user-table {
  width: 100%;
}

.add-user-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
