<template>
  <div class="auth-layout">
    <TheToast />
    <slot />
  </div>
</template>

<script setup lang="ts">
import TheToast from "~/components/TheToast.vue";
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  width: 100%;
}
</style>
