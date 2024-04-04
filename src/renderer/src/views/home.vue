<template>
  <v-container>
    <v-row>
      <v-col cols="6" v-for="n in 10" :key="`task-${n}`">
        <Card typeOf="student" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import Card from '../components/Card.vue'

// onMounted(async () => {
//   const a = await axios.get('http://localhost:3000/tasks')
//   console.log(a)
// })
</script>
