<template>
  <v-card>
    <v-card-item>
      <v-card-title>{{ task.title }}</v-card-title>
    </v-card-item>
    <v-card-text>{{ task.description }}</v-card-text>
    <v-card-actions v-if="isAdmin !== 'admin'">
      <v-btn
        variant="flat"
        :disabled="answered"
        :color="answered ? 'success' : '#5865f2'"
        block
        :to="{ name: 'test', params: { id: task.id } }"
      >
        {{ answered ? 'done' : 'start' }}
      </v-btn>
      <!-- <v-btn variant="flat" color="success" block disabled> done </v-btn> -->
    </v-card-actions>
    <template v-else>
      <v-card-actions>
        <v-btn variant="flat" color="#5865f2" block :to="{ name: 'task', params: { id: task.id } }">
          view
        </v-btn>
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

const answered = computed(() => {
  if (!users.user) return false
  const ids = users.user[0].questions.map((el) => {
    return el.id
  })
  if (ids.includes(props.task.id)) {
    return true
  }
  return false
})

async function deleteTask() {
  await tasks.deleteTask(props.task.id)
}
</script>
