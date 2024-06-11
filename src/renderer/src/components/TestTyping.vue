<template>
  <div class="test">
    <h1>
      Title: <span>{{ task.title }}</span>
    </h1>
    <h3>
      Desc: <span>{{ task.description }}</span>
    </h3>
    <v-text-field label="Your answer" v-model="answer"></v-text-field>
    <!-- <template v-if="task.type === 'checkboxes'">
      <p v-for="(answer, index) in task.rightUnswer" :key="`multianswer-${index}`">
        Answer: <span>{{ answer }}</span>
      </p>
      <div class="variants">
        <p v-for="(variant, index) in task.questions" :key="`checkboxes-${index}`">
          Variant: <span>{{ variant }} </span>
        </p>
      </div>
    </template>
    <template v-if="task.type === 'oneof'">
      <p>
        Answer: <span>{{ task.rightUnswer }}</span>
      </p>
      <div class="variants">
        <p v-for="variant in task.questions" :key="`radios-${variant}`">
          Variant: <span>{{ variant }}</span>
        </p>
      </div>
    </template> -->
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
