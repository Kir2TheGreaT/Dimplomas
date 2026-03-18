<template>
  <div class="pickupWidget">
    <div class="pickUp">
      <div class="circleBlue"></div>
      <h5>{{ title }}</h5>
    </div>
    <div class="setTime">
      <div class="location side">
        <p>Locations</p>
        <div class="text">
          <p>{{ data.location || "Select your city" }}</p>
          <button class="arrowButton"><ArrowDown /></button>
        </div>
      </div>

      <div class="border"></div>

      <div class="date">
        <p>Date</p>
        <div class="text">
          <p>{{ data.date || "Select date" }}</p>
          <button class="arrowButton"><ArrowDown /></button>
        </div>
      </div>

      <div class="border"></div>

      <div class="time side">
        <p>Time</p>
        <div class="text">
          <p>{{ data.time || "Select time" }}</p>
          <button class="arrowButton"><ArrowDown /></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, onUnmounted, computed } from "vue";
import ArrowDown from "./icons/arrow-down.vue";

defineProps<{
  title: string;
  data: {
    location: string;
    date: string;
    time: string;
  };
}>();

const currentDate = ref("");
const currentTime = ref("");

const updateDateTime = () => {
  const now = new Date();
  currentDate.value = now.toLocaleDateString("en-EN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  currentTime.value = now.toLocaleTimeString("en-EN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

let timer: number;
onMounted(() => {
  updateDateTime();
  timer = setInterval(updateDateTime, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style>
.pickupWidget {
  background-color: var(--primary-0);
  border-radius: 10px;

  .pickUp {
    display: flex;
    position: relative;
    gap: 0.5rem;
    flex-direction: row;
    align-items: center;
    background-color: var(--primary-0);
    border-radius: 10px;
    padding-bottom: 1.5rem;
    padding-left: 1rem;
    padding-top: 1rem;

    h5 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--secondary-500);
      margin: 0;
    }

    .circleBlue {
      width: 0.5rem;
      height: 0.5rem;
      background: var(--primary-500);
      border-radius: 50%;
      outline: 4px solid rgba(53, 99, 233, 0.3);
      margin-top: -0.25rem;
      animation: breatheBlue 2.2s ease-in-out infinite;
    }
  }

  .setTime {
    gap: 1rem;
    display: flex;
    flex-direction: row;
    padding-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;

    .border {
      border-right: 1px solid rgba(195, 212, 233, 0.4);
      align-self: stretch;
    }

    .location {
      gap: 0.5rem;

      p {
        font-size: 1rem;
        font-weight: 700;
        color: var(--secondary-500);
      }

      .text {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        align-items: center;
        flex-wrap: nowrap;
        gap: 0.5rem;

        .icon-container {
          display: flex;
          align-items: center;
        }
        p {
          font-size: 0.75rem;
          font-weight: 400;
          color: var(--secondary-300);
          margin: 0;
        }
      }
    }

    .date {
      gap: 0.5rem;
      p {
        font-size: 1rem;
        font-weight: 700;
        color: var(--secondary-500);
      }

      .text {
        gap: 0.25rem;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        align-items: center;

        p {
          font-size: 0.75rem;
          font-weight: 400;
          color: var(--secondary-300);
          margin: 0;
          text-wrap: nowrap;
        }
      }
    }

    .time {
      gap: 0.5rem;

      p {
        font-size: 1rem;
        font-weight: 700;
        color: var(--secondary-500);
      }

      .text {
        gap: 0.25rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: nowrap;
        align-items: center;
        .icon-container {
          display: flex;
          align-items: center;
        }

        p {
          font-size: 0.75rem;
          font-weight: 400;
          color: var(--secondary-300);
          margin: 0;
        }
      }
    }
  }
}

@media (min-width: 545px) and (max-width: 1439px) {
  .setTime {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

@media (min-width: 1440px) {
  .pickupWidget {
    .pickUp {
      padding-top: 1.5rem;
      padding-left: 1.5rem;
      padding-bottom: 1.375rem;
    }
    .setTime {
      gap: 3rem;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      padding-bottom: 1.5rem;
      .location {
        &.side {
          padding-left: 0.75rem;
        }
        p {
          margin-top: 0;
          margin-bottom: 0;
        }
      }
      .date {
        p {
          margin-top: 0;
          margin-bottom: 0;
        }
      }
      .time {
        &.side {
          padding-right: 0.75rem;
        }
        p {
          margin-top: 0;
          margin-bottom: 0;
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
