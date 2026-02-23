<template>
  <div class="mainPagePaymentAccountData">
    <div class="topPaymentAccountData">
      <div class="carImagePaymentAccountData">
        <img src="/cars/CR-V.png" alt="" class="carImageData" />
      </div>
      <div class="carInformationPaymentAccountData">
        <div class="topCarName">
          <h4>Nissan GT - R</h4>
          <p>#976</p>
        </div>
        <p>Sport Car</p>
      </div>
    </div>
    <div
      v-if="rentalStore.pickup && rentalStore.dropoff"
      class="widgetsPaymentAccountData"
    >
      <PickUp title="Pick - Up" class="pick-up" :data="rentalStore.pickup" />
      <PickUp
        title="Drop - Off"
        :data="rentalStore.dropoff"
        class="dropOffAccount"
      />
    </div>
    <div class="borderPriceAccountData"></div>
    <div class="totalRentalPricePaymentAccountData">
      <div class="textPriceAccountData">
        <h4>Total Rental Price</h4>
        <p class="pcView">Overall price and includes rental discount</p>
        <p class="mobileView">Overall price rental</p>
      </div>
      <div class="priceAccountData">$80.00</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// виджеты
const rentalStore = useRentalStore();
</script>

<style>
.mainPagePaymentAccountData {
  .topPaymentAccountData {
    display: flex;
    flex-direction: row;
    background-color: var(--primary-0);
    padding-left: 1.5rem;
    padding-top: 2rem;
    .carImagePaymentAccountData {
      background-color: var(--information-500);
      background-image: url("/backgroundCards/BG.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      max-width: 132px;
      max-height: 72px;
      display: flex;
      justify-content: center;
      border-radius: 8px;
      .carImageData {
        padding-bottom: 1.125rem;
        padding-top: 1.125rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        max-width: 116px;
        max-height: 36px;
      }
    }
    .carInformationPaymentAccountData {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 1rem;
      .topCarName {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        h4 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--secondary-500);
          @media (min-width: 1px) and (max-width: 1280px) {
            font-size: 1.25rem;
          }
        }
        p {
          display: flex;
          justify-content: end;
          align-items: center;
          padding-left: 7rem;
          padding-right: 1.5rem;
          margin: 0;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--secondary-300);
          @media (min-width: 1px) and (max-width: 1280px) {
            padding-left: 0.5rem;
            font-size: 0.75rem;
          }
        }
      }
      p {
        margin: 0;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--secondary-300);
        @media (min-width: 1px) and (max-width: 1280px) {
          font-size: 0.75rem;
        }
      }
    }
  }
  .widgetsPaymentAccountData {
    .dropOffAccount {
      margin-top: -1rem;
      padding-bottom: 2rem;
      border-radius: 0;
    }
    @media (min-width: 1px) and (max-width: 1440px) {
    }
  }
  .borderPriceAccountData {
    border-top: 1px solid var(--secondary-300);
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
  .totalRentalPricePaymentAccountData {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-bottom: 1.5rem;
    padding-top: 3.6rem;
    background-color: var(--primary-0);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    @media (min-width: 1px) and (max-width: 1280px) {
      padding-left: 1rem;
      padding-right: 1rem;
      padding-bottom: 1rem;
    }
    .textPriceAccountData {
      h4 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--secondary-500);
        @media (min-width: 1px) and (max-width: 1280px) {
          font-size: 1rem;
        }
      }
      p {
        margin: 0;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--secondary-300);
        @media (min-width: 1px) and (max-width: 1280px) {
          font-size: 0.75rem;
        }
      }
      .pcView {
        @media (min-width: 1px) and (max-width: 1440px) {
          display: none;
        }
      }
      .mobileView {
        @media (width: 1440px) {
          display: none;
        }
      }
    }
    .priceAccountData {
      margin: 0;
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--secondary-500);
      @media (min-width: 1px) and (max-width: 1280px) {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
