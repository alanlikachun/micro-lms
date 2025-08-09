<template>
  <div>
    <h1>User Management</h1>

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

    <h2>Existing Users</h2>
    <table class="user-table" border="1" cellspacing="0" cellpadding="6">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { createUser, getUsers } from "../services/userService";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const users = ref<User[]>([]);
const newUser = ref({
  name: "",
  email: "",
  password: "",
  role: "",
});

const fetchUsers = async () => {
  try {
    const response = await getUsers();
    users.value = response;
  } catch (err) {
    alert("Failed to fetch users");
  }
};

async function addUser() {
  if (!newUser.value.role) {
    alert("Please select a role");
    return;
  }
  try {
    const createdUser = await createUser(newUser.value);
    alert("User added");
    users.value.push(createdUser);
    newUser.value = { name: "", email: "", password: "", role: "" };
  } catch (err) {
    alert("Failed to add user");
  }
}

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
</style>
