<template>
  <div class="icon-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M9.01023 20.5002L3.99023 15.4902"
        style="
          stroke: currentColor;
          stroke-width: 1.5;
          stroke-miterlimit: 10;
          stroke-linecap: round;
          stroke-linejoin: round;
        "
      />
      <path
        d="M9.00977 3.5V20.5"
        style="
          stroke: currentColor;
          stroke-width: 1.5;
          stroke-miterlimit: 10;
          stroke-linecap: round;
          stroke-linejoin: round;
        "
      />
      <path
        d="M14.9902 3.5L20.0102 8.51"
        style="
          stroke: currentColor;
          stroke-width: 1.5;
          stroke-miterlimit: 10;
          stroke-linecap: round;
          stroke-linejoin: round;
        "
      />
      <path
        d="M14.9902 20.5V3.5"
        style="
          stroke: currentColor;
          stroke-width: 1.5;
          stroke-miterlimit: 10;
          stroke-linecap: round;
          stroke-linejoin: round;
        "
      />
    </svg>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.icon-container {
  display: inline-flex;
  color: var(--primary-0);
}

.icon-container svg {
  transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
}

.icon-container.rotated svg {
  transform: rotate(180deg);
}
</style>

<style scoped>
.icon-container {
  display: inline-flex;
  cursor: pointer;
  color: var(--primary-0);
}

.icon-container svg {
  transition: transform 1s cubic-bezier(0.65, 0, 0.35, 1);
  transform-origin: center;
}

.icon-container.rotated svg {
  transform: rotate(360deg);
}
</style>
