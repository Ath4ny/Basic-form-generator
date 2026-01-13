<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="logo">FormGenerator</router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Registration</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
          <router-link to="/create-article" class="nav-link">Create Article</router-link>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<style lang="scss">
.navbar {
  padding: 1rem 0;
  background-color: var(--app-navi-blue);
  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  }

  .logo {
    color: var(--app-white-50);
    font-size: 1.5rem;
    font-weight: 700;
    text-decoration: none;
    letter-spacing: -0.5px;

    &:hover {
      opacity: 0.9;
    }
  }

  .nav-links {
    display: flex;
    gap: 2rem;
  }

  .nav-link {
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    color: var(--app-white-50);

    &.router-link-exact-active {
      background: var(--app-shadow-200);
      color: var(--app-white-50);
    }
  }
}

.main-content {
  flex: 1;
  padding: 2rem 0 0 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
