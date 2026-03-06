<template>
  <div class="login-form-container">
    <button class="close-btn" @click="router.push('/')" title="На главную">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 6L6 18M6 6L18 18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <h2 class="form-title">Вход в аккаунт</h2>
    <p class="form-subtitle">Добро пожаловать в MORENT</p>

    <form @submit.prevent="handleLogin" class="form-body">
      <div class="input-group">
        <label>Email</label>
        <input
          type="email"
          v-model="email"
          placeholder="Введите ваш email"
          required
        />
      </div>

      <div class="input-group">
        <label>Пароль</label>
        <input
          type="password"
          v-model="password"
          placeholder="Введите пароль"
          required
        />
      </div>

      <button type="submit" class="submit-btn">Войти</button>
    </form>
  </div>

  <div class="toast-wrapper">
    <TransitionGroup name="list">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="toast-card"
        :class="toast.type"
      >
        <span class="message">{{ toast.message }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// Импорт стора уведомлений
import { usePaymentStore } from "@/stores/toast";

const router = useRouter();
const toastStore = usePaymentStore();

const email = ref("");
const password = ref("");
const isAuthenticated = useCookie("auth-logged-in");

// Валидация и логика входа
const handleLogin = () => {
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailReg.test(email.value)) {
    toastStore.addToast("Пожалуйста, введите корректный Email", "error");
    return;
  }

  if (password.value.length < 4) {
    toastStore.addToast("Пароль должен быть не менее 4 символов", "warning");
    return;
  }

  if (email.value && password.value) {
    isAuthenticated.value = true;
    toastStore.addToast("Успешный вход!", "success");

    setTimeout(() => {
      router.push("/adminCarRent");
    }, 500);
  } else {
    toastStore.addToast("Ошибка авторизации. Проверьте данные", "error");
  }
};
</script>

<style scoped>
.login-form-container {
  position: relative;
  background-color: var(--primary-0, #ffffff);
  border: 1px solid rgba(195, 212, 233, 0.4);
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0px 10px 30px rgba(2, 9, 20, 0.05);
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  color: var(--secondary-400, #90a3bf);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    color 0.3s ease,
    transform 0.2s ease;
}

.close-btn:hover {
  color: var(--error-500, #ed3f3f);
  transform: rotate(90deg);
}

.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--secondary-500, #1a202c);
  margin-bottom: 0.5rem;
  text-align: center;
}

.form-subtitle {
  font-size: 0.875rem;
  color: var(--secondary-400, #90a3bf);
  margin-bottom: 2rem;
  text-align: center;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--secondary-500, #1a202c);
}

.input-group input {
  height: 46px;
  color: var(--secondary-500, #1a202c);
  background-color: var(--primary-0, #ffffff);
  font-weight: 500;
  font-size: 0.875rem;
  border: 1px solid rgba(195, 212, 233, 0.4);
  border-radius: 10px;
  padding: 0 1rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.input-group input:focus {
  border-color: var(--primary-500, #3563e9);
}

.submit-btn {
  height: 46px;
  background-color: var(--primary-500, #3563e9);
  color: var(--primary-0, #ffffff);
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  margin-top: 1rem;
}

.submit-btn:hover {
  background-color: #264ac6;
}

.submit-btn:active {
  transform: scale(0.98);
}

.toast-wrapper {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.toast-card {
  padding: 16px 24px;
  border-radius: 10px;
  color: var(--primary-0, #ffffff);
  font-weight: 500;
  min-width: 280px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.success {
  background-color: #7cffcb;
  color: #1a253c;
}
.error {
  background-color: #ed3f3f;
}
.warning {
  background-color: #ffc107;
  color: #1a253c;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
