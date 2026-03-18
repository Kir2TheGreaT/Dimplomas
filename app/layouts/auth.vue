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
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s ease-in-out;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(5px);
}
</style>
