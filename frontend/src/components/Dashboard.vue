<!-- src/components/Dashboard.vue -->
<template>
  <div>
    <h2>Dashboard</h2>
    <p>Welcome to your dashboard, only accessible when logged in!</p>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('Dashboard mounted');
  }
};
</script>
