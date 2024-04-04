<template>
  <v-card>
    <v-card-item>
      <v-card-title>{{ name }}</v-card-title>
    </v-card-item>
    <v-card-actions>
      <v-btn block color="#ff0e0e" @click="deleteUser(id)"> delete </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useUserStore } from '../stores/auth'

const props = defineProps({
  name: {
    type: String
  },
  id: {
    type: String
  }
})

const store = useUserStore()

async function deleteUser(id) {
  if (id !== '1') {
    await store.deleteUser(id)
  }
}
</script>
