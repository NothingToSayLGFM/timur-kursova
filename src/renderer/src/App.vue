<template>
  <p>some</p>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import axios from 'axios'

onMounted(async () => {
  const a = await axios.get('http://localhost:3000/tasks')
  console.log(a)
})
</script>
