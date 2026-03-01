<template>
  <div class="paymentMainPage">
    <div class="paymentData">
      <Billing class="billingPayment"></Billing>
      <RentalInfo class="rentalPayment"></RentalInfo>
      <PaymentMethod class="paymentPayments"></PaymentMethod>
      <Confirmation class="confirmationPayment"></Confirmation>
    </div>
    <div class="cardPaymentData" v-if="product">
      <RentalSummary :product="product" />
    </div>
    <p v-else>Product not found</p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Billing from "~/components/paymentPage/paymentSteps/billing.vue";
import Confirmation from "~/components/paymentPage/paymentSteps/confirmation.vue";
import PaymentMethod from "~/components/paymentPage/paymentSteps/paymentMethod.vue";
import RentalInfo from "~/components/paymentPage/paymentSteps/rentalInfo.vue";
import RentalSummary from "~/components/paymentPage/rentalSummary.vue";
import { products } from "~~/data/products.ts";
const route = useRoute();
const productId = Number(route.params.id);
const product = computed(() => products.find((p) => p.id === productId));
</script>

<style>
.paymentMainPage {
  max-width: 1440px;
  background-color: var(--backgroundpages);
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
  @media (min-width: 375px) and (max-width: 1279px) {
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 1280px) and (max-width: 1439px) {
    flex-direction: row-reverse;
  }
  .paymentData {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    @media (min-width: 375px) and (max-width: 1439px) {
      display: flex;
      order: 2;
      padding-top: 0;
      padding-bottom: 0;
    }
    @media (min-width: 1280px) and (max-width: 1439px) {
      padding-bottom: 2rem;
      padding-top: 2rem;
    }
    .billingPayment {
      margin-bottom: 2rem;
    }
    .rentalPayment {
      margin-bottom: 2rem;
    }
    .paymentPayments {
      margin-bottom: 2rem;
    }
  }
  .cardPaymentData {
    padding-top: 2rem;
    padding-right: 2rem;
    @media (min-width: 375px) and (max-width: 1439px) {
      display: flex;
      order: 1;
      padding: 2rem 1.5rem;
    }
  }
}
</style>
