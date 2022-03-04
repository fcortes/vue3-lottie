# Examples

Some examples of how to use the library are shown below.

:::warning
If you don't see the example in any of the sections below [click here](https://vue3-lottie.vercel.app/) and click the `examples` in the navbar. There is occasionally a bug with Vitepress where all the components are loaded at the end of the page.
:::

[[toc]]

<script setup>
  import BasicExample from './examples/BasicExample.vue'
  import BasicExampleURL from './examples/BasicExampleURL.vue'
  import BasicExampleWidthHeight from './examples/BasicExampleWidthHeight.vue'
  import BasicExampleAlternate from './examples/BasicExampleAlternate.vue'
  import LoopExample from './examples/LoopExample.vue'
  import PauseOnHoverExample from './examples/PauseOnHoverExample.vue'
  import PlayOnHoverExample from './examples/PlayOnHoverExample.vue'
  import ReactiveExample from './examples/ReactiveExample.vue'
  import EventExample from './examples/EventExample.vue'
  import CustomControlsExample from './examples/CustomControlsExample.vue'

  import 'vue3-lottie/dist/style.css'
</script>

## Basic example with animationData

<iframe src="https://codesandbox.io/embed/vue3lottie-basicexample-wiocm9?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.vue&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Vue3Lottie-BasicExample"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

```vue
<template>
  <Vue3Lottie :animationData="DogJSON" :height="200" :width="200" />
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

import DogJSON from './lotties/dog.json'

export default {
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
```

## Basic example with animationLink

<iframe src="https://codesandbox.io/embed/vue3lottie-basicexampleurl-okcc96?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.vue&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Vue3Lottie-BasicExampleURL"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

You can also pass in a valid URL link to the lottie file JSON object instead of referring to a local file. There is a chance that this might be breaking GDPR rules. If you are unsure, please read the terms and conditions of your lottie animation hosting platform.

```vue
<template>
  <Vue3Lottie
    animationLink="https://assets6.lottiefiles.com/packages/lf20_vmkcywu4.json"
    :height="300"
    :width="300"
  />
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

export default {
  name: 'BasicExampleURL',
  components: {
    Vue3Lottie,
  },
}
</script>
```

## Basic example with a custom width and height

You can also pass in any valid css unit here. If you pass in a number, It will be inferenced as a `pixel` value. Some valid examples include `50%`, `10em`, etc.

<iframe src="https://codesandbox.io/embed/vue3lottie-basicexamplewidthheight-p7e9qr?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.vue&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Vue3Lottie-BasicExampleWidthHeight"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

```vue
<template>
  <Vue3Lottie
    animationLink="https://assets6.lottiefiles.com/packages/lf20_FrS7ei.json"
    height="20em"
    width="20em"
    direction="alternate"
  />
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

export default {
  name: 'BasicExampleAlternate',
  components: {
    Vue3Lottie,
  },
}
</script>
```

## Loop example

<iframe src="https://codesandbox.io/embed/vue3lottie-loopexample-q807gc?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.vue&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Vue3Lottie-LoopExample"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

::: info
If the loop has already been completed, reloading the sandbox will restart the animation.
:::

```vue
<template>
  <Vue3Lottie
    animationLink="https://assets6.lottiefiles.com/packages/lf20_fonjkhhq.json"
    :height="300"
    :width="300"
    :loop="3"
  />
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

export default {
  name: 'LoopExample',
  components: {
    Vue3Lottie,
  },
}
</script>
```

## Direction alternate

You can set the `direction` to `alternate` to reverse the animation at the end of a loop.

<iframe src="https://codesandbox.io/embed/vue3lottie-basicexamplealternate-o988n0?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.vue&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Vue3Lottie-BasicExampleAlternate"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

```vue
<template>
  <Vue3Lottie
    :animationData="StarJSON"
    :height="300"
    :width="300"
    direction="alternate"
  />
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

import StarJSON from './lotties/star.json'

export default {
  name: 'BasicExampleAlternate',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      StarJSON,
    }
  },
}
</script>
```

## Pause on Hover

If you set `pauseOnHover` to true, the animation will pause when you hover over the animation.

<iframe src="https://codesandbox.io/embed/vue3lottie-pauseonhoverexample-25kfhz?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.vue&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Vue3Lottie-PauseOnHoverExample"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

```vue
<template>
  <Vue3Lottie
    animationLink="https://assets3.lottiefiles.com/packages/lf20_2kHQhR.json"
    :height="300"
    :width="300"
    :pauseOnHover="true"
  />
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

export default {
  name: 'PauseOnHoverExample',
  components: {
    Vue3Lottie,
  },
}
</script>
```

## Play on Hover

The lottie animation will play when you hover over the animation. Moving the mouse away will pause the animation at its current frame. Hovering over the container will play the animation from where it left off.

<iframe src="https://codesandbox.io/embed/vue3lottie-playonhoverexample-q3t989?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.vue&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Vue3Lottie-PlayOnHoverExample"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

```vue
<template>
  <Vue3Lottie
    animationLink="https://assets10.lottiefiles.com/packages/lf20_ulzuuger.json"
    :height="400"
    :width="400"
    :playOnHover="true"
  />
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

export default {
  name: 'PlayOnHoverExample',
  components: {
    Vue3Lottie,
  },
}
</script>
```

## Using reactive props to control the animation

You can also use the `pauseAnimation` prop to control the play and pause state of the lottie animation.

<ClientOnly>
<ReactiveExample/>
</ClientOnly>

```vue
<template>
  <div>
    <Vue3Lottie
      :animationData="CarJSON"
      :height="200"
      :width="200"
      :pauseAnimation="playState"
    />
    <button @click="playState = !playState">Play/Pause Animation</button>
  </div>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

import CarJSON from './lotties/car.json'

export default {
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      playState: false,
      CarJSON,
    }
  },
}
</script>
```

## Listening to events

`vue3-lottie` has support for events to be emitted from the animation.

<ClientOnly>
<EventExample/>
</ClientOnly>

```vue
<template>
  <div>
    <Vue3Lottie
      :animationData="ClockJSON"
      :height="200"
      :width="200"
      @onLoopComplete="completed++"
    />
    <span> This animation has completed {{ completed }} times. </span>
  </div>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

import ClockJSON from './lotties/clock.json'

export default {
  name: 'EventExample',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      ClockJSON,
      completed: 0,
    }
  },
}
</script>
```

## Custom controls

`vue3-lottie` has a few methods that you can call directly from your component if needed. Add a `ref` to the `vue3-lottie` component and then call the methods you want.

<ClientOnly>
<CustomControlsExample/>
</ClientOnly>

::: info
`stop` will stop the animation and reset it to the first frame.
:::

```vue
<template>
  <div>
    <div>
      <Vue3Lottie
        ref="customControl"
        :animationData="CountdownJSON"
        :height="200"
        :width="200"
      />
      <div>
        <div>
          <button @click="play">Play</button>
          <button @click="pause">Pause</button>
          <button @click="stop">Stop</button>
        </div>
        <div>
          <button @click="toggleDirection">Reverse</button>
          <button @click="getFrameCount"># of frames</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

import CountdownJSON from './lotties/countdown.json'

export default {
  name: 'CustomControlsExample',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      CountdownJSON,
      direction: 'forward',
    }
  },
  methods: {
    play() {
      this.$refs['customControl'].play()
    },
    pause() {
      this.$refs['customControl'].pause()
    },
    stop() {
      this.$refs['customControl'].stop()
    },
    toggleDirection() {
      if (this.direction === 'forward') {
        this.pause()
        this.$refs['customControl'].setDirection('reverse')
        this.play()
        this.direction = 'reverse'
      } else {
        this.pause()
        this.$refs['customControl'].setDirection('forward')
        this.play()
        this.direction = 'forward'
      }
    },
    getFrameCount() {
      alert(
        `This animation has ${this.$refs[
          'customControl'
        ].getDuration()} frames`,
      )
    },
  },
}
</script>
```

::: info Disclaimer
All the lotties in this page are from [lottiefiles.com](https://lottiefiles.com/).
:::
