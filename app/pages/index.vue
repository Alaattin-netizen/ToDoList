<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
const task = ref <string> ('')

function saveTask() {
  if (task.value.trim() !== '') {
    taskStore.saveToLocalStorage(task.value.trim())
    console.warn('Task saved:', task.value)
    task.value = ''
  }
  else {
    console.warn('Task cannot be empty')
  }
}

onMounted(() => {
  taskStore.loadFromLocalStorage()
})
</script>

<template>
  <div class="form-group">
    <textarea id="task" v-model="task" rows="5" placeholder="Enter new task..." required />
    <button @click="saveTask">
      Save Task
    </button>
  </div>
  <div>
    <h2>Tasks</h2>
    <li v-for="task in taskStore.taskList" :key="task.id">
      {{ task.text }}
      <input
        type="checkbox"
        :checked="task.completed"
        @change="taskStore.checkTask(task.id)"
      >
      <button @click="taskStore.deleteTask(task.id)">
        ✕
      </button>
    </li>
  </div>
</template>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100;
}

textarea {
  border-radius: 12px;
  border: 1px solid #ccc;
}
button {
  cursor: pointer;
  color: whitesmoke;
  background-color: green;
}

li button{
color: white;
background-color: red;
}

li {
  border-bottom: 1px solid #ccc;
}
</style>
