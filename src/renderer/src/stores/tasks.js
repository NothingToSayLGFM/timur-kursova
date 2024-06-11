import { defineStore } from 'pinia'
import axios from 'axios'

export const useTasksStore = defineStore('tasks', {
  state: () => {
    return {
      tasks: null
    }
  },
  actions: {
    async createTask(data) {
      await axios.post('http://localhost:3000/tasks', data)
      this.getTasks()
    },
    async getTasks() {
      const { data } = await axios.get('http://localhost:3000/tasks')
      this.tasks = data
    },
    async deleteTask(id) {
      await axios.delete(`http://localhost:3000/tasks/${id}`)
      await this.getTasks()
    }
  },
  persist: true
})
