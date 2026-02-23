<template>
  <div class="detailCard">
    <div class="topDetailCard">
      <div class="topHalfDetail">
        <div class="nameDetailCard">{{ product.name }}</div>
        <div class="ratingDetailCard">
          <Star></Star>
          <Star></Star>
          <Star></Star>
          <Star></Star>
          <Star></Star>
          <p>500+ Reviewer</p>
        </div>
      </div>
      <button><Heart_linear></Heart_linear></button>
    </div>
    <div class="descriptionDetailCard">
      NISMO has become the embodiment of Nissan's outstanding performance,
      inspired by the most unforgiving proving ground, the "race track".
    </div>
    <div class="specificationDetailCard">
      <div class="blockOneSpecification">
        <div class="specificationType">
          <p>Type Car</p>
          <h5>{{ product.category }}</h5>
        </div>
        <div class="specificationType">
          <p>Steering</p>
          <h5>{{ product.drive }}</h5>
        </div>
      </div>
      <div class="blockTwoSpecification">
        <div class="specificationType">
          <p>Capacity</p>
          <h5>{{ product.seats }} Person</h5>
        </div>
        <div class="specificationType">
          <p>Gasoline</p>
          <h5>{{ product.gasoline }}L</h5>
        </div>
      </div>
    </div>
    <div class="priceDetailCard">
      <div class="priceDetail">${{ product.price }}/ <span>days</span></div>
      <ButtonRental label="Rent Now"></ButtonRental>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Heart_linear from "./icons/cardsIcons/heart_linear.vue";
import Star from "./icons/star.vue";
import ButtonRental from "./Button-rental.vue";

defineProps<{
  product: {
    id: number;
    name: string;
    category: string;
    image: string;
    gasoline: number;
    drive: string;
    seats: number;
    price: number;
    favorite: boolean;
  };
}>();
</script>

<style>
.detailCard {
  background-color: var(--primary-0);
  border-radius: 10px;
  .topDetailCard {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 1.5rem;
    padding-top: 1.5rem;
    padding-right: 1.5rem;
    .topHalfDetail {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      .nameDetailCard {
        color: var(--secondary-500);
        font-size: 2rem;
        font-weight: 700;
      }
      .ratingDetailCard {
        display: flex;
        flex-direction: row;
        align-items: end;
        line-height: 1;
        p {
          display: flex;
          padding-left: 0.5rem;
          margin: 0;
        }
        .icon-container {
          color: #fbad39;
        }
        p {
          color: var(--secondary-300);
          font-size: 0.875rem;
          font-weight: 500;
          margin: 0;
        }
      }
    }
    button {
      display: flex;
      align-items: start;
    }
  }
  .descriptionDetailCard {
    color: var(--secondary-400);
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 200%;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 2rem;
  }
  .blockOneSpecification {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .specificationType {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      p,
      h5 {
        margin: 0;
      }

      p {
        color: var(--secondary-300);
        font-size: 1.25rem;
        font-weight: 400;
      }
      h5 {
        color: var(--secondary-400);
        font-size: 1.25rem;
        font-weight: 600;
      }
    }
  }

  .blockTwoSpecification {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    .specificationType {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      p,
      h5 {
        margin: 0;
      }

      p {
        color: var(--secondary-300);
        font-size: 1.25rem;
        font-weight: 400;
      }
      h5 {
        color: var(--secondary-400);
        font-size: 1.25rem;
        font-weight: 600;
      }
    }
  }
  .specificationDetailCard {
    display: flex;
    flex-direction: row;
    gap: 2.75rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 2rem;
    padding-bottom: 4.25rem;
    text-wrap: nowrap;
  }
  .priceDetailCard {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-bottom: 1.5rem;
    .priceDetail {
      color: var(--secondary-500);
      font-size: 1.75rem;
      font-weight: 700;
      span {
        color: var(--secondary-300);
        font-size: 1rem;
        font-weight: 700;
      }
    }
  }
}
</style>
