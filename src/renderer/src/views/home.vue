<template>
  <v-container>
    <v-row>
      <v-col cols="6" v-for="(task, index) in currentTasks" :key="`task-${index}`">
        <Card :task="task" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useTasksStore } from '../stores/tasks'
import Card from '../components/Card.vue'

const tasks = useTasksStore()

const currentTasks = computed(() => {
  return tasks.tasks
})

onMounted(async () => {
  await tasks.getTasks()
})
</script>
