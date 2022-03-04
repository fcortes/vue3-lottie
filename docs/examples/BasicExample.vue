<template>
  <Vue3Lottie :animationData="DogJSON" :height="300" :width="300" />
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import DogJSON from './lotties/dog.json'

import 'vue3-lottie/dist/style.css'

export default {
  name: 'BasicExample',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      DogJSON,
    }
  },
}
</script>

<style scoped>
.lottie-animation-container {
  margin: 0 auto;
}
</style>
