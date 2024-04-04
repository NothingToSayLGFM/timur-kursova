<template>
  <v-container class="k-container">
    <v-form @submit.prevent="login" class="form">
      <v-text-field v-model="formData.login" label="Name"></v-text-field>
      <v-text-field type="password" v-model="formData.password" label="Password"></v-text-field>
      <v-btn :loading="isLoading" :disabled="isLoading" type="submit" color="success" block
        >submit</v-btn
      >
    </v-form>
    <p class="err" v-if="isFail">wrong credentials</p>
  </v-container>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/auth'

const store = useUserStore()
const router = useRouter()

const formData = reactive({
  login: '',
  password: ''
})

const isLoading = ref(false)

const isFail = computed(() => {
  return store.fail
})

async function login() {
  if (!formData.login || !formData.password) return
  isLoading.value = true
  await store.login(formData)
  isLoading.value = false
  if (!isFail.value) {
    router.push({ name: 'home' })
  }
}
</script>

<style lang="scss" scoped>
.err {
  color: red;
}
</style>
