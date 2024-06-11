<template>
  <div class="test">
    {{ task.type }}
    <h1>
      Title: <span>{{ task.title }}</span>
    </h1>
    <h3>
      Desc: <span>{{ task.description }}</span>
    </h3>

    <div class="variants">
      <v-radio-group v-model="answer">
        <v-radio
          v-for="quesion in task.questions"
          :key="`quesion-${quesion}`"
          :label="quesion"
          :id="quesion"
          :value="quesion"
        ></v-radio>
      </v-radio-group>
    </div>
    <v-btn color="success" @click="sumbit">submit</v-btn>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useTasksStore } from '../stores/tasks'
import { useUserStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const answer = ref('')

const tasks = useTasksStore()
const user = useUserStore()

const task = computed(() => {
  return tasks.activeTask
})

async function sumbit() {
  await user.answerQuestion(task.value.id, answer.value)
  router.push({ name: 'home' })
}
</script>

<style scoped lang="scss">
h3 {
  margin-bottom: 30px;
}
</style>
