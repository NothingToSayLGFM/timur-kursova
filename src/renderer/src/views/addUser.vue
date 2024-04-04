<template>
  <v-container>
    <v-btn class="add" block color="blue" @click="toggleModel">add user</v-btn>
    <div class="user-c">
      <UserCard v-for="user in users" :key="`user-${user.id}`" :id="user.id" :name="user.login" />
    </div>
  </v-container>
  <UserAddModal v-model="dialog" @close="toggleModel" />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '../stores/auth'
import UserCard from '../components/UserCard.vue'
import UserAddModal from '../components/UserAddModal.vue'

const dialog = ref(false)
const store = useUserStore()

function toggleModel() {
  dialog.value = !dialog.value
}

const users = computed(() => {
  return store.users
})

onMounted(async () => {
  await store.getUsers()
})
</script>

<style scoped lang="scss">
.user-c {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.add {
  margin-bottom: 15px;
}
</style>
