import type { Task } from '../types/task'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task2', () => {
  const taskList = ref<Task[]>([])
  const nextId = ref(1)

  function loadFromLocalStorage() {
    if (import.meta.client) {
      const stored = localStorage.getItem('tasks')
      if (stored !== null) {
        taskList.value = JSON.parse(stored) as Task[]
        if (taskList.value.length > 0) {
          nextId.value = Math.max(...taskList.value.map(t => t.id)) + 1
        }
        else {
          taskList.value = []
          nextId.value = 1
        }
      }
    }
  }

  function saveToLocalStorage(text?: string) {
    if (text !== undefined) {
      taskList.value.push({
        text,
        completed: false,
        id: nextId.value++,
      })
    }

    if (import.meta.client) {
      localStorage.setItem('tasks', JSON.stringify(taskList.value))
    }
  }

  function checkTask(id: number) {
    const task = taskList.value.find(t => t.id === id)
    if (task) {
      task.completed = !task.completed
      if (import.meta.client) {
        localStorage.setItem('tasks', JSON.stringify(taskList.value))
      }
    }
  }

  function deleteTask(id: number) {
    taskList.value = taskList.value.filter(t => t.id !== id)
    if (import.meta.client) {
      localStorage.setItem('tasks', JSON.stringify(taskList.value))
    }
  }

  return {
    taskList,
    nextId,

    loadFromLocalStorage,
    saveToLocalStorage,
    checkTask,
    deleteTask,
  }
})
