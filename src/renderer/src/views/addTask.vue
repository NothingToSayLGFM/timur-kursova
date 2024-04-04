<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-radio-group v-model="variant">
          <v-radio id="typ" color="indigo" label="Typing answer" value="typ"></v-radio>
          <v-radio id="multi" color="indigo" label="Multi answer" value="multi"></v-radio>
          <v-radio id="radio" color="indigo" label="One of answer" value="radio"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col>
        <component :is="componentis" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import AddVariantTask from '../components/AddVariantTask.vue'
import AddTypingTask from '../components/AddTypingTask.vue'
import AddMultiVTask from '../components/AddMultiVTask.vue'

const variant = ref('typ')

const a = {
  AddVariantTask,
  AddTypingTask,
  AddMultiVTask
}

const componentis = computed(() => {
  switch (variant.value) {
    case 'typ':
      return a.AddTypingTask
    case 'multi':
      return a.AddMultiVTask
    case 'radio':
      return a.AddVariantTask
    default:
      return a.AddTypingTask
  }
})
</script>
