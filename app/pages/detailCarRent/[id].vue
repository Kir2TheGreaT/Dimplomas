<template>
  <div class="mainDetailPage" v-if="product">
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
      <CategoriesMenu @updateFilters="handleFilters"></CategoriesMenu>
    </div>
    <div class="secondHalfPage">
      <div class="carDetailCard">
        <div class="imageDetails">
          <ImagesBlockDetails :product="product"></ImagesBlockDetails>
        </div>
        <DetailCard v-if="product" :product="product"></DetailCard>
      </div>
      <div class="reviews"><Reviews /></div>
      <div class="caregoryDetailCards">
        <p>Recent Car</p>
        <a href="#">View All</a>
      </div>
      <div class="recentCar">
        <template v-if="filteredProducts.length > 0">
          <ResponsiveCard
            v-for="item in recentProducts"
            :key="item.id"
            :product="item"
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
      <div class="caregoryDetailCards">
        <p>Recomendation Car</p>
        <a href="#">View All</a>
      </div>
      <div class="recommendationCar">
        <template v-if="filteredProducts.length > 0">
          <ResponsiveCard
            v-for="item in recommendationProducts"
            :key="item.id"
            :product="item"
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
    </div>
  </div>
  <div v-else>Car not found</div>
</template>

<script lang="ts" setup>
import DetailCard from "~/components/detailPage/detailCard.vue";
import ResponsiveCard from "~/components/ResponsiveCard.vue";
import Reviews from "~/components/detailPage/reviews.vue";
import { useRoute } from "vue-router";
import { products } from "~~/data/products.ts";
import ImagesBlockDetails from "~/components/detailPage/imagesBlockDetails.vue";
import { ref, computed, onMounted, reactive, inject, watch } from "vue";
import type { Product } from "~~/data/products.ts";
import CategoriesMenu from "~/components/categoriesMenu.vue";

// получение нужной карточки
const route = useRoute();
const productId = Number(route.params.id);
const product = computed(() => products.find((p) => p.id === productId));

// фильтры
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

// показ карточек
const recentProducts = computed<Product[]>(() =>
  filteredProducts.value
    .filter((p) => p.id !== productId)
    .slice(0, wideScreenQuantityCards.value),
);

const recommendationProducts = computed<Product[]>(() =>
  filteredProducts.value.slice(0, wideScreenQuantityCards.value),
);

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

const wideScreenQuantityCards = computed(() => {
  if (screenWidth.value >= 1440) return 3;
  return 12;
});

// // отдельный хэдер для мобилки
definePageMeta({
  isSpecialHeader: true,
});

// сайдбар
const sidebarContext = inject<any>("sidebarContext");
const isSidebarOpen = computed(() => sidebarContext.isSidebarOpen.value);
const closeSidebar = () => {
  if (sidebarContext) sidebarContext.isSidebarOpen.value = false;
};

watch(isSidebarOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
</script>

<style scoped>
.mainDetailPage {
  display: flex;
  flex-direction: row;

  @media (min-width: 1440px) {
    border-top: 1px var(--borderColor) solid;
  }
  .categoryMenu {
    display: flex;
    align-items: stretch;
    @media (min-width: 375px) and (max-width: 1280px) {
      display: none;
    }
  }
  .secondHalfPage {
    display: flex;
    flex-direction: column;
    .carDetailCard {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      padding-left: 2rem;
      padding-right: 2rem;
      padding-top: 2rem;
      @media (min-width: 375px) and (max-width: 1000px) {
        display: flex;
        flex-direction: column;
      }
      .imageDetails {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
    }
    .caregoryDetailCards {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      padding: 2rem 2rem 1rem;
      @media (min-width: 375px) and (max-width: 1000px) {
        padding-right: 1.5rem;
        padding-left: 1.5rem;
        padding-bottom: 1.25rem;
      }
      p {
        margin: 0;
        color: var(--secondary-300);
        font-size: 1rem;
        font-weight: 600;
      }
      a {
        color: var(--primary-500);
        font-size: 1rem;
        font-weight: 600;
      }
    }
    .recentCar {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding-left: 2rem;
      padding-right: 2rem;
      gap: 2rem;
      @media (min-width: 375px) and (max-width: 1000px) {
        flex-direction: row;
        flex-wrap: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
        scroll-snap-type: x mandatory;
        overscroll-behavior-x: contain;
        width: 320px;
      }
    }
    .recommendationCar {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding-left: 2rem;
      padding-right: 2rem;
      gap: 2rem;
      padding-bottom: 2rem;
      @media (min-width: 375px) and (max-width: 1000px) {
        flex-direction: row;
        flex-wrap: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
        scroll-snap-type: x mandatory;
        overscroll-behavior-x: contain;
        width: 320px;
      }
    }
    .reviews {
      padding: 2rem;
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
