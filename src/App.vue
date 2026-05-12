<template>
  <div>
    <nav class="navbar">
      <RouterLink to="/">Home</RouterLink>

      <RouterLink to="/login">Login</RouterLink>

      <RouterLink to="/register">Register</RouterLink>

      <RouterLink to="/favorites"> Favorites </RouterLink>
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

a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

a.router-link-active {
  color: #60a5fa;
}
</style>
