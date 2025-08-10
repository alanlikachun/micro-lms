<template>
  <div>
    <EditSocietyModal
      :show="isEditing"
      :society="currentSociety"
      :teachers="teachers"
      @close="closeModal"
      @save="saveSociety"
    />
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
            <span v-if="society.managedBy && society.managedBy.length > 0" class="truncate">
              {{ society.managedBy.map((m) => m.name).join(", ") }}
            </span>
            <span v-else>No manager</span>
          </td>
          <td class="action_buttons">
            <button @click="editSociety(society)">Edit</button>
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
  updateSociety,
} from "../services/societyService";
import { Role, type User } from "../types/user";
import EditSocietyModal from "../components/EditSocietyModal.vue";
import { getUsers } from "../services/userService";

const societies = ref<Society[]>([]);
const newSociety = ref({ name: "", description: "" });
const isEditing = ref(false);
const currentSociety = ref<Society | null>(null);
const teachers = ref<User[]>([]);

const fetchSocieties = async () => {
  const result = await getSocieties();
  societies.value = result;
};

const fetchTeachers = async () => {
  const result = await getUsers({ role: Role.TEACHER });
  teachers.value = result.data;
};

const createNew = async () => {
  const result = await createSociety(newSociety.value);
  newSociety.value = { name: "", description: "" };
  societies.value.push(result);
};

const editSociety = async (society: Society) => {
  await fetchTeachers();
  isEditing.value = true;
  currentSociety.value = society;
  fetchSocieties();
};

const deleteSociety = async (id: string) => {
  await deleteSocieties([id]);
  fetchSocieties();
};

const closeModal = () => {
  isEditing.value = false;
  currentSociety.value = null;
};

const saveSociety = async (data: {
  _id: string;
  name: string;
  managedBy: string[];
}) => {
  const { _id, name, managedBy } = data;
  await updateSociety(_id, { name, managedBy });
  closeModal();
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

.action_buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.truncate {
  display: inline-block;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
