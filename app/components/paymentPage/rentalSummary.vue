<template>
  <div class="mainRentalSummary">
    <div class="headerSummary">
      <h3>Rental Summary</h3>
      <p>
        Prices may change depending on the length of the rental and the price of
        your rental car.
      </p>
    </div>
    <div class="pictureSummary">
      <div class="cardPictureSummary"><img :src="product.image" alt="" /></div>
      <div class="cardInformationSummary">
        <h4>{{ product.name }}</h4>
        <div class="ratingSummaryCard">
          <div class="star">
            <star class="starIcon"></star>
            <star class="starIcon"></star>
            <star class="starIcon"></star>
            <star class="starIcon"></star>
            <star class="starIcon"></star>
          </div>
          <p>500+ Reviewer</p>
        </div>
      </div>
    </div>
    <div class="borderSummary"></div>
    <div class="pricepayment">
      <div class="subtotal">
        <div class="firstLineSubtotal">
          <h5>Subtotal</h5>
          <p>${{ product.price.toFixed(2) }}</p>
        </div>
        <div class="secondLineSubtotal">
          <h5>Tax</h5>
          <p>$</p>
        </div>
      </div>
      <form class="summaryInput" @submit="handleApplyPromo">
        <input
          type="text"
          placeholder="Apply promo code"
          v-model="promoCode"
          maxlength="5"
        />
        <button type="submit" class="applyNow">Apply Now</button>
      </form>

      <div class="totalRentalSummaryPrice">
        <div class="totalRentalPrice">
          <h4>Total Rental Price</h4>
          <p>{{ totalText }}</p>
        </div>
        <div class="totalDollars">${{ finalPrice.toFixed(2) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import Star from "../icons/star.vue";
import { usePaymentStore } from "@/stores/toast";

const props = defineProps<{
  product: {
    id: number;
    name: string;
    image: string;
    category: string;
    gasoline: number;
    drive: string;
    seats: number;
    price: number;
    favorite: boolean;
  };
}>();

// изменение текста в прайсе
const screenWidth = ref(0);

const updateWidth = () => {
  screenWidth.value = window.innerWidth;
};
onMounted(() => {
  screenWidth.value = window.innerWidth;
  window.addEventListener("resize", () => {
    screenWidth.value = window.innerWidth;
  });
});
onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});
const totalText = computed(() =>
  screenWidth.value >= 1440
    ? "Overall price and includes rental discount"
    : "Overall price rental",
);
// промокод
const toastStore = usePaymentStore();
const promoCode = ref("");
const isDiscountApplied = ref(false);
const handleApplyPromo = (e: Event) => {
  e.preventDefault();

  if (promoCode.value.length === 5) {
    if (promoCode.value.toUpperCase() === "CAR10") {
      isDiscountApplied.value = true;
      toastStore.addToast("Скидка применена - 10%", "success");
    } else {
      toastStore.addToast("Неверный код, попробуйте другой", "error");
    }
  } else {
    toastStore.addToast("Промокод должен состоять из 5 знаков", "warning");
  }
};

const finalPrice = computed(() => {
  if (isDiscountApplied.value) {
    return props.product.price * 0.9;
  }
  return props.product.price;
});
</script>

<style scoped>
.mainRentalSummary {
  background-color: var(--primary-0);
  border-radius: 10px;
  .headerSummary {
    padding-top: 1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    @media (min-width: 375px) and (max-width: 1439px) {
      padding-top: 1rem;
      padding-left: 1rem;
      padding-right: 1rem;
      padding-bottom: 1.5rem;
    }
    h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: bold;
      color: var(--secondary-500);
      @media (min-width: 375px) and (max-width: 1439px) {
        font-size: 1rem;
      }
    }
    p {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--secondary-300);
      @media (min-width: 375px) and (max-width: 1439px) {
        font-size: 0.75rem;
        line-height: 160%;
      }
    }
  }
  .pictureSummary {
    display: flex;
    padding-left: 1.5rem;
    padding-bottom: 2rem;
    gap: 1rem;
    @media (min-width: 375px) and (max-width: 1439px) {
      padding-left: 1rem;
      padding-bottom: 1.5rem;
    }
    .cardPictureSummary {
      border-radius: 8px;
      display: flex;
      align-items: center;
      background-color: var(--primary-500);
      background-image: url("/backgroundCards/BG.png");
      img {
        max-width: 116px;
        max-height: 36px;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        @media (min-width: 375px) and (max-width: 1439px) {
          max-height: 32px;
          padding-left: 0.438rem;
          padding-right: 0.438rem;
        }
      }
    }
    .cardInformationSummary {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding-top: 1.125rem;
      padding-bottom: 1.125rem;
      @media (min-width: 375px) and (max-width: 1439px) {
        padding-top: 0;
        padding-bottom: 1.875rem;
        gap: 0.75rem;
      }
      h4 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--secondary-500);
        @media (min-width: 375px) and (max-width: 1439px) {
          font-size: 1.25rem;
          line-height: 140%;
        }
      }
      .ratingSummaryCard {
        display: flex;
        flex-direction: row;
        line-height: 1;
        align-items: center;
        .star {
          display: flex;
          flex-direction: row;
          .starIcon {
            width: 20px;
            height: 20px;
            color: #fbad39;
            @media (min-width: 375px) and (max-width: 1439px) {
              width: 12px;
              height: 12px;
            }
          }
        }
        @media (min-width: 375px) and (max-width: 1439px) {
          display: flex;
          flex-direction: column;
          align-items: start;
          gap: 0.25rem;
        }
        p {
          margin: 0;
          padding-left: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--secondary-400);
          text-wrap: nowrap;
          padding-top: 0.2rem;
          @media (min-width: 375px) and (max-width: 1439px) {
            font-size: 0.75rem;
            margin-top: -0.5rem;
            padding-left: 0;
            padding-top: 0.5rem;
          }
        }
      }
    }
  }
  .borderSummary {
    border-bottom: 1px solid var(--borderColor);
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
  .subtotal {
    .firstLineSubtotal {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      padding-bottom: 1.5rem;
      padding-top: 2rem;
      @media (min-width: 375px) and (max-width: 1439px) {
        padding-top: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-bottom: 0.75rem;
      }
      h5 {
        margin: 0;
        padding-left: 0.5rem;
        font-size: 1rem;
        font-weight: 500;
        color: var(--secondary-300);
        @media (min-width: 375px) and (max-width: 1439px) {
          padding-left: 0;
          font-size: 0.75rem;
        }
      }
      p {
        margin: 0;
        font-size: 1rem;
        font-weight: 700;
        color: var(--secondary-500);
      }
    }
    .secondLineSubtotal {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-bottom: 2rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      @media (min-width: 375px) and (max-width: 1439px) {
        padding-top: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-bottom: 0.75rem;
      }
      h5 {
        margin: 0;
        padding-left: 0.5rem;
        font-size: 1rem;
        font-weight: 500;
        color: var(--secondary-300);
        @media (min-width: 375px) and (max-width: 1439px) {
          padding-left: 0;
          font-size: 0.75rem;
        }
      }
      p {
        margin: 0;
        font-size: 1rem;
        font-weight: 700;
        color: var(--secondary-500);
      }
    }
  }
  .summaryInput {
    display: flex;
    flex-direction: row;
    padding-left: -0.5rem;
    padding-right: 1.5rem;
    position: relative;
    @media (min-width: 375px) and (max-width: 1439px) {
      padding-right: 1rem;
    }
    input {
      width: 100%;
      border: none;
      background-color: var(--backgroundpages);
      height: 56px;
      margin-left: 1.5rem;
      padding-left: 2rem;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      color: var(--secondary-300);
      font-size: 0.875rem;
      font-weight: 500;
      @media (min-width: 375px) and (max-width: 1439px) {
        height: 40px;
        padding-left: 1.25rem;
        font-size: 0.75rem;
      }
    }
    .applyNow {
      color: var(--secondary-500);
      font-size: 1rem;
      font-weight: 600;
      text-wrap: nowrap;
      background-color: var(--backgroundpages);
      padding-right: 1.5rem;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      @media (min-width: 375px) and (max-width: 1439px) {
        font-size: 0.75rem;
        padding-right: 1.25rem;
      }
    }
  }
  .totalRentalSummaryPrice {
    display: flex;
    flex-direction: row;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-bottom: 1.5rem;
    padding-top: 2rem;
    justify-content: space-between;
    @media (min-width: 375px) and (max-width: 1439px) {
      padding-left: 1rem;
      padding-right: 1rem;
      padding-bottom: 1rem;
      padding-top: 1.5rem;
    }
    .totalRentalPrice {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      text-wrap: nowrap;
      h4 {
        margin: 0;
        font-weight: bold;
        font-size: 1.25rem;
        color: var(--secondary-500);
        @media (min-width: 375px) and (max-width: 1439px) {
          font-size: 1rem;
        }
      }
      p {
        margin: 0;
        font-weight: 500;
        font-size: 0.875rem;
        color: var(--secondary-300);
        text-wrap: wrap;
        @media (min-width: 375px) and (max-width: 1439px) {
          font-size: 0.75rem;
        }
      }
    }
    .totalDollars {
      font-weight: bold;
      font-size: 2rem;
      color: var(--secondary-500);
      @media (min-width: 375px) and (max-width: 1439px) {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
