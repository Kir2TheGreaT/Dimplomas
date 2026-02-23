<template>
  <div ref="reviewsSection" class="mainHeadReviews">
    <div class="headerReviews">
      Reviews
      <div class="badgeReviews"><span>{{reviews.length}}</span></div>
    </div>
    <div class="mainReviews">
      <TransitionGroup name="list">
      <div v-for="review in visibleReviews" :key="review.id"  class="oneReview">
        <div class="topOneReview">
          <div class="profile">
            <img :src="review.avatar" alt="" class="avatarProfile" />
            <div class="userReviewInfotmation">
              <div class="nameInformation">{{ review.name }}</div>
              <div class="userInformation">{{ review.position }}</div>
            </div>
          </div>
          <div class="ratingReview">
            <div class="dateReview">{{review.date}}</div>
            <div class="ratingStars">
              <Star v-for="i in review.rating" :key="i"></Star>
            </div>
          </div>
        </div>
        <div class="textReview">
          <p>
            {{review.text}}
          </p>
        </div>
      </div>
      </TransitionGroup>
    </div>
    <div class="showAll" v-if="reviews.length > 3">
      <div class="showAllButton" @click="handleToggle" ref="bottomAnchor">
        <button><span class="showAllText">{{ isExpanded ? "Hide" : "Show All" }}</span></button>
        <ArrowDown :style="arrowStyle"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ArrowDown from "../icons/arrow-down.vue";
import Star from "../icons/star.vue";
import { reviews } from '@/stores/reviews';

const reviewsSection = ref<HTMLElement | null>(null);
const bottomAnchor = ref<HTMLElement | null>(null);
const isExpanded = ref(false);
const visibleReviews = computed(() => {
  return isExpanded.value ? reviews.value : reviews.value.slice(0,3);
});
const arrowStyle = computed(() => ({
  transform: isExpanded.value ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: 'transform 0.5s ease'
}));

const handleToggle = async () => {
  if (isExpanded.value) {
    isExpanded.value = false;
    await nextTick();
    reviewsSection.value?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  } else {
    isExpanded.value = true;
    await nextTick();
    bottomAnchor.value?.scrollIntoView ({
      behavior: 'smooth',
      block: 'end'
    });
  }
};
</script>

<style>
.mainHeadReviews {
  background-color: var(--primary-0);
  .headerReviews {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
    padding-left: 1.5rem;
    padding-top: 1.5rem;
    padding-bottom: 0.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--secondary-500);
    @media (min-width: 375px) and (max-width: 1000px) {
      padding-left: 1rem;
      padding-top: 1rem;

    }
    .badgeReviews {
      background-color: var(--primary-500);
      gap: 0.5rem;
      border-radius: 4px;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      padding-top: 0.375rem;
      padding-bottom: 0.375rem;
      line-height: 1;
      display: flex;

      span {
        font-size: 0.75rem;
        font-weight: bold;
        color: var(--primary-0);
      }
    }
  }
  .mainReviews {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-bottom: 1.5rem;
    @media (min-width: 375px) and (max-width: 1000px) {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 1.25rem;
    }
    .oneReview {
      .topOneReview {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 1.5rem;
        @media (min-width: 375px) and (max-width: 1000px) {
          padding-top: 1rem;
        }
        .profile {
          gap: 1rem;
          display: flex;
          flex-direction: row;
          align-items: end;
          .avatarProfile {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            aspect-ratio: 1 / 1;
            object-fit: cover;
            object-position: center;
            @media (min-width: 375px) and (max-width: 1000px) {
              width: 44px;
              height: 44px;
            }
          }
          .userReviewInfotmation {
            gap: 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .nameInformation {
              color: var(--secondary-500);
              font-size: 1.25rem;
              font-weight: 700;
              @media (min-width: 375px) and (max-width: 1000px) {
                font-size: 1rem;
              }
            }
            .userInformation {
              color: var(--secondary-300);
              font-size: 0.875rem;
              font-weight: 500;
              @media (min-width: 375px) and (max-width: 1000px) {
              font-size: 0.75rem;
              }
            }
          }
        }
        .ratingReview {
          display: flex;
          flex-direction: column;
          align-items: end;
          gap: 0.5rem;
          .dateReview {
            color: var(--secondary-300);
            font-size: 0.875rem;
            font-weight: 500;
            padding-right: 5px;
            @media (min-width: 375px) and (max-width: 1000px) {
              font-size: 0.75rem;
              display: flex;
              align-items: center;
              justify-content: center;
              padding-top: 6px;
              padding-right: 0;
            }
          }
          .ratingStars {
            display: flex;
            @media (min-width: 375px) and (max-width: 1000px) {
              flex-direction: row;
              align-items: end;
              margin-top: -1px;
            }
            .icon-container {
              color: #fbad39;
              display: flex;
              @media (min-width: 375px) and (max-width: 1000px) {
                width: 0.75rem;
                height: 0.75rem;
              }
            }
          }
        }
      }
      .textReview {
        padding-top: 0.75rem;
        padding-left: 4.75rem;
        padding-right: 1.5rem;
        @media (min-width: 375px) and (max-width: 1000px) {
          padding-top: 1rem;
          padding-left: 4.25rem;
          padding-right: 1rem;
        }

        p {
          margin: 0;
          line-height: 200%;
          color: var(--secondary-400);
          font-size: 0.875rem;
          font-weight: 400;
          @media (min-width: 375px) and (max-width: 1000px) {
            font-size: 0.75rem;
          }
        }
      }
    }
  }
  .showAll {
    padding-bottom: 1.5rem;
    @media (min-width: 375px) and (max-width: 1000px) {
      padding-bottom: 1rem;
    }
    .showAllButton {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      padding-bottom: 0.625rem;
      padding-left: 1.25rem;
      padding-right: 1.25rem;

      .showAllText {
        font-size: 1rem;
        font-weight: 600;
        color: var(--secondary-300);
        @media (min-width: 375px) and (max-width: 1000px) {
          font-size: 0.875rem;
        }
      }
    }
  }
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
