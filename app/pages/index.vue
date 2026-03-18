<template>
  <div class="mainFirstPage">
    <div :class="addsCars">
      <AddCars
        class="firstCard"
        label="The Best Platform for Car Rental"
        descriptionAddsCar="Ease of doing a car rental safely and reliably. Of course at a low price."
      />
      <AddCars
        class="secondCard"
        :second="true"
        label="Easy way to rent a car at a low price"
        descriptionAddsCar="Providing cheap car rental services and safe and comfortable facilities."
      />
    </div>
    <div class="buttons">
      <PickUp
        ref="pickUpRef"
        title="Pick - Up"
        class="pick-up"
        :class="{ switched: isSwitched }"
        :style="pickUpStyle"
        :data="rentalStore.pickup"
      />

      <SwitchButton
        class="switch"
        @click="switchToggle"
        :active="isSwitched"
        :class="{ rotated: isSwitched }"
      />

      <PickUp
        ref="dropOffRef"
        title="Drop - Off"
        class="drop-off"
        :class="{ switched: isSwitched }"
        :style="dropOffStyle"
        :data="rentalStore.dropoff"
      />
    </div>
    <div class="popular_car">
      <h5>Popular Car</h5>
      <NuxtLink class="view-all-link" @click="goCategory">View All</NuxtLink>
    </div>
    <div class="popular_car2">
      <responsive-card
        :carousel="isCarouselPopular"
        :maxVisible="wideScreenQuantityCards"
        v-for="product in popularProducts"
        :product="product"
      />
    </div>
    <div class="recommendationText">
      <p>Recommendation Car</p>
    </div>
    <div class="recommendationCarCard">
      <responsive-card
        v-for="product in recommendationProducts"
        :key="product.id"
        :maxVisible="maxRecommendationCards"
        :carousel="isCarouselRecommendation"
        :product="product"
      />
    </div>
    <div class="buttonsMainPage">
      <ButtonRental
        :label="buttonLabel"
        class="buttonAll"
        @click="showMoreCars"
      />
      <div class="allCar">{{ products.length }} Car</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted, nextTick, reactive } from "vue";
import AddCars from "~/components/Add-cars.vue";
import ButtonRental from "~/components/Button-rental.vue";
import { products } from "~~/data/products.ts";
import type { Product } from "~~/data/products.ts";
const router = useRouter();
const props = defineProps<{
  carousel?: boolean;
  maxVisible?: number;
  product?: Product;
}>();

const goCategory = () => {
  router.push(`/categoryCarRent`);
};

// рендер карточек
const popularProducts = computed<Product[]>(() => {
  return products.slice(0, wideScreenQuantityCards.value);
});

//переключение виджетов
const isSwitched = ref(false);
const switchToggle = () => {
  isSwitched.value = !isSwitched.value;
};

// ширина экрана
const isWideScreen = ref(false);
const screenWidth = ref(0);

onMounted(() => {
  checkScreenWidth();
  window.addEventListener("resize", checkScreenWidth);
});
// Карточки рекомендованных
const maxRecommendationCards = computed(() => {
  if (screenWidth.value >= 1440) return 12;
  if (screenWidth.value >= 1280) return 7;
  if (screenWidth.value >= 768) return 6;
  return 5;
});

// карточки адаптив
const isCarouselPopular = computed(() => screenWidth.value < 1440);
const isCarouselRecommendation = computed(() => screenWidth.value >= 768);

// ресайз от экрана
const checkScreenWidth = () => {
  screenWidth.value = window.innerWidth;
  isWideScreen.value = screenWidth.value >= 760;
};

const addsCars = computed(() => ({
  addsCars: true,
  addsCarsFlex: isWideScreen.value,
}));
// карточки подсчет до нажатия ALL
const wideScreenQuantityCards = computed(() => {
  if (screenWidth.value >= 1440) return 4;
  return 12;
});

// вычисление анимации
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

//
const onResize = () => {
  checkScreenWidth();
  calculateDistance();
};
onMounted(() => {
  window.addEventListener("resize", onResize);
  nextTick(() => {
    checkScreenWidth();
    calculateDistance();
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});

//кнопка больше машин

const extraCarsCount = ref(0);
const isAllShown = computed(() => {
  return recommendationProducts.value.length >= products.length;
});
const buttonLabel = computed(() => {
  return isAllShown.value ? "Show Start" : "Show More Car";
});
const recommendationProducts = computed<Product[]>(() => {
  const totalToShow = maxRecommendationCards.value + extraCarsCount.value;
  return products.slice(0, totalToShow);
});

const showMoreCars = () => {
  if (isAllShown.value) {
    extraCarsCount.value = 9;
  } else {
    extraCarsCount.value += 20;
  }
};

// виджет - данные
const rentalStore = useRentalStore();
</script>

<style>
.mainFirstPage {
  overflow-x: hidden;
  position: relative;

  @media (min-width: 565px) {
    overflow: hidden;
    position: relative;
  }

  @media (min-width: 1280px) and (max-width: 1439px) {
    position: relative;
  }

  .addsCars {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    background: linear-gradient(
      180deg,
      var(--primary-0) 0%,
      var(--primary-0) 50%,
      var(--backgroundpages) 50%,
      var(--backgroundpages) 100%
    );

    .secondCard {
      display: none;

      @media (min-width: 760px) {
        display: block;
      }
    }
  }
  .addsCarsFlex {
    @media (min-width: 760px) {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      gap: 1rem;
      padding-right: 2rem;
      padding-left: 2rem;
      justify-content: center;
    }

    @media (min-width: 1280px) and (max-width: 1439px) {
      padding-top: 2rem;
      padding-bottom: 2rem;
      background: var(--backgroundpages);
    }

    @media (min-width: 1440px) {
      padding-left: 4rem;
      padding-right: 4rem;
      padding-top: 2rem;
      background: var(--backgroundpages);
    }
  }

  .buttons {
    position: relative;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    overflow: hidden;

    @media (min-width: 565px) {
      position: relative;
    }

    @media (min-width: 1280px) and (max-width: 1439px) {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position: relative;
      gap: 9.25rem;
    }

    @media (min-width: 1440px) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      position: relative;
      gap: 9.25rem;
      padding: 2rem 4rem 4rem;
    }

    .pick-up,
    .drop-off {
      position: relative;
      transition: transform 1s cubic-bezier(0.65, 0, 0.35, 1);

      @media (min-width: 1280px) and (max-width: 1439px) {
        position: relative;
        transition: transform 1s cubic-bezier(0.65, 0, 0.35, 1);
      }

      @media (min-width: 1440px) {
        position: relative;
        transition: transform 1s cubic-bezier(0.65, 0, 0.35, 1);
      }
    }

    .pick-up {
      margin-bottom: 2rem;

      @media (min-width: 1280px) and (max-width: 1439px) {
        margin-bottom: 0;
      }

      @media (min-width: 1440px) {
        margin-bottom: 0;
        margin-right: 0;
        margin-left: 0;
      }
    }

    .drop-off {
      @media (min-width: 1440px) {
        margin-bottom: 0;
        margin-right: 0;
        margin-left: 0;
      }
    }

    .switch {
      position: absolute;
      z-index: 5;
      top: 51%;
      left: 50%;
      translate: -50% -50%;

      @media (min-width: 565px) {
        position: absolute;
        z-index: 5;
        top: 58%;
        left: 50%;
        translate: -50% -50%;
      }

      @media (min-width: 1280px) and (max-width: 1439px) {
        position: absolute;
      }

      @media (min-width: 1440px) {
        position: absolute;
        top: 45%;
      }

      .icon-container {
        transition: transform 1s ease;
        display: flex;
      }
    }

    .switch.rotated {
      .icon-container {
        transform: rotate(180deg);
      }
    }
  }

  .popular_car {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    @media (min-width: 1440px) {
      padding-bottom: 1.25rem;
      padding-right: 4rem;
      padding-left: 4rem;
    }

    .view-all-link {
      cursor: pointer;
      color: var(--primary-500);
      text-decoration: underline;
    }

    h5 {
      color: var(--secondary-300);
      font-size: 0.875rem;
      font-weight: 600;

      @media (min-width: 1440px) {
        font-size: 1rem;
      }
    }

    p {
      text-decoration: underline;
      font-weight: 600;
      font-size: 0.75rem;
      color: var(--primary-500);

      @media (min-width: 1440px) {
        font-size: 1rem;
      }
    }
  }

  .popular_car2 {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 1.25rem;
    overflow-x: scroll;
    padding: 1rem 1.5rem;
    scroll-snap-type: x mandatory;
    width: 320px;
    overscroll-behavior-x: contain;

    @media (min-width: 750px) {
      width: 700px;
    }

    @media (min-width: 950px) {
      width: 900px;
    }

    @media (min-width: 1150px) {
      width: 1100px;
    }

    @media (min-width: 1280px) {
      width: 1230px;
    }

    @media (min-width: 1280px) and (max-width: 1439px) {
      max-width: 1260px;
    }

    @media (min-width: 1440px) {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      padding-left: 4rem;
      padding-right: 4rem;
      padding-bottom: 2rem;
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      overflow: hidden;
    }
  }

  .recommendationText {
    padding-left: 1.5rem;
    padding-bottom: 1.25rem;
    padding-top: 2rem;

    @media (min-width: 1440px) {
      padding-left: 4rem;
    }

    p {
      font-weight: 500;
      font-size: 0.875rem;
      color: var(--secondary-300);

      @media (min-width: 1440px) {
        font-size: 1rem;
        font-weight: 600;
      }
    }
  }

  .recommendationCarCard {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    @media (min-width: 760px) {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }

    @media (min-width: 1280px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1440px) {
      grid-template-columns: repeat(4, 1fr);
      padding-left: 4rem;
      padding-right: 4rem;
    }
  }

  .buttonsMainPage {
    padding-left: 1.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    padding-top: 2rem;
    padding-right: 1.5rem;
    gap: 3rem;

    @media (min-width: 760px) {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    @media (min-width: 1280px) and (max-width: 1439px) {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    @media (min-width: 1440px) {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      padding-right: 4rem;
      padding-bottom: 4rem;
      padding-top: 4rem;
      padding-left: 3.5rem;
    }

    .buttonAll {
      @media (min-width: 1440px) {
        grid-column: 2;
      }
    }

    .allCar {
      font-weight: 700;
      font-size: 0.875rem;
      color: var(--secondary-300);
      text-wrap: nowrap;

      @media (min-width: 1440px) {
        grid-column: 3;
        justify-self: end;
      }
    }
  }
}
</style>
