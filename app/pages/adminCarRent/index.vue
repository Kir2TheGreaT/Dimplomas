<template>
  <div class="accountMainPage">
    <Transition name="slide-side">
      <div v-if="isSidebarOpen" class="mobileSidebar">
        <AccDashboard></AccDashboard>
      </div>
    </Transition>
    <div
      v-if="isSidebarOpen"
      class="sidebarOverlay"
      @click="closeSidebar"
    ></div>
    <div class="accountDashBoard">
      <AccDashboard></AccDashboard>
    </div>
    <div class="leftsideAccount">
      <ClientOnly>
        <ProjectMap />
        <PaymentAccountData />
      </ClientOnly>
    </div>
    <div class="rightsideAccount">
      <AccountStat class="accountStatisticWidget"></AccountStat>
      <RecentTransaction class="recentTransactionWidget"></RecentTransaction>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AccDashboard from "~/components/accountPage/accDashboard.vue";
import ProjectMap from "~/components/accountPage/project-map.vue";
import PaymentAccountData from "~/components/accountPage/paymentAccountData.vue";
import RecentTransaction from "~/components/accountPage/recentTransaction.vue";
import AccountStat from "~/components/accountPage/accountStat.vue";

definePageMeta({
  hideFooter: true,
  isSpecialHeader: true,
  middleware: "auth",
});

// сайдбар
const sidebarContext = inject<any>("sidebarContext");
const isSidebarOpen = computed(() => sidebarContext.isSidebarOpen.value);
const closeSidebar = () => {
  if (sidebarContext) sidebarContext.isSidebarOpen.value = false;
};

watch(isSidebarOpen, (value) => {
  if (value && !isSidebarOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
</script>

<style>
.accountMainPage {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  @media (min-width: 1px) and (max-width: 800px) {
    flex-direction: column;
  }
  .accountDashBoard {
    padding-top: 0.2rem;
    @media (min-width: 1px) and (max-width: 950px) {
      display: none;
    }
  }
  .leftsideAccount {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
  }
  .rightsideAccount {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    @media (min-width: 1440px) {
      .accountStatisticWidget {
        margin-top: 2rem;
      }
    }
  }
  .mobileSidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 280px;
    height: 100vh;
    background-color: var(--primary-0);
    z-index: 100;
    box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  .sidebarOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99;
  }
}
.slide-side-enter-active,
.slide-side-leave-active {
  transition: transform 0.5s ease-in-out;
}

.slide-side-enter-from,
.slide-side-leave-to {
  transform: translateX(-100%);
}
</style>
