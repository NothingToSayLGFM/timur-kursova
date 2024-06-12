<template>
  <v-container>
    <UpdateTmp />
  </v-container>
</template>

<script setup>
import UpdateTmp from '../components/UpdateTmp.vue'
import { onMounted } from 'vue'
import { useTasksStore } from '../stores/tasks'
import { useRoute } from 'vue-router'

const tasks = useTasksStore()
const route = useRoute()

onMounted(async () => {
  await tasks.getTask(route.params.id)
})
</script>
