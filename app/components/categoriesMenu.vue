<template>
  <div class="mainPartCategories">
    <div class="typeCategoriesMenu">
      <div class="typeCategory">
        <h5>Type</h5>
        <div class="categoryCarMenu">
          <div
            v-for="item in typeCategories"
            :key="item.type"
            class="categoryItem"
            @click="toggleType(item.type)"
            :class="{ active: selectedTypes.includes(item.type) }"
          >
            <div
              class="checkbox-box"
              :class="{ 'is-active': selectedTypes.includes(item.type) }"
            >
              <Transition name="scale">
                <TickSquare v-if="selectedTypes.includes(item.type)" />
              </Transition>
            </div>
            {{ item.type }}
            <div class="quantity">({{ item.count }})</div>
          </div>
        </div>
      </div>
    </div>
    <div class="capasityCategoriesMenu">
      <div class="typeCategory2">
        <h5>Capacity</h5>
        <div
          class="categoryCarMenu2"
          v-for="item in capacityCategories"
          :key="item.seats"
          @click="toggleCapacity(item.seats)"
          :class="{ active: selectedCapacities.includes(item.seats) }"
        >
          <div
            class="checkbox-box"
            :class="{ 'is-active': selectedCapacities.includes(item.seats) }"
          >
            <Transition name="scale">
              <TickSquare v-if="selectedCapacities.includes(item.seats)" />
            </Transition>
          </div>
          {{ item.seats }} Person
          <div class="quantity">({{ item.count }})</div>
        </div>
      </div>
    </div>
    <div class="priceCategoriesMenu">
      <h5>PRICE</h5>
      <div class="priceRange">
        <div class="range-container">
          <div class="range-track"></div>
          <div class="range-progress" :style="{ width: fillWidth + '%' }"></div>
          <input
            type="range"
            min="0"
            max="200"
            step="1"
            v-model.number="maxPrice"
            class="slider"
          />
        </div>

        <div class="priceValues">
          <span>Max. ${{ maxPrice }}.00</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";

export interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  gasoline: number;
  drive: string;
  seats: number;
  price: number;
  favorite: boolean;
}
import { products } from "~~/data/products.ts";
import TickSquare from "./icons/tickSquare.vue";

// массив категорий
const typeCategories = computed(() => {
  const map = new Map<string, number>();
  products.forEach((p) => {
    map.set(p.category, (map.get(p.category) || 0) + 1);
  });
  return Array.from(map.entries()).map(([type, count]) => ({ type, count }));
});

const capacityCategories = computed(() => {
  const map = new Map<number, number>();
  products.forEach((p) => {
    map.set(p.seats, (map.get(p.seats) || 0) + 1);
  });
  return Array.from(map.entries())
    .map(([seats, count]) => ({ seats, count }))
    .sort((a, b) => a.seats - b.seats);
});

// полоса цены
const maxPrice = ref(200);
const fillWidth = computed(() => {
  return (maxPrice.value / 200) * 100;
});

// отправка данных в родительский и категоризация
const emit = defineEmits(["updateFilters"]);

const selectedTypes = ref<string[]>([]);
const selectedCapacities = ref<number[]>([]);

const toggleType = (type: string) => {
  if (selectedTypes.value.includes(type)) {
    selectedTypes.value = selectedTypes.value.filter((t) => t !== type);
  } else {
    selectedTypes.value.push(type);
  }
};

const toggleCapacity = (seats: number | string) => {
  const s = Number(seats);
  const index = selectedCapacities.value.indexOf(s);

  if (index > -1) {
    selectedCapacities.value.splice(index, 1);
  } else {
    selectedCapacities.value.push(s);
  }
};

watch(
  [selectedTypes, selectedCapacities, maxPrice],
  () => {
    emit("updateFilters", {
      types: [...selectedTypes.value],
      capacities: [...selectedCapacities.value],
      price: maxPrice.value,
    });
  },
  { deep: true, immediate: true },
);
</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
.mainPartCategories {
  background-color: var(--categoryTheme);
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  .typeCategoriesMenu {
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    padding-left: 2rem;
    padding-right: 9.5rem;
    .typeCategory {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;

      h5 {
        margin: 0;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--secondary-300);
      }
      .categoryCarMenu {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--secondary-400);
        line-height: 1;
        .quantity {
          font-weight: 600;
          font-size: 1.25rem;
          color: var(--secondary-300);
        }
        .categoryItem {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.5rem;

          .checkbox-box {
            width: 24px;
            height: 24px;
            border: 2px solid var(--secondary-300);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.5s ease;
            cursor: pointer;
            flex-shrink: 0;
            background-color: transparent;
            overflow: hidden;
          }

          .categoryItem:hover .checkbox-box,
          .categoryCarMenu2:hover .checkbox-box {
            border-color: var(--primary-500);
          }

          .checkbox-box.is-active {
            background-color: var(--primary-500);
            border-color: var(--primary-500);
            color: var(--primary-500);
          }

          .checkbox-box svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .capasityCategoriesMenu {
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    padding-left: 2rem;
    padding-right: 9.5rem;
    .typeCategory2 {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;

      h5 {
        margin: 0;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--secondary-300);
      }
      .categoryCarMenu2 {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--secondary-400);
        text-wrap: nowrap;
        .quantity {
          font-weight: 600;
          font-size: 1.25rem;
          color: var(--secondary-300);
        }
        .checkbox-box {
          width: 24px;
          height: 24px;
          border: 2px solid var(--secondary-300);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s ease;
          cursor: pointer;
          flex-shrink: 0;
          background-color: transparent;
          overflow: hidden;
        }

        .categoryItem:hover .checkbox-box,
        .categoryCarMenu2:hover .checkbox-box {
          border-color: var(--primary-500);
        }

        .checkbox-box.is-active {
          background-color: var(--primary-500);
          border-color: var(--primary-500);
          color: var(--primary-500);

        }

        .checkbox-box svg {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .priceCategoriesMenu {
    display: flex;
    flex-direction: column;
    padding-left: 2rem;

    h5 {
      margin: 0;
      padding-bottom: 2rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--secondary-300);
      text-transform: uppercase;
    }

    .priceRange {
      display: flex;
      flex-direction: column;
      max-width: 296px;
      width: 100%;

      .range-container {
        position: relative;
        width: 100%;
        height: 12px;
        display: flex;
        align-items: center;

        .range-track {
          position: absolute;
          width: 100%;
          height: 12px;
          background-color: var(--secondary-200);
          border-radius: 10px;
        }

        .range-progress {
          position: absolute;
          height: 12px;
          background-color: var(--primary-500);
          border-radius: 10px;
          pointer-events: none;
        }

        .slider {
          appearance: none;
          width: 100%;
          background: transparent;
          position: relative;
          z-index: 2;
          cursor: pointer;
          margin: 0;

          &:focus {
            outline: none;
          }
          &:hover::-webkit-slider-thumb {
            transform: scale(1.1);
            box-shadow:
              0 0 0 2px var(--primary-500),
              0px 4px 8px rgba(0, 0, 0, 0.15);
          }

          &:active::-webkit-slider-thumb {
            transform: scale(0.95);
            background: #2a52cc;
          }

          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: var(--primary-500);
            border: 4px solid #ffffff;
            cursor: pointer;
          }

          &::-webkit-slider-runnable-track {
            background: transparent;
          }
        }
      }
    }

    .priceValues {
      padding-top: 0.75rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--secondary-400);
      padding-bottom: 2rem;
    }
  }
}
</style>
