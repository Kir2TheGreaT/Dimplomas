<template>
  <div class="mainCategoryPage">
    <Transition name="slide-side">
      <div v-if="isSidebarOpen" class="mobileSidebar">
        <categories-menu @updateFilters="handleFilters" />
      </div>
    </Transition>
    <div
      v-if="isSidebarOpen"
      class="sidebarOverlay"
      @click="closeSidebar"
    ></div>
    <div class="categoryMenu">
      <categories-menu @updateFilters="handleFilters" />
    </div>
    <div class="cardMenu">
      <div class="switch_buttons">
        <PickUp
          ref="pickUpRef"
          title="Pick - Up"
          class="pick-up"
          :class="{ switched: isSwitched }"
          :data="rentalStore.pickup"
          :style="pickUpStyle"
        />

        <SwitchButton
          class="switch"
          @click="switchToggle"
          :class="{ rotated: isSwitched }"
          :active="isSwitched"
        />
        <PickUp
          ref="dropOffRef"
          title="Drop - Off"
          class="drop-off"
          :class="{ switched: isSwitched }"
          :data="rentalStore.dropoff"
          :style="dropOffStyle"
        />
      </div>
      <div class="cards">
        <template v-if="filteredProducts.length > 0">
          <ResponsiveCard
            v-for="product in filteredProducts.slice(
              0,
              wideScreenQuantityCards,
            )"
            :key="product.id"
            :product="product"
          />
        </template>
        <div
          v-else
          style="
            grid-column: 1/-1;
            text-align: center;
            color: var(--secondary-300);
          "
        >
          No cars found matching your filters.
        </div>
      </div>
      <div class="buttonsMainPage">
        <ButtonRental label="Show More Car" class="buttonAll" />
        <p class="allCar">{{ filteredProducts.length }} Car</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PickUp from "~/components/Pick-up.vue";
import ResponsiveCard from "~/components/ResponsiveCard.vue";
import { ref, computed, onMounted, reactive, inject, watch } from "vue";
import { products } from "~~/data/products.ts";
import CategoriesMenu from "~/components/categoriesMenu.vue";

const isWideScreen = ref(false);
const screenWidth = ref(0);
onMounted(() => {
  checkScreenWidth();
  window.addEventListener("resize", checkScreenWidth);
});
const checkScreenWidth = () => {
  screenWidth.value = window.innerWidth;
  isWideScreen.value = screenWidth.value >= 760;
};
// количество карточек
const wideScreenQuantityCards = computed(() => {
  if (screenWidth.value >= 1440) return 9;
  return 12;
});

//переключение виджетов
const isSwitched = ref(false);

// передача карточек из фильтра
const currentFilters = reactive({
  types: [] as string[],
  capacities: [] as number[],
  price: 200,
});
const handleFilters = (newFilter: any) => {
  currentFilters.types = newFilter.types;
  currentFilters.capacities = newFilter.capacities;
  currentFilters.price = newFilter.price;
};

const filteredProducts = computed(() => {
  return products.filter((car) => {
    const matchPrice = car.price <= currentFilters.price;

    const matchType =
      currentFilters.types.length === 0 ||
      currentFilters.types.includes(car.category);

    const matchCapacity =
      currentFilters.capacities.length === 0 ||
      currentFilters.capacities.includes(car.seats);

    return matchPrice && matchType && matchCapacity;
  });
});

// отдельный хэдер для мобилки
definePageMeta({
  isSpecialHeader: true,
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

// виджеты - данные
const rentalStore = useRentalStore();

// вычисление анимации
const switchToggle = () => {
  calculateDistance();

  isSwitched.value = !isSwitched.value;
};

const pickUpRef = ref(null);

const dropOffRef = ref(null);

const dist = reactive({ x: 0, y: 0 });

const calculateDistance = () => {
  const el1 = pickUpRef.value?.$el || pickUpRef.value;

  const el2 = dropOffRef.value?.$el || dropOffRef.value;

  if (el1 && el2) {
    dist.x = el2.offsetLeft - el1.offsetLeft;

    dist.y = el2.offsetTop - el1.offsetTop;
  }
};

const pickUpStyle = computed(() =>
  isSwitched.value
    ? { transform: `translate(${dist.x}px, ${dist.y}px)` }
    : { transform: "none" },
);

const dropOffStyle = computed(() =>
  isSwitched.value
    ? { transform: `translate(${-dist.x}px, ${-dist.y}px)` }
    : { transform: "none" },
);
</script>

<style scoped>
.mainCategoryPage {
  max-width: 1440px;
  background-color: var(--backgroundpages);
  display: flex;
  flex-direction: row;
  justify-content: start;
  overflow: hidden;

  @media (min-width: 1440px) and (max-width: 1439px) {
    border-top: 1px var(--borderColor) solid;
  }
  @media (min-width: 375px) and (max-width: 1439px) {
    width: 100%;
  }
  .categoryMenu {
    display: none;
    align-items: stretch;
    @media (min-width: 1280px) {
      display: flex;
    }
  }
  .cardMenu {
    overflow-x: hidden;
    @media (min-width: 375px) and (max-width: 1439px) {
      gap: 2rem;
    }
    .switch_buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      padding: 2rem;
      gap: 2.75rem;
      flex-direction: row;
      @media (min-width: 375px) and (max-width: 1439px) {
        flex-direction: column;
        padding: 2rem 1.5rem;
        justify-content: start;
        align-items: start;
      }
      .pick-up,
      .drop-off {
        position: relative;
        transition: transform 1s cubic-bezier(0.65, 0, 0.35, 1);
      }

      .switch {
        position: absolute;
        top: 38%;
        left: 501px;
        z-index: 5;
        transition: rotate 1s ease;
        @media (min-width: 375px) and (max-width: 1439px) {
          top: 42%;
          left: 43%;
        }
      }
      .switch.rotated {
        rotate: 180deg;
      }
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding-left: 2rem;
      padding-right: 2rem;
      padding-bottom: 4rem;
      gap: 2rem;
      @media (min-width: 375px) and (max-width: 1439px) {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        padding-bottom: 3rem;
        gap: 1.25rem;
      }
    }
  }
  .buttonsMainPage {
    display: flex;
    align-items: center;
    justify-content: end;
    padding-right: 2rem;
    gap: 18.125rem;
    padding-bottom: 4rem;
    @media (min-width: 375px) and (max-width: 1439px) {
      align-self: start;
      gap: 3rem;
      padding-right: 1.5rem;
      .allCar {
        text-wrap: nowrap;
      }
    }
    .allCar {
      color: var(--secondary-300);
      font-size: 0.875rem;
      font-weight: 500;
      margin: 0;
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
