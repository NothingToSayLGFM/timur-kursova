<template>
  <v-card>
    <v-card-item>
      <v-card-title>{{ task.title }}</v-card-title>
    </v-card-item>
    <v-card-text>{{ task.description }}</v-card-text>
    <v-card-actions v-if="isAdmin !== 'admin'">
      <v-btn variant="flat" color="#5865f2" block> start </v-btn>
      <!-- <v-btn variant="flat" color="success" block disabled> done </v-btn> -->
    </v-card-actions>
    <template v-else>
      <v-card-actions>
        <v-btn variant="flat" color="#5865f2" block> view </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn variant="flat" color="red" block @click="deleteTask"> delete </v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script setup>
import { useUserStore } from '../stores/auth'
import { useTasksStore } from '../stores/tasks'
import { computed } from 'vue'

const props = defineProps({
  task: {
    type: Object
  }
})

const users = useUserStore()
const tasks = useTasksStore()

const isAdmin = computed(() => {
  return users.user ? users.user[0]?.role : false
})

async function deleteTask() {
  await tasks.deleteTask(props.task.id)
}
</script>
