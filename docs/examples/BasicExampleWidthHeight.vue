<template>
  <ClientOnly>
    <Vue3Lottie :animationData="VinylJSON" :height="300" :width="300" />
  </ClientOnly>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import VinylJSON from './lotties/vinyl.json'

export default {
  name: 'BasicExampleWidthHeight',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      VinylJSON,
    }
  },
}
</script>

<style scoped>
.lottie-animation-container {
  margin: 0 auto;
}
</style>
