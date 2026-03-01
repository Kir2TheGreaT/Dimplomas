<template>
  <div class="mainPageProjectMap">
    <div class="topProjectMap">Details Rental</div>
    <div v-if="!yandexMapIsLoaded" class="fakeMap">
      <img src="/maps/Maps.png" alt="" />
    </div>

    <YandexMap
      v-if="yandexMapIsLoaded"
      :settings="{
        location: {
          center: center,
          zoom: zoom,
        },
      }"
      style="width: 100%; height: 400px"
    >
      <YandexMapDefaultSchemeLayer />
      <YandexMapDefaultFeaturesLayer />
    </YandexMap>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  yandexMapIsLoaded,
} from "vue-yandex-maps";

const center = ref([37.617644, 55.755819]);
const zoom = ref(10);
</script>

<style>
.mainPageProjectMap {
  display: flex;
  flex-direction: column;
  background-color: var(--primary-0);
  border-radius: 10px;
  .topProjectMap {
    padding-left: 1.5rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    color: var(--secondary-500);
    font-weight: bold;
    font-size: 1.25rem;
  }
  img {
    width: 486px;
    height: 272px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    @media (min-width: 1px) and (max-width: 1440px) {
      max-width: 295px;
      max-height: 272px;
    }
  }
  .yandexProjectMap {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
}
</style>
