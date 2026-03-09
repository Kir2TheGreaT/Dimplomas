<template>
  <header class="header">
    <div class="main-header">
      <button @click="sidebarNav.toggleSidebar()">
        <menu-icon class="menu-icon" v-if="isSpecial" />
      </button>
      <h1 class="Logo" @click="goMain">MORENT</h1>

      <div class="headerImage">
        <div class="headerIcons">
          <button
            class="favorite-nav-btn"
            :class="{
              'is-active': favoritesStore.favoritesIds.length > 0,
              'is-visible': favoritesStore.favoritesIds.length > 0 || isDesktop,
            }"
            @click.stop="isFavoritesOpen = !isFavoritesOpen"
            ref="favoritesButton"
          >
            <div class="icon-wrap">
              <heart_bold class="heart-icon" />
              <span v-if="favoritesStore.favoritesIds.length > 0" class="badge">
                {{ favoritesStore.favoritesIds.length }}
              </span>
            </div>
            <favorites-dropdown
              :is-open="isFavoritesOpen"
              @close="isFavoritesOpen = false"
              :anchor="favoritesButton"
            />
          </button>
          <button
            class="notificationButton"
            :class="{ 'is-visible': hasNotifications || isDesktop }"
          >
            <notification />
          </button>
          <button
            class="settingsButton"
            :class="{ 'is-visible': hasSettingsAlert || isDesktop }"
            @click="goAccount"
          >
            <settings2 />
          </button>
        </div>
        <button class="headerImageButton" @click="goToProfile()">
          <img :src="userAvatar" alt="User Profile" />
        </button>
      </div>

      <div class="finder">
        <div class="search" ref="searchContainer">
          <icon-search
            class="search-icon"
            @click="focusSearch"
            style="cursor: pointer"
          />
          <input
            type="text"
            placeholder="Search something here"
            v-model="searchQuery"
            ref="searchInput"
          />

          <Teleport to="body">
            <Transition name="slide-fade">
              <div
                v-if="searchQuery.length > 0 && isDropdownVisible"
                class="search-dropdown-portal"
                :style="dropdownStyle"
                ref="dropdownRef"
              >
                <div
                  v-for="product in filteredProducts"
                  :key="product.id"
                  class="search-item"
                  @click="
                    router.push(`/detailCarRent/${product.id}`);
                    searchQuery = '';
                  "
                >
                  <img :src="product.image" alt="" class="search-item-img" />
                  <div class="search-item-info">
                    <span class="search-item-name">{{ product.name }}</span>
                    <span class="search-item-category">{{
                      product.category
                    }}</span>
                  </div>
                  <span class="search-item-price">{{ product.price }}</span>
                </div>

                <div
                  v-if="filteredProducts.length === 0"
                  class="search-no-results"
                >
                  No cars found
                </div>
              </div>
            </Transition>
          </Teleport>
        </div>
        <button class="settingsIcon">
          <linear-filter class="settings-icon" @click="goCategory" />
        </button>
      </div>
    </div>
    <div v-if="width >= 1440" class="header-car-container">
      <img
        src="/cars/Koenigsegg.png"
        alt="Koenigsegg"
        class="koenigsegg-car"
        :style="{ transform: `translateX(${carX}px)` }"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import IconSearch from "~/components/icons/headerIcons/icon-search.vue";
import LinearFilter from "~/components/icons/headerIcons/linear-filter.vue";
import Settings2 from "~/components/icons/headerIcons/settings2.vue";
import Notification from "~/components/icons/headerIcons/notification.vue";
import Heart_bold from "~/components/icons/cardsIcons/heart_bold.vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
import { useFavorites } from "~/stores/favorites";
import FavoritesDropdown from "./FavoritesDropdown.vue";
import MenuIcon from "~/components/icons/headerIcons/menu-icon.vue";
import { products } from "~~/data/products";
import { ref, computed, inject, onMounted, onUnmounted, watch } from "vue";

// Страница логина или АДмина
const authCookie = useCookie<boolean>("auth-logged-in", {
  default: () => false,
});

const handleAuthNavigation = () => {
  if (authCookie.value) {
    router.push("/adminCarRent");
  } else {
    router.push("/loginPage");
  }
};
const goToProfile = () => handleAuthNavigation();
const goAccount = () => handleAuthNavigation();
const isAuthenticated = useCookie<boolean>("auth-logged-in");
const userAvatar = computed(() => {
  return isAuthenticated.value ? "/noImage.webp" : "/Image.svg";
});

// изменение хэдера на определенных страницах
const route = useRoute();
const isSpecial = computed(() => route.meta.isSpecialHeader === true);

// избранное
const favoritesStore = useFavorites();
const isFavoritesOpen = ref(false);

const goMain = () => {
  router.push(`/`);
};

const sidebarNav = inject("sidebarContext");

// поиск в заголовке
const searchQuery = ref("");
const filteredProducts = computed(() => {
  if (!searchQuery.value) return [];

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});
const searchInput = ref<HTMLInputElement | null>(null);
const focusSearch = () => {
  if (searchInput.value) {
    searchInput.value.focus();
  }
};

const searchContainer = ref<HTMLInputElement | null>(null);
const dropdownStyle = ref({
  top: "0px",
  left: "0px",
  width: "0px",
});

const updateDropdownPosition = () => {
  if (searchContainer.value) {
    const reactive = searchContainer.value.getBoundingClientRect();
    dropdownStyle.value = {
      top: `${reactive.bottom + window.scrollY + 8}px`,
      left: `${reactive.left + window.scrollX}px`,
      width: `${reactive.width}px`,
    };
  }
};

watch(searchQuery, (value) => {
  if (value.length > 0) {
    setTimeout(updateDropdownPosition, 0);
  }
});

onMounted(() => {
  updateWidth();
  window.addEventListener("resize", updateDropdownPosition);
  window.addEventListener("scroll", updateDropdownPosition);
  window.addEventListener("scroll", closeSearch, { passive: true });
  window.addEventListener("click", handleClickOutside);
  window.addEventListener("resize", updateWidth);
  window.addEventListener("mousemove", handleMouseMove, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("resize", updateDropdownPosition);
  window.removeEventListener("scroll", updateDropdownPosition);
  window.removeEventListener("scroll", closeSearch);
  window.removeEventListener("click", handleClickOutside);
  window.removeEventListener("resize", updateWidth);
  window.removeEventListener("mousemove", handleMouseMove);
});

// автозакрытие поиска
const isDropdownVisible = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const closeSearch = () => {
  isDropdownVisible.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  const clickInsideSearch = searchContainer.value?.contains(target);
  const clickInsideDropdown = dropdownRef.value?.contains(target);

  if (!clickInsideSearch && !clickInsideDropdown) {
    closeSearch();
  }
};

watch(searchQuery, (value) => {
  if (value.length > 0) {
    isDropdownVisible.value = true;
    setTimeout(updateDropdownPosition, 0);
  } else {
    isDropdownVisible.value = false;
  }
});

const goCategory = () => {
  router.push(`/categoryCarRent`);
};

//Кнопки при наличии контента на мобильной версии
const hasNotifications = ref(false);
const hasSettingsAlert = ref(false);

const width = ref(0);

const updateWidth = () => {
  width.value = window.innerWidth;
};

const isDesktop = computed(() => width.value >= 950);
// позиционированние избранного
const favoritesButton = ref<HTMLElement | null>(null);

// машинка в хедере
const carX = ref(0);
const carWidth = 300;
const handleMouseMove = (event: MouseEvent) => {
  if (width.value >= 1440) {
    const maxScroll = window.innerWidth - carWidth;
    const ratio = event.clientX / window.innerWidth;
    carX.value = ratio * maxScroll;
  }
};
</script>

<style>
.header {
  display: flex;
  flex-direction: row;
  position: relative;
  background-color: var(--primary-0);
  overflow-x: hidden;
  .main-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 2rem;
    width: 100%;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    @media (min-width: 1440px) {
      padding-top: 2.5rem;
      padding-bottom: 2.5rem;
      padding-left: 3.75rem;
      padding-right: 2rem;
      justify-content: start;
    }
    .menu-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      @media (min-width: 950px) {
        display: none;
      }
    }
    .Logo {
      margin: 0;
      font-weight: bold;
      color: var(--primary-500);
      font-size: 1.5rem;
      cursor: pointer;

      &:hover {
        transform: scale(1.2);
        transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      @media (min-width: 1440px) {
        font-size: 2rem;
      }
      @media (min-width: 950px) and (max-width: 1439px) {
        padding-right: 1rem;
      }
    }

    .headerImage {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      @media (min-width: 950px) {
        gap: 1rem;
        order: 3;
        padding-right: 1.5rem;
      }
      @media (min-width: 1440px) {
        gap: 1.25rem;
      }
      .headerIcons {
        display: flex;

        @media (min-width: 1440px) {
          gap: 1.25rem;
        }
        @media (min-width: 950px) {
          display: flex;
          gap: 1rem;
          .favorite-nav-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background: transparent;
            padding: 0;
            cursor: pointer;
            border: 1px solid var(--secondary-200);
            border-radius: 99%;
            width: 44px;
            height: 44px;
            transition: all 0.5s ease;
            &:hover {
              transform: scale(1.2);
              transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .icon-wrap {
              display: inline-grid;
              place-items: center;

              .heart-icon {
                width: 24px;
                height: 24px;
                color: var(--secondary-400);
                transition: color 0.5s ease;
                grid-area: 1 / 1;
              }
            }
            &.is-active {
              background-color: var(--primary-500);
              border-color: var(--primary-500);

              .heart-icon {
                color: var(--primary-0);
              }
              .badge {
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
            }
            .badge {
              position: absolute;
              top: -8px;
              right: -3px;

              width: 18px;
              height: 18px;
              background-color: var(--error-500);
              color: var(--primary-0);

              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;

              font-size: 0.7rem;
              font-weight: 700;
              line-height: 1;
              pointer-events: none;
              z-index: 2;
            }
            .icon-container {
              color: var(--secondary-400);
              width: 24px;
              height: 24px;
            }
          }

          img {
            width: 1.75rem;
            height: 1.75rem;
          }
          .notificationButton {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            cursor: pointer;
            border: 1px solid var(--secondary-200);
            border-radius: 99%;
            &:hover {
              transform: scale(1.2);
              transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .icon-container {
              width: 24px;
              height: 24px;
            }
          }
          .settingsButton {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            cursor: pointer;
            border: 1px solid var(--secondary-200);
            border-radius: 99%;
            &:hover {
              transform: scale(1.2);
              transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .icon-container {
              width: 24px;
              height: 24px;
            }
          }
        }
        .favorite-nav-btn {
          &.is-active {
            @media (min-width: 375px) and (max-width: 1280px) {
              .icon-wrap {
                display: flex;
                flex-direction: row;
                align-items: center;
                .badge {
                  display: none;
                }
              }
            }
          }
        }
      }
      .headerImageButton {
        border: none;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          transform: scale(1.2);
          transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        img {
          aspect-ratio: 1 / 1;
          object-fit: cover;
          object-position: center;
          border-radius: 50%;
          max-width: 28px;
          max-height: 28px;
          @media (min-width: 1440px) {
            max-width: 44px;
            max-height: 44px;
          }
        }
      }
    }
    .finder {
      display: flex;
      flex-direction: row;
      position: relative;
      align-items: center;
      padding-bottom: 2rem;
      padding-top: 2rem;
      justify-content: space-between;
      @media (min-width: 1440px) {
        padding-bottom: 0;
        padding-top: 0;
        padding-left: 4rem;
        margin-right: auto;
      }
      @media (min-width: 950px) and (max-width: 1439px) {
        padding-right: 1rem;
      }
      .search {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: relative;
        border: 1px solid rgba(195, 212, 233, 0.4);
        border-radius: 10px;
        margin-right: 1rem;

        @media (min-width: 1440px) {
          margin-right: 0;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-right: 0;
        }
        .search-results {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          width: 100%;
          background-color: var(--primary-0);
          border: 1px solid rgba(195, 212, 233, 0.4);
          border-radius: 10px;
          box-shadow: 0px 10px 30px rgba(2, 9, 20, 0.1);
          z-index: 100;
          max-height: 400px;
          overflow-y: auto;

          .search-item {
            display: flex;
            align-items: center;
            padding: 0.75rem 1rem;
            gap: 1rem;
            cursor: pointer;
            transition: background 0.3s ease;
            border-bottom: 1px solid rgba(195, 212, 233, 0.1);

            &:last-child {
              border-bottom: none;
            }

            &:hover {
              background-color: var(--secondary-100);
            }

            .search-item-img {
              width: 60px;
              height: auto;
              object-fit: contain;
            }

            .search-item-info {
              display: flex;
              flex-direction: column;
              flex: 1;

              .search-item-name {
                font-weight: 700;
                color: var(--secondary-500);
                font-size: 0.875rem;
              }

              .search-item-category {
                font-size: 0.75rem;
                color: var(--secondary-400);
              }
            }

            .search-item-price {
              font-weight: 700;
              font-size: 0.875rem;
              color: var(--secondary-500);
              &::before {
                content: "$";
              }
            }
          }

          .search-no-results {
            padding: 1.5rem;
            text-align: center;
            color: var(--secondary-400);
            font-size: 0.875rem;
          }
        }
        .search-icon {
          color: var(--secondary-400);
          max-width: 24px;
          max-height: 24px;
          padding-left: 1.5rem;
        }
        input {
          height: 46px;
          color: var(--secondary-400);
          background-color: var(--primary-0);
          font-weight: 500;
          font-size: 0.875rem;
          border: none;
          padding-left: 0.5rem;
          padding-right: 2rem;
          @media (min-width: 1440px) {
            padding-right: 14.688rem;
          }
        }
      }
      .settingsIcon {
        width: 48px;
        height: 48px;
        border: 1px solid rgba(195, 212, 233, 0.4);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        @media (min-width: 1440px) {
          border-left: none;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          width: 49px;
          height: 49px;
        }
        .icon-container {
          max-width: 24px;
          max-height: 24px;
        }
      }
    }
  }
}
.search-dropdown-portal {
  position: absolute;
  z-index: 1000;
  background-color: var(--primary-0);
  border-radius: 10px;
  border: 1px solid rgba(195, 212, 233, 0.4);
  box-shadow: 0px 10px 30px rgba(2, 9, 20, 0.1);
  max-height: 400px;
  overflow-y: auto;
  border-top: none;

  padding: 10px 0;

  max-height: 400px;
  overflow-y: auto;
  overflow-x: visible;
  border-top: none;

  .search-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    gap: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
    border-bottom: 1px solid rgba(195, 212, 233, 0.1);
    background-color: var(--primary-0);

    position: relative;
    z-index: 1;
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    border-bottom: 1px solid rgba(195, 212, 233, 0.1);
    margin: 0 4px;
    border-radius: 12px;
    &:hover {
      z-index: 10;
      transform: scale(1.08);
      background-color: var(--primary-0);

      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      border-color: transparent;
    }

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: var(--secondary-100);
    }

    .search-item-img {
      width: 60px;
      height: auto;
      object-fit: contain;
      &:hover {
        transform: scale(1.1) rotate(-3deg);
      }
    }

    .search-item-info {
      display: flex;
      flex-direction: column;
      flex: 1;

      .search-item-name {
        font-weight: 700;
        color: var(--secondary-500);
        font-size: 0.875rem;
      }

      .search-item-category {
        font-size: 0.75rem;
        color: var(--secondary-400);
      }
    }

    .search-item-price {
      font-weight: 700;
      font-size: 0.875rem;
      color: var(--secondary-500);
      &::before {
        content: "$";
      }
    }
  }

  .search-no-results {
    padding: 1.5rem;
    text-align: center;
    color: var(--secondary-400);
    font-size: 0.875rem;
  }
}

.header-car-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  height: 25px;
  pointer-events: none;
  z-index: 10;
  overflow: hidden;

  .koenigsegg-car {
    height: 100%;
    width: auto;
    will-change: transform;
    transition: transform 0.15s ease-out;
  }
}
.notificationButton svg {
  width: 24px;
  height: 24px;
  color: var(--secondary-400);
}

.settingsButton svg {
  width: 24px;
  height: 24px;
  color: var(--secondary-400);
}

.notificationButton .icon-container {
  width: 24px;
  height: 24px;
}

.settingsButton .icon-container {
  width: 24px;
  height: 24px;
}
.notificationButton,
.settingsButton,
.favorite-nav-btn {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.notificationButton.is-visible,
.settingsButton.is-visible,
.favorite-nav-btn.is-visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
.search-dropdown-portal::-webkit-scrollbar {
  width: 6px;
}
.search-dropdown-portal::-webkit-scrollbar-track {
  background: transparent;
}
.search-dropdown-portal::-webkit-scrollbar-thumb {
  background-color: rgba(195, 212, 233, 0.5);
  border-radius: 10px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
