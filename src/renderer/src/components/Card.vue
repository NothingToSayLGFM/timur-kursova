<template>
  <v-card>
    <v-card-item>
      <v-card-title>some3</v-card-title>
    </v-card-item>
    <v-card-text>some2</v-card-text>
    <v-card-actions v-if="isAdmin !== 'admin'">
      <v-btn variant="flat" color="#5865f2" block> start </v-btn>
      <!-- <v-btn variant="flat" color="success" block disabled> done </v-btn> -->
    </v-card-actions>
    <v-card-actions v-else>
      <v-btn variant="flat" color="#5865f2" block> edit </v-btn>
      <!-- <v-btn variant="flat" color="success" block disabled> done </v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useUserStore } from '../stores/auth'
import { computed } from 'vue'

const store = useUserStore()

const isAdmin = computed(() => {
  return store.user ? store.user[0]?.role : false
})
</script>
