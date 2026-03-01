<template>
  <Teleport to="body">
    <Transition name="slide-fade">
      <div
        v-if="isOpen"
        class="favorites-dropdown"
        ref="dropdownRef"
        :style="dropdownStyle"
      >
        <div class="dropdown-header">
          <h3>Favorites ({{ favoritesProducts.length }})</h3>
          <button class="close-btn" @click="$emit('close')">
            <Close />
          </button>
        </div>

        <div v-if="favoritesProducts.length > 0" class="dropdown-list">
          <div
            v-for="item in favoritesProducts"
            :key="item.id"
            class="dropdown-item"
          >
            <img :src="item.image" alt="" />
            <div class="item-info">
              <p class="name">{{ item.name }}</p>
              <p class="price">${{ item.price.toFixed(2) }}/day</p>
            </div>
            <button class="trash-btn" @click="removeItem(item.id)">
              <Trash />
            </button>
          </div>
          <div class="actions">
            <span v-if="totalPrice > 0" class="total-badge"
              >${{ totalPrice.toFixed(2) }}</span
            >
            <button
              class="clear-all"
              :class="{ 'is-confirming': isConfirming }"
              @click="handleClearAll"
            >
              <span v-if="!isConfirming">Clear All</span>
              <span v-else>Are you sure?</span>
            </button>
          </div>
        </div>
        <div v-else class="empty-favorites">
          <p>Your list is empty!</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { useFavorites } from "~/stores/favorites";
import { products } from "~~/data/products";
import { computed } from "vue";
import Close from "./icons/accountIcons/favoritesIcons/close.vue";
import Trash from "./icons/accountIcons/favoritesIcons/trash.vue";

const props = defineProps<{
  isOpen: boolean;
  anchor: HTMLElement | null;
}>();

// закрытие элемента
const dropdownRef = ref<HTMLElement | null>(null);
const handleClickOutside = (event: MouseEvent) => {
  if (
    props.isOpen &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target as Node)
  ) {
    emit("close");
  }
};

onMounted(() => {
  window.addEventListener("mousedown", handleClickOutside);
  window.addEventListener("scroll", updatePosition);
});

onUnmounted(() => {
  window.removeEventListener("mousedown", handleClickOutside);
  window.removeEventListener("scroll", updatePosition);
});

// создание частей элемента
const emit = defineEmits(["close"]);
const favoritesCar = useFavorites();
const totalPrice = computed(() => {
  return favoritesProducts.value.reduce((sum, item) => sum + item.price, 0);
});

const isConfirming = ref(false);
let confirmTimer: ReturnType<typeof setTimeout> | null = null;

const handleClearAll = () => {
  if (!isConfirming.value) {
    isConfirming.value = true;
    confirmTimer = setTimeout(() => {
      isConfirming.value = false;
    }, 3000);
  } else {
    favoritesCar.favoritesIds = [];
    isConfirming.value = false;
    if (confirmTimer) clearTimeout(confirmTimer);
  }
};

const favoritesProducts = computed(() => {
  return products.filter((product) =>
    favoritesCar.favoritesIds.includes(Number(product.id)),
  );
});

const removeItem = (id: number) => {
  favoritesCar.toggleFavorite(id);
};

// позиционирование
const dropdownStyle = ref({
  top: "0px",
  left: "0px",
});

const updatePosition = () => {
  if (!props.anchor) return;
  const react = props.anchor.getBoundingClientRect();
  dropdownStyle.value = {
    top: `${react.bottom + window.scrollY + 8}px`,
    left: `${react.right - 300 + window.scrollX}px`,
  };
};
watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      nextTick(updatePosition);
    }
  },
);
</script>

<style scoped>
.favorites-dropdown {
  position: absolute;
  width: 300px;
  background-color: var(--primary-0);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 999;
  padding: 1rem;
  border: 1px solid rgba(195, 212, 233, 0.4);

  .dropdown-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--secondary-500);
      margin: 0;
    }

    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      color: var(--secondary-400);

      &:hover {
        color: var(--error-500);
      }
    }
  }

  .dropdown-list {
    max-height: 345px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    .dropdown-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid rgba(195, 212, 233, 0.1);

      &:last-child {
        border-bottom: none;
      }

      img {
        width: 60px;
        height: 40px;
        object-fit: contain;
      }

      .item-info {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--secondary-500);
          margin: 0;
        }

        .price {
          font-size: 0.75rem;
          color: #ed3f3f;
          font-weight: 700;
          margin: 0;
        }
      }

      .trash-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        color: var(--secondary-300);
        display: flex;
        align-items: center;

        &:hover {
          color: #ed3f3f;
        }
      }
    }
    .actions {
      padding-top: 1rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 0.5rem;
      span {
        font-size: 1rem;
        font-weight: bold;
      }
      .clear-all {
        width: 100%;
        padding: 0.6rem;
        background: none;
        border: 1px dashed var(--secondary-300);
        border-radius: 8px;
        color: var(--secondary-400);
        font-size: 0.75rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
          background: var(--error-700);
          border-color: var(--success-500);
          color: var(--warning-500);
        }
      }
    }
  }

  .empty-favorites {
    text-align: center;
    padding: 2rem 0;

    p {
      color: var(--secondary-300);
      font-size: 0.875rem;
      margin: 0;
    }
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
