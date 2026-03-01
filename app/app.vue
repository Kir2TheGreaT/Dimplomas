<template>
  <Transition name="fade">
    <PreloaderPage v-if="isLoading" />
  </Transition>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const isLoading = ref(true);
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
});
</script>

<style scoped>
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-leave-to {
  opacity: 0;
}
</style>
