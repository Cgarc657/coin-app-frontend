<script setup>
import { useAuth } from '@/composables/useAuth'

const { currentUser, logout } = useAuth()
</script>

<template>
  <div>
    <nav class="navbar">
      <div class="nav-links">
        <RouterLink to="/">Home</RouterLink>

        <RouterLink v-if="!currentUser" to="/login"> Login </RouterLink>

        <RouterLink v-if="!currentUser" to="/register"> Register </RouterLink>

        <RouterLink to="/favorites"> Favorites </RouterLink>
      </div>

      <div v-if="currentUser" class="user-info">
        <span>{{ currentUser.email }}</span>

        <button @click="logout">Logout</button>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #111827;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.user-info {
  margin-left: auto;
  display: flex;
  gap: 1rem;
  align-items: center;
  color: white;
}

button {
  border: none;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
}

a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

a.router-link-active {
  color: #60a5fa;
}
</style>
