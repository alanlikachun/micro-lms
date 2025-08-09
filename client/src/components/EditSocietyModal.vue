<template>
  <div v-if="show" class="modal-backdrop">
    <div class="modal">
      <h2>Edit Society</h2>

      <form @submit.prevent="save">
        <div class="form-row">
          <label class="form-label" for="name">Name:</label>
          <input class="form-input" id="name" v-model="form.name" required />
        </div>

        <div class="form-row">
          <label class="form-label" for="managedBy">Managed By:</label>
          <div class="checkbox-scroll" id="managedBy">
            <div
              v-for="teacher in teachers"
              :key="teacher._id"
              class="checkbox-item"
            >
              <input
                type="checkbox"
                :value="teacher._id"
                v-model="form.managedBy"
                :id="`teacher-${teacher._id}`"
              />
              <label :for="`teacher-${teacher._id}`">{{ teacher.name }}</label>
            </div>
          </div>
        </div>

        <div class="modal-actions">
          <button type="submit">Save</button>
          <button type="button" @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import type { Society } from "../types/society";
import type { User } from "../types/user";

const props = defineProps<{
  show: boolean;
  society: Society | null;
  teachers: User[];
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (
    e: "save",
    society: { _id: string; name: string; managedBy: string[] }
  ): void;
}>();

const form = reactive({
  name: "",
  managedBy: props.society?.managedBy.map((m) => m._id) || [],
});

const save = () => {
  emit("save", {
    _id: props.society?._id || "",
    name: form.name,
    managedBy: form.managedBy,
  });
};

watch(
  () => props.society,
  (newSociety) => {
    if (newSociety) {
      form.name = newSociety.name;
      form.managedBy = newSociety.managedBy.map((m) => m._id);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: #242424;
  padding: 1rem;
  border-radius: 8px;
  width: 400px;
}
.modal-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
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
.checkbox-scroll {
  flex: 2 1 0;
  max-height: 120px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  background: #181818;
  border-radius: 4px;
  padding: 0.5rem;
}
.checkbox-item {
  display: flex;
  align-items: center;
  width: 48%;
  margin-bottom: 0.25rem;
}
</style>
