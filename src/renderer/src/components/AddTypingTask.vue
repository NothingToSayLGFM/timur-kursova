<template>
  <v-form @submit.prevent="submit">
    <v-text-field label="title" variant="outlined" v-model="formData.title"></v-text-field>
    <v-textarea label="description" variant="outlined" v-model="formData.description"></v-textarea>
    <v-text-field
      label="answer"
      append-icon="mdi-check-decagram"
      v-model="formData.rightUnswer"
      variant="outlined"
    ></v-text-field>
    <v-btn block color="success" :loading="isLoading" :disabled="isLoading" type="submit"
      >sumbit</v-btn
    >
  </v-form>
</template>

<script setup>
import { useTasksStore } from '../stores/tasks'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useTasksStore()
const isLoading = ref(false)

const formData = reactive({
  title: '',
  description: '',
  rightUnswer: '',
  type: 'typing'
})

async function submit() {
  console.log(formData)
  if (!formData.title || !formData.description || !formData.rightUnswer) return
  isLoading.value = true
  await store.createTask(formData)
  isLoading.value = false
  router.push({ name: 'home' })
}
</script>
