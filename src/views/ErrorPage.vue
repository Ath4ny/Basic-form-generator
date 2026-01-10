<template>
  <div class="error-page">
    <h1>404</h1>
    <p>Page not found</p>
    <router-link to="/">Back to home page</router-link>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
