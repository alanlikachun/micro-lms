<template>
  <div>
    <h1>Society Management</h1>

    <h2>Create New Society</h2>
    <form class="create-society-form" @submit.prevent="createNew">
      <input
        class="name-input"
        v-model="newSociety.name"
        placeholder="Society name"
        required
      />

      <button type="submit">Create</button>
    </form>

    <h2>Existing Societies</h2>
    <table class="society-table" border="1" cellspacing="0" cellpadding="6">
      <thead>
        <tr>
          <th>Name</th>
          <th>Managed By</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="society in societies" :key="society._id">
          <td>{{ society.name }}</td>
          <td>
            <span v-if="society.managedBy && society.managedBy.length > 0">
              {{ society.managedBy.map((m) => m.name).join(", ") }}
            </span>
            <span v-else>No manager</span>
          </td>
          <td>
            <button @click="deleteSociety(society._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Society } from "../types/society";
import {
  createSociety,
  getSocieties,
  deleteSocieties,
} from "../services/societyService";

const societies = ref<Society[]>([]);
const newSociety = ref({ name: "", description: "" });

const fetchSocieties = async () => {
  const result = await getSocieties();
  societies.value = result;
};

const createNew = async () => {
  const result = await createSociety(newSociety.value);
  newSociety.value = { name: "", description: "" };
  societies.value.push(result);
};

const deleteSociety = async (id: string) => {
  await deleteSocieties([id]);
  fetchSocieties();
};

onMounted(() => {
  fetchSocieties();
});
</script>

<style scoped>
.create-society-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.name-input {
  flex: 1;
}

.society-table {
  width: 100%;
}
</style>
