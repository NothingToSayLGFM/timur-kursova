<template>
  <h1>
    Title: <span>{{ task.title }}</span>
  </h1>
  <h3>
    Desc: <span>{{ task.description }}</span>
  </h3>
  <template v-if="task.type === 'typing'">
    <p>
      Answer: <span>{{ task.rightUnswer }}</span>
    </p>
  </template>
  <template v-if="task.type === 'checkboxes'">
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
  </template>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useTasksStore } from '../stores/tasks'
import { useRoute } from 'vue-router'

const route = useRoute()

const tasks = useTasksStore()

const task = computed(() => {
  return tasks.activeTask
})

onMounted(async () => {
  await tasks.getTask(route.params.id)
})
</script>

<style scoped lang="scss">
.submit {
  position: absolute;
  bottom: 15px;
  right: 50%;
  margin-right: -150px;
  width: 300px;
}
.edit {
  position: absolute;
  bottom: 15px;
  right: 15px;
}
.trash {
  position: absolute;
  bottom: 15px;
  left: 15px;
}
.variants {
  margin-top: 20px;
}
.answer-div {
  margin-top: 20px;
}
</style>
