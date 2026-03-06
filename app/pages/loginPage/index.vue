<template>
  <div class="login-page">
    <AuthLoginForm />
  </div>
</template>

<script setup lang="ts">
import AuthLoginForm from "~/components/LoginForm.vue";

definePageMeta({
  layout: "auth",
});
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
  padding: 2rem 1.5rem;
  background-color: var(--primary-0);
}
</style>
