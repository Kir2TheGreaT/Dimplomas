import { defineStore } from "pinia";

export const useRentalStore = defineStore("rental", {
  state: () => {
    const now = new Date();

    const currentDate = now.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const currentTime = now.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return {
      pickup: {
        location: "Moscow",
        date: currentDate,
        time: currentTime,
      },
      dropoff: {
        location: "Moscow",
        date: currentDate,
        time: currentTime,
      },
    };
  },
  persist: true,
});
