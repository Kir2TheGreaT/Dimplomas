<template>
  <div class="paymentMethodMain">
    <div class="paymentMethodTop">
      <div class="text">
        <h4>Payment Method</h4>
        <p>Please enter your payment method</p>
      </div>
      <div class="paymentMethodSteps">Step 3 of 4</div>
    </div>
    <div class="paymentMethodCenter">
      <div class="paymentMethodRental">
        <div class="topPaymentMethod">
          <div class="visaPayment">
            <div class="circleBluePaymentMethod"></div>
            <h4>Credit Card</h4>
          </div>
          <img src="/paySystems/Visa.png" alt="" />
        </div>
        <div class="mainPaymentMethod">
          <div class="firstPaymentMethodColumn">
            <div class="cardNumberPaymentMethod">
              <p>Card Number</p>
              <div class="cardNumberPaymentMethodInput">
                <input
                  type="text"
                  placeholder="Card Number"
                  v-model="store.payment.cardNumber"
                />
              </div>
            </div>
            <div class="cardHolderPaymentMethod">
              <p>Card Holder</p>
              <div class="cardHolderPaymentMethodInput">
                <input
                  type="text"
                  placeholder="Card Holder"
                  v-model="store.payment.cardHolder"
                />
              </div>
            </div>
          </div>
          <div class="SecondPaymentMethodColumn">
            <div class="exprationDatePaymentMethod">
              <p>Expiration Date</p>
              <div class="exprationDatePaymentMethodInput">
                <input
                  type="text"
                  placeholder=" MM / YY"
                  v-model="store.payment.expirationDate"
                />
              </div>
            </div>
            <div class="exprationDatePaymentMethod">
              <p>CVC</p>
              <div class="exprationDatePaymentMethodInput CVC">
                <input
                  type="text"
                  placeholder="CVC"
                  v-model="store.payment.cvc"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottomPaymentMethod">
      <div class="payPal-bottomPaymentMethod" @click="setMethod('paypal')">
        <div class="namePaymentMethod">
          <div class="selection-wrapper">
            <TickSquare
              v-if="store.payment.method === 'paypal'"
              class="blue-icon"
            />
            <div v-else class="empty-square"></div>
          </div>
          <p>PayPal</p>
        </div>
        <img src="/paySystems/PayPal.png" alt="" />
      </div>
      <div class="bitCoin-bottomPaymentMethod" @click="setMethod('bitcoin')">
        <div class="namePaymentMethod">
          <div class="selection-wrapper">
            <TickSquare
              v-if="store.payment.method === 'bitcoin'"
              class="blue-icon"
            />
            <div v-else class="empty-square"></div>
          </div>
          <p>Bitcoin</p>
        </div>
        <img src="/paySystems/Bitcoin.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TickSquare from "../../icons/tickSquare.vue";
import { ref } from "vue";

const selectedPaymentMethod = ref<string[]>([]);
const toggleMethod = (method: string) => {
  const index = selectedPaymentMethod.value.indexOf(method);
  if (index === -1) {
    selectedPaymentMethod.value.push(method);
  } else {
    selectedPaymentMethod.value.splice(index, 1);
  }
};

import { usePaymentStore } from "@/stores/toast";
const store = usePaymentStore();
const setMethod = (method: string) => {
  store.payment.method = method;
};
</script>

<style>
.paymentMethodMain {
  background-color: var(--primary-0);
  border-radius: 10px;
  .paymentMethodTop {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 1.5rem;
    @media (min-width: 375px) and (max-width: 1439px) {
      padding-left: 1rem;
      padding-right: 1rem;
      padding-top: 1rem;
    }
    .text {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      h4 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: bold;
        color: var(--secondary-500);
        @media (min-width: 375px) and (max-width: 1439px) {
          font-size: 0.875rem;
        }
      }
      p {
        margin: 0;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--secondary-300);
        @media (min-width: 375px) and (max-width: 1439px) {
          font-size: 0.75rem;
        }
      }
    }
    .paymentMethodSteps {
      display: flex;
      padding-top: 1.75rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--secondary-300);
      @media (min-width: 375px) and (max-width: 1439px) {
        font-size: 0.75rem;
      }
    }
  }
  .paymentMethodCenter {
    .paymentMethodRental {
      background-color: var(--backgroundpages);
      border-radius: 10px;
      margin: 2rem 1.5rem 1.5rem;
      @media (min-width: 375px) and (max-width: 1439px) {
        margin: 1.5rem 1rem 1.25rem;
      }

      .topPaymentMethod {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        padding-left: 1.5rem;
        padding-bottom: 1.5rem;
        padding-top: 1.5rem;
        @media (min-width: 375px) and (max-width: 1439px) {
          padding-left: 1rem;
          padding-bottom: 1.25rem;
          padding-top: 1rem;
        }
        img {
          padding-right: 1.5rem;
          width: 92px;
          @media (min-width: 375px) and (max-width: 1439px) {
            padding-right: 1rem;
          }
        }
        .visaPayment {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.5rem;
          h4 {
            margin: 0;
          }
          .circleBluePaymentMethod {
            width: 0.5rem;
            height: 0.5rem;
            background: var(--primary-500);
            border-radius: 50%;
            outline: 4px solid rgba(53, 99, 233, 0.3);
            margin-top: -0.1rem;
            animation: breatheBlue 2.2s ease-in-out infinite;
          }
        }
      }
      .mainPaymentMethod {
        display: flex;
        flex-direction: row;
        @media (min-width: 375px) and (max-width: 1439px) {
          flex-direction: column;
        }
        .firstPaymentMethodColumn {
          display: flex;
          flex-direction: column;
          padding-left: 1.5rem;
          gap: 1.5rem;
          padding-right: 2rem;
          @media (min-width: 375px) and (max-width: 1439px) {
            padding-left: 1rem;
            padding-right: 1rem;
            gap: 1.25rem;
          }
          .cardNumberPaymentMethod {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            @media (min-width: 375px) and (max-width: 1439px) {
              gap: 0.75rem;
            }
            p {
              font-size: 1rem;
              font-weight: 600;
              margin: 0;
              color: var(--secondary-500);
              @media (min-width: 375px) and (max-width: 1439px) {
                font-size: 0.875rem;
              }
            }
            .cardNumberPaymentMethodInput {
              display: flex;
              align-items: center;
              flex-direction: row;
              input {
                width: 365px;
                border: 0;
                background-color: var(--primary-0);
                border-radius: 10px;
                color: var(--secondary-300);
                padding-top: 1rem;
                padding-left: 2rem;
                padding-bottom: 1rem;
                font-weight: 500;
                font-size: 0.875rem;
                @media (min-width: 375px) and (max-width: 1439px) {
                  width: auto;
                  font-size: 0.75rem;
                  display: flex;
                  flex-grow: 1;
                }
              }
            }
          }
          .cardHolderPaymentMethod {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding-bottom: 2rem;
            @media (min-width: 375px) and (max-width: 1439px) {
              padding-bottom: 1.25rem;
              gap: 0.75rem;
            }
            p {
              font-size: 1rem;
              font-weight: 600;
              margin: 0;
              color: var(--secondary-500);
              @media (min-width: 375px) and (max-width: 1439px) {
                font-size: 0.875rem;
              }
            }
            .cardHolderPaymentMethodInput {
              display: flex;
              align-items: center;
              flex-direction: row;
              input {
                width: 365px;
                border: 0;
                background-color: var(--primary-0);
                border-radius: 10px;
                color: var(--secondary-300);
                padding-top: 1rem;
                padding-left: 2rem;
                padding-bottom: 1rem;
                font-weight: 500;
                font-size: 0.875rem;
                @media (min-width: 375px) and (max-width: 1439px) {
                  width: auto;
                  font-size: 0.75rem;
                  display: flex;
                  flex-grow: 1;
                }
              }
            }
          }
        }
        .SecondPaymentMethodColumn {
          display: flex;
          flex-direction: column;
          padding-left: 1.5rem;
          gap: 1.5rem;
          padding-right: 2rem;
          @media (min-width: 375px) and (max-width: 1439px) {
            gap: 1.25rem;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .exprationDatePaymentMethod {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            @media (min-width: 375px) and (max-width: 1439px) {
              gap: 0.75rem;
            }
            p {
              font-size: 1rem;
              font-weight: 600;
              margin: 0;
              color: var(--secondary-500);
              @media (min-width: 375px) and (max-width: 1439px) {
                font-size: 0.875rem;
              }
            }
            .exprationDatePaymentMethodInput {
              display: flex;
              align-items: center;
              flex-direction: row;
              @media (min-width: 375px) and (max-width: 1439px) {
                &.CVC {
                  margin-bottom: 1rem;
                }
              }
              input {
                width: 365px;
                border: 0;
                background-color: var(--primary-0);
                border-radius: 10px;
                color: var(--secondary-300);
                padding-top: 1rem;
                padding-left: 2rem;
                padding-bottom: 1rem;
                font-weight: 500;
                font-size: 0.875rem;
                @media (min-width: 375px) and (max-width: 1439px) {
                  font-size: 0.75rem;
                  width: auto;
                  display: flex;
                  flex-grow: 1;
                }
              }
            }
          }
        }
      }
    }
  }
  .bottomPaymentMethod {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-right: 1.5rem;
    padding-bottom: 1.5rem;
    padding-left: 1.5rem;
    .payPal-bottomPaymentMethod,
    .bitCoin-bottomPaymentMethod {
      cursor: pointer;
      transition: background-color 0.5s ease;
    }

    .payPal-bottomPaymentMethod:hover,
    .bitCoin-bottomPaymentMethod:hover {
      filter: brightness(0.98);
    }

    @media (min-width: 375px) and (max-width: 1439px) {
      padding-left: 1rem;
      padding-right: 1rem;
      padding-bottom: 1rem;
    }
    .payPal-bottomPaymentMethod {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-color: var(--backgroundpages);
      border-radius: 10px;
      .selection-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 1.5rem;
      }
      img {
        object-fit: contain;
        padding-right: 2rem;
        width: 92px;
        @media (min-width: 375px) and (max-width: 1439px) {
          padding-right: 1rem;
        }
      }
      .namePaymentMethod {
        display: flex;
        flex-direction: row;
        gap: 1.25rem;
        align-items: center;
        line-height: 1;
        padding-top: 1rem;
        padding-bottom: 1rem;
        @media (min-width: 375px) and (max-width: 1439px) {
          gap: 0.5rem;
        }
        .empty-square {
          width: 24px;
          height: 24px;
          border: 1.5px solid var(--secondary-300);
          border-radius: 50%;
          box-sizing: border-box;
          @media (min-width: 375px) and (max-width: 1439px) {
            width: 16px;
            height: 16px;
            padding-left: 1rem;
          }
        }
        .blue-icon {
          width: 24px;
          height: 24px;
          color: var(--primary-500);
          display: block;
          @media (min-width: 375px) and (max-width: 1439px) {
            width: 16px;
            height: 16px;
          }
        }
        p {
          margin: 0;
          font-weight: 600;
          font-size: 1rem;
          color: var(--secondary-500);
          @media (min-width: 375px) and (max-width: 1439px) {
            font-size: 0.875rem;
          }
        }
      }
    }
    .bitCoin-bottomPaymentMethod {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-color: var(--backgroundpages);
      border-radius: 10px;
      .selection-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 1.5rem;
      }
      img {
        object-fit: contain;
        padding-right: 2rem;
        width: 92px;
        @media (min-width: 375px) and (max-width: 1439px) {
          padding-right: 1rem;
        }
      }
      .namePaymentMethod {
        display: flex;
        flex-direction: row;
        gap: 1.25rem;
        align-items: center;
        line-height: 1;
        padding-top: 1rem;
        padding-bottom: 1rem;
        @media (min-width: 375px) and (max-width: 1439px) {
          gap: 0.5rem;
        }
        .empty-square {
          width: 24px;
          height: 24px;
          border: 1.5px solid var(--secondary-300);
          border-radius: 50%;
          box-sizing: border-box;
          @media (min-width: 375px) and (max-width: 1439px) {
            width: 16px;
            height: 16px;
            padding-left: 1rem;
          }
        }
        .blue-icon {
          width: 24px;
          height: 24px;
          color: var(--primary-500);
          display: block;
          @media (min-width: 375px) and (max-width: 1439px) {
            width: 16px;
            height: 16px;
          }
        }
        p {
          margin: 0;
          font-weight: 600;
          font-size: 1rem;
          color: var(--secondary-500);
          @media (min-width: 375px) and (max-width: 1439px) {
            font-size: 0.875rem;
          }
        }
      }
    }
  }
}
@keyframes breatheBlue {
  0% {
    transform: scale(1);
    outline-color: rgba(53, 99, 233, 0.3);
  }

  50% {
    transform: scale(1.25);
    outline-color: rgba(53, 99, 233, 0.1);
  }

  100% {
    transform: scale(1);
    outline-color: rgba(53, 99, 233, 0.3);
  }
}
</style>
