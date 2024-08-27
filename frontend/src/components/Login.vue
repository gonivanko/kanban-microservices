<!-- src/components/Login.vue -->
<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { login } from '@/services/authService.js';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        await login(this.email, this.password);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
