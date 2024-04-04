<template>
  <v-dialog v-model="model">
    <v-form class="l-form" @submit.prevent="submit">
      <p class="l-title">Add User Form</p>
      <v-text-field v-model="formData.login" label="login" variant="outlined"></v-text-field>
      <v-text-field v-model="formData.password" label="password" variant="outlined"></v-text-field>
      <v-btn color="success" :loading="isLoading" :disabled="isLoading" type="submit">add</v-btn>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '../stores/auth'

const model = defineModel()
const emit = defineEmits(['close'])
const store = useUserStore()

const formData = reactive({
  login: '',
  password: '',
  questions: []
})

const isLoading = ref(false)

async function submit() {
  if (!formData.login || !formData.password) return
  isLoading.value = true
  await store.addUser(formData)
  isLoading.value = false
  formData.login = ''
  formData.password = ''
  emit('close')
}
</script>

<style lang="scss" scoped>
.l-form {
  padding: 20px;
  background-color: #fff;
}
.l-title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
