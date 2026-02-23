<template>
  <button
    class="button"
    :class="{ 'button-alternate': alternate }"
    @click="handleClick"
  >
    <div class="text-container">{{ label }}</div>
  </button>
</template>

<script lang="ts" setup>
import type { Product } from "~~/data/products";
const props = defineProps<{
  label: string;
  alternate?: boolean;
  product?: Product;
}>();

const router = useRouter();
// const goSummary = (id: number) => {
//   router.push(`/paymentCarRent/${id}`);
// };
const emit = defineEmits(["click"]);
const handleClick = (mouse: MouseEvent) => {
  emit("click", event);
};
</script>

<style>
.button {
  display: inline-flex;
  align-self: start;
  justify-content: center;
  background-color: var(--primary-500);
  border-radius: 4px;
  position: relative;
  z-index: 2;
  gap: 0.5rem;

  :hover {
    transform: scale(1.3)
  }

  .text-container {
    color: var(--primary-0);
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.875rem 1.75rem;
    text-wrap: nowrap;
    transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
}
.button-alternate {
  background-color: var(--information-500);

  .text-container {
    color: var(--primary-0);
  }
}

@media (min-width: 565px) and (max-width: 1439px) {
  .button {
    align-self: center;
  }
}
</style>
