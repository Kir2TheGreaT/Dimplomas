<script setup lang="ts">
import Heart_linear from "~/components/icons/cardsIcons/heart_linear.vue";
import Gas from "~/components/icons/cardsIcons/gas.vue";
import Wheel from "~/components/icons/cardsIcons/wheel.vue";
import Profile2user from "~/components/icons/cardsIcons/profile2user.vue";
import { useRouter } from "vue-router";
import type { Product } from "~~/data/products";
import ButtonRental from "./Button-rental.vue";
import { useFavorites } from "~/stores/favorites";
import Heart_bold from "~/components/icons/cardsIcons/heart_bold.vue";

const props = defineProps<{
  carousel?: boolean;
  maxVisible?: number;
  product: Product;
}>();

// избранное
const favoriteStore = useFavorites();
const toggleFavorite = () => {
  favoriteStore.toggleFavorite(props.product.id);
};

const isAdded = computed(() => {
  return favoriteStore.isFavorite(props.product.id);
});

// переходы
const router = useRouter();
const goToDetail = (id: number) => {
  router.push(`/detailCarRent/${id}`);
};
const goCategory = (id: number) => {
  router.push(`/categoryCarRent`);
};
const goSummary = (id: number) => {
  router.push(`/paymentCarRent/${id}`);
};

// если картинку не грузит
const defaultCarImage = "/y2AAAgCxquA-960.jpg";
const handleImageError = (event: Error) => {
  const target = event.target as HTMLElement;
  target.src = defaultCarImage;
};
</script>

<template>
  <div
    class="responsiveCard"
    :class="{ carousel: props.carousel }"
    v-if="props.product"
  >
    <div class="cardHeader">
      <div class="tittle" @click="goToDetail(props.product.id)">
        <h2>{{ props.product.name }}</h2>
        <h5>{{ props.product.category }}</h5>
      </div>
      <button class="favorite" @click="toggleFavorite">
        <component
          :is="isAdded ? Heart_bold : Heart_linear"
          class="heart-iconCar"
          :class="{ active: isAdded }"
        />
      </button>
    </div>

    <div class="cardData">
      <div class="image" @click="goToDetail(props.product.id)">
        <img
          alt=""
          class="carImage"
          @error="handleImageError"
          :src="props.product.image || defaultCarImage"
        />
      </div>

      <div class="specifications" @click="goCategory(props.product.id)">
        <div class="item">
          <gas class="itemIcon" />
          {{ props.product.gasoline }}L
        </div>
        <div class="item">
          <wheel class="itemIcon" />
          {{ props.product.drive }}
        </div>
        <div class="item">
          <profile2user class="itemIcon" />
          {{ props.product.seats }} People
        </div>
      </div>
    </div>

    <div class="footerCard">
      <div class="price" @click="goSummary(props.product.id)">
        ${{ props.product.price.toFixed(2) }}/ <span>day</span>
      </div>
      <ButtonRental
        label="Rental Now"
        :product="product"
        @click="router.push(`/paymentCarRent/${product.id}`)"
      ></ButtonRental>
    </div>
  </div>
</template>

<style scoped>
.responsiveCard {
  display: flex;
  flex-direction: column;
  background-color: var(--primary-0);
  border-radius: 10px;
  position: relative;
  flex-grow: 1;
  max-width: 304px;
  .tittle,
  .image,
  .specifications {
    cursor: pointer;
    transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    :hover {
      transform: scale(1.2);
      transition: all 0.5s;
    }
  }

  .cardHeader {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 0.25rem;

    .tittle {
      padding-top: 1rem;
      padding-bottom: 2rem;
      padding-left: 1rem;

      h2,
      h5 {
        margin: 0;
        text-wrap: nowrap;
      }

      h2 {
        color: var(--secondary-500);
        font-weight: 600;
        font-size: 1rem;
      }
      h5 {
        color: var(--secondary-300);
        font-size: 0.75rem;
        font-weight: 500;
      }
    }
    .favorite {
      padding-top: 1rem;
      padding-right: 1rem;
      background: none;
      border: none;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      -webkit-tap-highlight-color: transparent;
      outline: none;
      transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      :hover {
        transform: scale(1.2);
        transition: all 0.5s;
      }

      &:focus {
        outline: none;
      }

      &.active {
        transform: scale(0.9);
      }

      .heart-iconCar {
        width: 16px;
        height: 16px;
        color: var(--secondary-300);
        transition: all 0.5s ease;

        @media (min-width: 1440px) {
          width: 24px;
          height: 24px;
        }
        &.active {
          color: #ed3f3f;
          fill: currentColor;
        }
      }
    }
  }
  .cardData {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;

    .image {
      padding-top: 2rem;
      padding-bottom: 2rem;
      padding-left: 2rem;
      .carImage {
        max-width: 160px;
        max-height: 70px;
      }
    }
    .shadow {
      display: flex;
      position: absolute;
      top: 44%;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      max-height: 40px;
    }
    .specifications {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1rem;
      align-items: start;
      padding-top: 2rem;
      padding-bottom: 2rem;
      padding-right: 1rem;
      @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
      }
      .item {
        display: flex;
        flex-direction: row;
        gap: 0.25rem;
        color: var(--secondary-300);
        font-size: 0.75rem;
        font-weight: 500;
        flex-wrap: nowrap;
        .itemIcon {
          color: var(--secondary-300);
        }
      }
    }
    @media (min-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }
  .footerCard {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right: 1rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    .price {
      gap: 0.25rem;
      color: var(--secondary-500);
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      span {
        color: var(--secondary-300);
        font-size: 0.75rem;
        font-weight: 700;
      }
    }
  }

  &.carousel {
    .cardData {
      flex-direction: column;
      position: relative;

      .image {
        padding-right: 2.5rem;
        padding-left: 2.5rem;
        .carImage {
          max-width: 220px;
          max-height: 60px;
        }
      }
      .shadow {
        position: absolute;
        z-index: 2;
        top: 25%;
      }
      .specifications {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        padding-top: 3.125rem;
        padding-bottom: 1.5rem;
      }
    }
    .footerCard {
      .price {
        padding-right: 1rem;
      }
    }
  }
  @media (min-width: 1440px) {
    .cardHeader {
      .tittle {
        padding-top: 1.5rem;
        padding-bottom: 3.125rem;
        padding-left: 1.5rem;
        h2 {
          font-size: 1.25rem;
        }
      }
      .favorite {
        padding-top: 1.5rem;
        padding-right: 1.5rem;
      }
    }
    .cardData {
      .image {
        padding-top: 0;
        padding-left: 0;
        padding-bottom: 0;
        .carImage {
          max-width: 220px;
          max-height: 60px;
        }
      }
      .specifications {
        padding-right: 1.25rem;
        padding-left: 1.25rem;
        padding-bottom: 1.25rem;
        .item {
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          .itemIcon {
            font-size: 1.5rem;
            display: flex;
            align-items: center;
          }
        }
      }
    }
    .footerCard {
      display: flex;
      align-items: center;
      padding-left: 1.5rem;
      padding-bottom: 1.5rem;
      padding-right: 1.5rem;
      .price {
        font-size: 0.875rem;
      }
    }
  }
}
</style>
