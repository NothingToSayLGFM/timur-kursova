<template>
  <v-form @submit.prevent="submitHandler">
    <v-text-field label="title" variant="outlined" v-model="title"></v-text-field>
    <v-textarea label="description" variant="outlined" v-model="description"></v-textarea>
    <p class="v-title">Variants</p>
    <v-text-field
      class="mb-5"
      hide-details="auto"
      variant="outlined"
      label="variant"
      v-model="inputsValues.first"
    ></v-text-field>
    <v-text-field
      class="mb-5"
      hide-details="auto"
      variant="outlined"
      label="variant"
      v-model="inputsValues.second"
    ></v-text-field>
    <v-text-field
      class="mb-5"
      hide-details="auto"
      variant="outlined"
      label="variant"
      v-model="inputsValues.three"
    ></v-text-field>
    <p class="v-title second">Right answer</p>
    <v-text-field
      v-model="right"
      class="mb-5"
      hide-details="auto"
      variant="outlined"
      label="answer"
    ></v-text-field>
    <v-btn
      :loading="isLoading"
      :disabled="isLoading"
      block
      class="submit"
      type="submit"
      color="success"
      >sumbit</v-btn
    >
  </v-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useTasksStore } from '../stores/tasks'
import { useRouter } from 'vue-router'

const store = useTasksStore()

const router = useRouter()

const inputsValues = reactive({
  first: '',
  second: '',
  three: ''
})
const right = ref('')
const title = ref('')
const description = ref('')

const isLoading = ref(false)

async function submitHandler() {
  if (!Object.values(inputsValues).includes(right.value) || !title.value || !description.value)
    return

  let data = {
    questions: Object.values(inputsValues),
    rightUnswer: right.value,
    title: title.value,
    description: description.value,
    type: 'oneof'
  }

  isLoading.value = true
  await store.createTask(data)
  isLoading.value = false
  router.push({ name: 'home' })
}
</script>
<style scoped lang="scss">
.wrap {
  .plus {
    margin-top: 15px;
  }
}
.radio-s {
  display: flex;
  gap: 5px;
}
.block {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 15px;
}
.submit {
  margin-top: 15px;
}
.v-title {
  margin-bottom: 10px;
}
.second {
  margin-top: 15px;
}
</style>
