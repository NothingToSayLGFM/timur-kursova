<template>
  <v-form @submit.prevent="submitHandler">
    <v-text-field label="title" variant="outlined" v-model="title"></v-text-field>
    <v-textarea label="description" variant="outlined" v-model="description"></v-textarea>
    <div class="wrap">
      <p class="v-title">Variants</p>
      <div class="block" v-for="(input, index) in inputsValues" :key="`input-${index}`">
        <v-text-field
          v-model="input.value"
          hide-details="auto"
          variant="outlined"
          label="variant"
        ></v-text-field>
        <v-btn @click="minusInput" icon="mdi-minus"></v-btn>
      </div>
      <v-btn @click="plusInput" class="plus" block><v-icon icon="mdi-plus" /></v-btn>
    </div>
    <div class="wrap wrap-s">
      <p class="v-title">Answers</p>
      <div class="block" v-for="(answer, index) in answersValues" :key="`answer-${index}`">
        <v-text-field
          v-model="answer.value"
          hide-details="auto"
          variant="outlined"
          label="answer"
        ></v-text-field>
        <v-btn @click="minusAnswer" icon="mdi-minus"></v-btn>
      </div>
      <v-btn @click="plusAnswer" class="plus" block><v-icon icon="mdi-plus" /></v-btn>
    </div>
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
import { ref } from 'vue'
import { useTasksStore } from '../stores/tasks'
import { useRouter } from 'vue-router'

const inputsValues = ref([])
const answersValues = ref([])

const title = ref('')
const description = ref('')
const isLoading = ref(false)

const router = useRouter()

const store = useTasksStore()

function plusInput() {
  inputsValues.value.push({ value: '' })
}

function minusInput() {
  if (inputsValues.value.length > 0) {
    inputsValues.value.pop()
  }
}

function plusAnswer() {
  answersValues.value.push({ value: '' })
}

function minusAnswer() {
  if (answersValues.value.length > 0) {
    answersValues.value.pop()
  }
}

async function submitHandler() {
  if (
    !inputsValues.value.length ||
    !answersValues.value.length ||
    !title.value ||
    !description.value
  )
    return

  let data = {}
  let answer = answersValues.value
    .map((el) => {
      return Object.values(el)
    })
    .map((el) => {
      return el[0]
    })
    .filter((el) => el !== '')
  let questions = inputsValues.value
    .map((el) => {
      return Object.values(el)
    })
    .map((el) => {
      return el[0]
    })
    .filter((el) => el !== '')

  data.rightUnswer = answer
  data.questions = questions
  data.title = title.value
  data.description = description.value
  data.type = 'checkboxes'

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
.wrap-s {
  margin-top: 15px;
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
</style>
