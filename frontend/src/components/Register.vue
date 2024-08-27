<!-- src/components/Register.vue -->
<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { register } from '@/services/authService.js';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        await register(this.email, this.password);
        this.$router.push('/login');
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
