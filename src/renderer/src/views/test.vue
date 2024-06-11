<template>
  <v-container>
    <TestTyping v-if="task.type === 'typing'" />
    <TestMulti v-if="task.type === 'checkboxes'" />
    <TestOneOf v-if="task.type === 'oneof'" />
  </v-container>
</template>

<script setup>
import TestTyping from '../components/TestTyping.vue'
import TestMulti from '../components/TestMulti.vue'
import TestOneOf from '../components/TestOneOf.vue'

import { onMounted, computed } from 'vue'
import { useTasksStore } from '../stores/tasks'
import { useRoute } from 'vue-router'

const route = useRoute()

const tasks = useTasksStore()

const task = computed(() => {
  return tasks.activeTask
})

onMounted(async () => {
  await tasks.getTask(route.params.id)
})
</script>
