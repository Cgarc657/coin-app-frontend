<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const message = ref('')

const registerUser = async () => {
  loading.value = true
  error.value = ''
  message.value = ''

  try {
    const response = await fetch(
      'https://coin-hub-app.expense-splitter-vue.workers.dev/api/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
        }),
      },
    )

    const data = await response.json()

    if (!response.ok) {
      error.value = data.error.message
      return
    }

    message.value = 'Account created successfully.'
    name.value = ''
    email.value = ''
    password.value = ''
  } catch {
    error.value = 'Could not create account.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="register-page">
    <div class="register-card">
      <h1>Create Account</h1>

      <form @submit.prevent="registerUser">
        <input v-model="name" type="text" placeholder="Name" />

        <input v-model="email" type="email" placeholder="Email" />

        <input v-model="password" type="password" placeholder="Password" />

        <button type="submit" :disabled="loading">
          {{ loading ? 'Creating...' : 'Create Account' }}
        </button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="message" class="success">{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-card {
  width: 400px;
  padding: 2rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

button {
  padding: 0.9rem;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  cursor: pointer;
  font-size: 1rem;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  color: red;
  text-align: center;
  margin-top: 1rem;
}

.success {
  color: green;
  text-align: center;
  margin-top: 1rem;
}
</style>
