import { defineStore } from 'pinia'

// todo: tipler için bir types.ts veya types/task.ts dosyası oluşturup Task interface'ini oraya taşıyabilirsin.
interface Task {
  id: number
  text: string
  completed: boolean
}

// todo: bu eski bir yazım yöntemi yeni projelerde bunu göremezsin. doğrusunu sayfanın altına bırakıyorum
export const useTaskStore = defineStore('task', {
  state: () => ({
    taskList: [] as Task[],
    nextId: 1,

  }),
  actions: {
    loadFromLocalStorage() {
      if (import.meta.client) {
        const stored = localStorage.getItem('tasks')
        if (stored !== null) {
          this.taskList = JSON.parse(stored) as Task[]
          if (this.taskList.length > 0) {
            this.nextId = Math.max(...this.taskList.map(t => t.id)) + 1
          }
          else {
            this.taskList = []
            this.nextId = 1
          }
        }
      }
    },
    saveToLocalStorage(text?: string) {
      if (text !== undefined) {
        this.taskList.push({
          text,
          completed: false,
          id: this.nextId++,
        })
      }

      if (import.meta.client) {
        localStorage.setItem('tasks', JSON.stringify(this.taskList))
      }
    },

    checkTask(id: number) {
      const task = this.taskList.find(t => t.id === id)
      if (task) {
        task.completed = !task.completed
        if (import.meta.client) {
          localStorage.setItem('tasks', JSON.stringify(this.taskList))
        }
      }
    },
    deleteTask(id: number) {
      this.taskList = this.taskList.filter(t => t.id !== id)
      if (import.meta.client) {
        localStorage.setItem('tasks', JSON.stringify(this.taskList))
      }
    },
  },
})

// yeni yazım yöntemi

// export const useTaskStore2 = defineStore('taskt2', () => {
//   const taskList = ref<Task[]>([])

//   const loadFromLocalStorage = () => {

//   }

//   return {
//     taskList,
//     loadFromLocalStorage,
//   }
// })
