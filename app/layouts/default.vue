<template>
  <div class="layout">
    <TheToast></TheToast>
    <Header class="header" />
    <main class="content">
      <NuxtPage />
    </main>
    <Footer class="footerLayout" v-if="!$route.meta.hideFooter" />
  </div>
</template>

<script lang="ts" setup>
import Footer from "~/components/Footer.vue";
import Header from "~/components/Header.vue";
import { ref, provide, onMounted, toDisplayString } from "vue";
import TheToast from "~/components/TheToast.vue";
onMounted(() => {
  const saveTheme = localStorage.getItem("theme");
  const systemPreferDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  if (saveTheme === "dark" || (!saveTheme && systemPreferDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});

const isSidebarOpen = ref(false);
const toggleSidebar = () => (isSidebarOpen.value = !isSidebarOpen.value);

provide("sidebarContext", { isSidebarOpen, toggleSidebar });
</script>

<style>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.content {
  margin: 0 auto auto;
  background-color: var(--backgroundpages);
  @media (min-width: 1440px) {
    max-width: 1433px;
  }
}

.header {
  margin: 0 auto auto;
  position: sticky;
  width: 100%;
}
</style>
