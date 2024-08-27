<template>
  <div id="app">
    <nav>
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/dashboard">Dashboard</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Пример простых стилей */
nav {
  padding: 10px;
}

nav a {
  margin-right: 10px;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-active {
  font-weight: bold;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}
</style>
