import { ref } from 'vue'

const currentUser = ref(JSON.parse(localStorage.getItem('user')) || null)

export function useAuth() {
  const login = (user) => {
    currentUser.value = user

    localStorage.setItem('user', JSON.stringify(user))
  }

  const logout = () => {
    currentUser.value = null

    localStorage.removeItem('user')
  }

  return {
    currentUser,
    login,
    logout,
  }
}
