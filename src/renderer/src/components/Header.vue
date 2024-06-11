<template>
  <v-container class="k-container">
    <v-row>
      <v-col cols="1" class="logo-w"><RouterLink to="/" class="logo">Logo</RouterLink></v-col>
      <v-col class="menu" cols="11">
        <template v-if="user.role">
          <v-btn :to="{ name: 'add_user' }">add user</v-btn>
          <v-btn :to="{ name: 'add_task' }">add tasks</v-btn>
        </template>
        <v-btn v-if="!user" :to="{ name: 'login' }">login</v-btn>
        <v-btn @click="logout" color="#ff0e0e" v-else>logout</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/auth'

const store = useUserStore()
const router = useRouter()

const user = computed(() => {
  return store.user ? store.user[0] : false
})

function logout() {
  router.push({ name: 'login' })
  store.logout()
}
</script>

<style scoped lang="scss">
.k-container {
  background-color: rgb(45, 105, 202);
  a {
    text-decoration: none;
  }
}
.logo {
  color: #fff;
  font-weight: bold;
}
.logo-w {
  display: flex;
  align-items: center;
}
.menu {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
