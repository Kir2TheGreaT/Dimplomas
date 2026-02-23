<template>
  <Transition name="fade">
    <div v-if="loading" class="preloader-wrapper">
      <div class="progress-container">
        <div class="progress-box">
          <div ref="fill" class="progress-fill"></div>
        </div>
        <div class="progress-state state-load">Loading…</div>
        <div class="progress-state state-finish">Complete!</div>
      </div>

      <div class="dump-truck">
        <div class="front"></div>
        <div class="bucket"></div>
        <div class="dirt">
          <div class="dirt-spill"></div>
        </div>
        <div class="base"></div>
        <div class="wheel wheel-front"></div>
        <div class="wheel wheel-middle"></div>
        <div class="wheel wheel-back"></div>
      </div>

      <div class="dump-truck">
        <div class="front"></div>
        <div class="bucket"></div>
        <div class="dirt">
          <div class="dirt-spill"></div>
        </div>
        <div class="base"></div>
        <div class="wheel wheel-front"></div>
        <div class="wheel wheel-middle"></div>
        <div class="wheel wheel-back"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from "vue";

const loading = ref(true);
const fill = ref(null);
const startTime = Date.now();
const MIN_SHOW_TIME = 1600;

onMounted(() => {
  const percents = [0.25, 0.5, 0.75, 1];
  let step = 0;
  const truckLoopDur = 10;

  const updateFill = () => {
    if (fill.value) {
      fill.value.style.transform = `scaleY(${percents[step]})`;
      step++;
      if (step < percents.length) {
        setTimeout(updateFill, (truckLoopDur * 1000) / 2);
      }
    }
  };
  setTimeout(updateFill, (truckLoopDur * 1000) / 4);

  const hidePreloader = () => {
    const timePassed = Date.now() - startTime;
    const remainingTime = Math.max(0, MIN_SHOW_TIME - timePassed);

    setTimeout(() => {
      loading.value = false;
    }, remainingTime);
  };

  if (document.readyState === "complete") {
    hidePreloader();
  } else {
    window.addEventListener("load", hidePreloader);
  }
});
</script>

<style scoped>
.preloader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgb(135, 190, 255);
  z-index: 10000;
  font-family: "Anton", sans-serif;
  overflow: hidden;
  pointer-events: none;
}

.progress-container,
.progress-state,
.dump-truck,
.dump-truck div {
  position: absolute;
}

.progress-container {
  top: 50%;
  left: calc(50% - 3em);
  width: 6em;
  height: 7.5em;
  z-index: 2;
}

.progress-box {
  width: 6em;
  border-radius: 0 0 0.5em 0.5em;
  border: 0.5em solid rgb(80, 80, 80);
  border-top: 0;
  height: 4em;
  overflow: hidden;
}

.progress-fill {
  background: rgb(100, 50, 50);
  transform: scaleY(0);
  transform-origin: 50% 100%;
  transition: transform 0.5s ease-out;
  width: 100%;
  height: 100%;
}

.progress-state {
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 1.5em;
  text-align: center;
  text-transform: uppercase;
}

.state-load {
  animation: hideLoad 20s linear forwards;
}

.state-finish {
  animation: showFinish 0.3s 20s linear forwards;
  visibility: hidden;
}

.dump-truck {
  opacity: 0;
  top: calc(50% - 4em);
  width: 14em;
  height: 8em;
}

.dump-truck:nth-of-type(2) {
  animation: backupL 10s ease-in-out infinite;
  right: 50%;
  transform: scaleX(-1) translateX(5em);
}
.dump-truck:nth-of-type(2) .bucket {
  animation: dump 10s linear infinite;
}
.dump-truck:nth-of-type(2) .dirt {
  animation: rotateDirt 10s linear infinite;
}
.dump-truck:nth-of-type(2) .dirt-spill {
  animation: pourDirt 10s linear infinite;
}
.dump-truck:nth-of-type(2) .wheel {
  animation: spinL 10s ease-in-out infinite;
}

.dump-truck:last-of-type {
  animation: backupR 10s 5s ease-in-out infinite;
  left: 50%;
  transform: translateX(5em);
}
.dump-truck:last-of-type .bucket {
  animation: dump 10s 5s linear infinite;
}
.dump-truck:last-of-type .dirt {
  animation: rotateDirt 10s 5s linear infinite;
}
.dump-truck:last-of-type .dirt-spill {
  animation: pourDirt 10s 5s linear infinite;
}
.dump-truck:last-of-type .wheel {
  animation: spinR 10s 5s ease-in-out infinite;
}

.front {
  background:
    linear-gradient(rgb(255, 63, 48), rgb(255, 63, 48)) 2.7em 0.75em / 0.2em 2em,
    linear-gradient(rgb(160, 160, 160), rgb(160, 160, 160)) 1em 3.5em / 0.8em
      0.2em,
    linear-gradient(rgb(80, 80, 80), rgb(80, 80, 80)) 3.3em 6.1em / 0.5em 0.2em,
    linear-gradient(83deg, rgb(40, 40, 40) 49%, transparent 50%) 1em 0.75em /
      5em 2em,
    radial-gradient(
      3.4em 4.6em at 33% 100%,
      transparent 49%,
      rgb(255, 63, 48) 50%
    );
  background-repeat: no-repeat;
  border-radius: 10% 20% 5% 25% / 10% 50% 5% 100%;
  top: 0.4em;
  left: 10.1em;
  width: 3.9em;
  height: 7em;
}

.bucket {
  background:
    linear-gradient(rgba(0, 0, 0, 0.15) 1em, transparent 1em),
    linear-gradient(rgb(80, 80, 80), rgb(80, 80, 80));
  background-repeat: no-repeat;
  top: 0;
  left: 0;
  width: 10em;
  height: 5.5em;
  transform-origin: 22% 100%;
}

.dirt {
  background: rgb(100, 50, 50);
  width: 7.4em;
  height: 3em;
  top: 1.1em;
  left: -3.2em;
  transform: rotate(-25deg);
  transform-origin: 50% 0;
  z-index: -1;
}

.dirt-spill {
  background: rgb(100, 50, 50);
  top: 0;
  left: -5.25em;
  width: 5.5em;
  height: 0.8em;
  transform: rotate(-40deg) scale(0, 0);
  transform-origin: 5.25em 0em;
}

.base {
  background: rgb(127, 91, 88);
  top: 5.5em;
  left: 2em;
  width: 8.3em;
  height: 1.5em;
}

.wheel {
  background: radial-gradient(circle, #282828 30%, #000 100%);
  border-radius: 50%;
  bottom: 0;
  width: 2.4em;
  height: 2.4em;
}
.wheel-front {
  left: 10.4em;
}
.wheel-middle {
  left: 4.5em;
}
.wheel-back {
  left: 2em;
}

@keyframes backupL {
  from,
  50%,
  to {
    opacity: 0;
    transform: scaleX(-1) translateX(20em);
  }
  12.5%,
  37.5% {
    opacity: 1;
    transform: scaleX(-1) translateX(5em);
  }
}
@keyframes backupR {
  from,
  50%,
  to {
    opacity: 0;
    transform: translateX(20em);
  }
  12.5%,
  37.5% {
    opacity: 1;
    transform: translateX(5em);
  }
}
@keyframes dump {
  from,
  12.5%,
  37.5%,
  to {
    transform: rotate(0deg);
  }
  20%,
  30% {
    transform: rotate(-40deg);
  }
}
@keyframes rotateDirt {
  from,
  19.9%,
  30.1%,
  to {
    opacity: 0;
  }
  20%,
  30% {
    opacity: 1;
    transform: rotate(-40deg);
  }
}
@keyframes pourDirt {
  from,
  20% {
    transform: rotate(-40deg) scale(0, 0);
  }
  25% {
    transform: rotate(-40deg) scale(1, 1);
  }
  30%,
  to {
    transform: rotate(-25deg) scale(0.8, 0);
  }
}
@keyframes spinL {
  from,
  50%,
  to {
    transform: rotate(-0.5turn);
  }
  12.5%,
  37.5% {
    transform: rotate(-2.5turn);
  }
}
@keyframes spinR {
  from,
  50%,
  to {
    transform: rotate(0);
  }
  12.5%,
  37.5% {
    transform: rotate(-2turn);
  }
}
@keyframes hideLoad {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}
@keyframes showFinish {
  from {
    transform: scale(0);
    visibility: visible;
  }
  to {
    transform: scale(1);
    visibility: visible;
  }
}

.fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-leave-to {
  opacity: 0;
}
</style>
