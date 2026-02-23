import { defineStore } from "pinia";

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    billing: {
      name: "",
      phone: "",
      address: "",
      city: "",
    },
    payment: {
      method: "card",
      cardNumber: "",
      cardHolder: "",
      expirationDate: "",
      cvc: "",
    },
    toasts: [] as { id: number; message: string; type: string }[],
  }),

  actions: {
    setBillingField(field: keyof typeof this.billing, value: string) {
      this.billing[field] = value;
    },

    addToast(
      message: string,
      type: "success" | "error" | "warning" = "success",
    ) {
      const id = Date.now();
      this.toasts.push({ id, message, type });
      setTimeout(() => {
        this.toasts = this.toasts.filter((t) => t.id !== id);
      }, 3000);
    },
  },
});
