<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
const text = ref <string> ('')

function saveTask() {
  if (text.value.trim() !== '') {
    taskStore.saveToLocalStorage(text.value.trim())
    console.warn('Task saved:', text.value)
    text.value = ''
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
  <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center">
    Task Manager
  </h1>

  <div>
    <textarea
      v-model="text"
      rows="4"
      placeholder="Enter new task..."
      class="
            w-full
            rounded-lg
            border border-gray
            p-3 md:p-4
            text-sm md:text-base
            focus:outline-none
           focus:ring-2 focus:ring-green-500
            resize-none
            transition
          "
      required
    />
    <button class="bg-green-500 font-bold text-center text-white px-2 py-1 rounded" @click="saveTask">
      Save Task
    </button>
  </div>
  <div>
    <h2 class="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
      Tasks
    </h2>
    <ul class="space-y-3 md:space-y-4">
      <TaskCard
        v-for="task in taskStore.taskList"
        :key="task.id"
        :task="task"
        @check="taskStore.checkTask"
        @delete="taskStore.deleteTask"
      />
    </ul>
  </div>
</template>
