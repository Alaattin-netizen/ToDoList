<script setup lang="ts">
import type { Task } from '@/types/task'

defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  check: [id: number]
  delete: [id: number]
}>()
</script>

<template>
  <li
    class="
      bg-white
      rounded-xl
      border border-gray-300
      hover:border-green-500
      p-3 md:p-4
      flex
      flex-col sm:flex-row
      items-start sm:items-center
      gap-3 sm:gap-4
      transition-all
      duration-200
    "
  >
    <input
      type="checkbox"
      :checked="task.completed"
      class="
          w-5 h-5
          rounded
          border-gray-300
          cursor-pointer
        "
      @change="emit('check', task.id)"
    >

    <span
      class="
        text-sm md:text-base
        break-words
        flex-1
        min-w-0
      "
    >
      {{ task.text }}
    </span>

    <button class="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded" @click="emit('delete', task.id)">
      ✕
    </button>
  </li>
</template>
