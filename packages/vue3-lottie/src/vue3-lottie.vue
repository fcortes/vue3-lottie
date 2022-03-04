<template>
  <div>
    <lottie-player
      :data-id="elementid"
      ref="lottie_player"
      :controls="$props.showControls"
      :style="getCurrentStyle"
      class="lottie-animation-container"
      @mouseenter="hoverStarted"
      @mouseleave="hoverEnded"
    ></lottie-player>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed, watch, defineComponent, PropType } from 'vue'
import * as LottiePlayer from '@lottiefiles/lottie-player'

export interface LottieProps {
  animationData: any
  animationLink: string
  loop: boolean | number
  autoPlay: boolean
  rendererSettings: any
  width: number | string
  height: number | string
  speed: number
  delay: number
  direction: string
  pauseOnHover: boolean
  playOnHover: boolean
  backgroundColor: string
  pauseAnimation: boolean
  showControls: boolean
}

export default defineComponent({
  props: {
    animationData: {
      type: Object as PropType<LottieProps['animationData']>,
      default: () => ({}),
    },

    animationLink: {
      type: String as PropType<LottieProps['animationLink']>,
      default: '',
    },

    loop: {
      type: [Boolean, Number] as PropType<LottieProps['loop']>,
      default: true,
    },

    autoPlay: {
      type: Boolean as PropType<LottieProps['autoPlay']>,
      default: true,
    },

    width: {
      type: [Number, String] as PropType<LottieProps['width']>,
      default: '100%',
    },

    height: {
      type: [Number, String] as PropType<LottieProps['height']>,
      default: '100%',
    },

    speed: {
      type: Number as PropType<LottieProps['speed']>,
      default: 1,
    },

    delay: {
      type: Number as PropType<LottieProps['delay']>,
      default: 0,
    },

    direction: {
      type: String as PropType<LottieProps['direction']>,
      default: 'forward',
    },

    pauseOnHover: {
      type: Boolean as PropType<LottieProps['pauseOnHover']>,
      default: false,
    },

    playOnHover: {
      type: Boolean as PropType<LottieProps['playOnHover']>,
      default: false,
    },

    backgroundColor: {
      type: String as PropType<LottieProps['backgroundColor']>,
      default: 'transparent',
    },

    pauseAnimation: {
      type: Boolean as PropType<LottieProps['pauseAnimation']>,
      default: false,
    },

    showControls: {
      type: Boolean as PropType<LottieProps['showControls']>,
      default: false,
    },
  },

  emits: {
    onLoad: null,
    onReady: null,
    onError: null,

    onPlay: null,
    onPause: null,
    onStop: null,

    onLoopComplete: null,
    onComplete: null,

    onEnterFrame: null,
  },

  setup(props, { emit: emits }) {
    let lottie_player = ref<any>(null)
    const elementid = ref<string>('')
    let direction = ref<number>(1)
    let loopCounter = ref<number>(0)

    // hack fix supplement for ssr
    const checkIfContainerExists = (elementID: String) => {
      if (document.querySelector(`[data-id="${elementID}" ]`) !== null) {
        return true
      } else {
        return false
      }
    }

    const loadLottie = async () => {
      let animationData = props.animationData

      if (props.animationLink != '') {
        try {
          const response = await fetch(props.animationLink)
          const json = await response.json()
          animationData = json
        } catch (error) {
          console.error(error)
          return
        }
      }

      lottie_player.value.load(animationData)

      if (!props.autoPlay) {
        lottie_player.value.seek(0)
        lottie_player.value.pause()
      }

      if (props.playOnHover) {
        lottie_player.value.seek(0)
        lottie_player.value.pause()
      }

      if (props.delay > 0) {
        lottie_player.value.seek(0)
        lottie_player.value.pause()
      }

      setTimeout(() => {
        if (props.direction === 'reverse') {
          lottie_player.value.seek(getDuration() - 1)
          lottie_player.value.setDirection(-1)
          direction.value = -1
        }

        if (props.direction === 'normal') {
          lottie_player.value.setDirection(1)
          direction.value = 1
        }

        if (props.autoPlay) {
          if (props.playOnHover) {
            lottie_player.value.seek(0)
            lottie_player.value.pause()
          } else {
            lottie_player.value.play()
          }
        }
      }, props.delay)

      lottie_player.value.setSpeed(props.speed)

      if (props.pauseAnimation) {
        lottie_player.value.pause()
      } else {
        if (props.playOnHover) {
          lottie_player.value.pause()
        }
      }

      // set the emit events
      lottie_player.value.addEventListener('load', () => {
        emits('onLoad')
      })

      lottie_player.value.addEventListener('error', () => {
        emits('onError')
      })

      lottie_player.value.addEventListener('ready', () => {
        emits('onReady')
      })

      lottie_player.value.addEventListener('play', () => {
        if (props.loop === true || typeof props.loop === 'number') {
          // don't emit anything
        } else {
          emits('onPlay')
        }
      })

      lottie_player.value.addEventListener('pause', () => {
        if (props.loop === true || typeof props.loop === 'number') {
          // don't emit anything
        } else {
          emits('onPause')
        }
      })

      lottie_player.value.addEventListener('stop', () => {
        if (typeof props.loop === 'number') {
          // don't emit anything
        } else {
          emits('onStop')
        }
      })

      lottie_player.value.addEventListener('complete', () => {
        if (props.direction === 'alternate') {
          lottie_player.value.pause()

          direction.value = direction.value * -1 //invert direction
          lottie_player.value.setDirection(direction.value)

          lottie_player.value.play()
          if (typeof props.loop === 'number') {
            loopCounter.value++
            if (loopCounter.value < props.loop) {
              emits('onLoopComplete')
            } else {
              loopCounter.value = 0
              lottie_player.value.pause()
              emits('onLoopComplete')
              emits('onComplete')
            }
          }
        } else {
          if (props.loop === true) {
            if (direction.value == -1) {
              lottie_player.value.seek(getDuration() - 1)
            } else {
              lottie_player.value.stop()
            }

            emits('onLoopComplete')

            if (!props.autoPlay) {
              lottie_player.value.seek(0)
              lottie_player.value.pause()
            } else {
              lottie_player.value.play()
            }
          } else if (typeof props.loop === 'number') {
            loopCounter.value++
            if (loopCounter.value < props.loop) {
              lottie_player.value.stop()

              emits('onLoopComplete')

              lottie_player.value.play()
            } else {
              loopCounter.value = 0

              lottie_player.value.pause()

              emits('onComplete')
            }
          } else {
            lottie_player.value.pause()

            emits('onComplete')
          }
        }
      })

      lottie_player.value.addEventListener('frame', () => {
        emits('onEnterFrame')
      })
    }

    // generate the css variables for width, height and background color
    const getCurrentStyle: any = computed(() => {
      let width = props.width
      let height = props.height

      // set to px values if a number is passed
      if (typeof props.width === 'number') {
        width = `${props.width}px`
      }

      if (typeof props.height === 'number') {
        height = `${props.height}px`
      }

      let cssVariables = {
        '--lottie-animation-container-width': width,
        '--lottie-animation-container-height': height,
        '--lottie-animation-container-background-color': props.backgroundColor,
      }

      return cssVariables
    })

    // function to check if the container is being hovered
    const hoverStarted = () => {
      if (lottie_player.value && props.pauseOnHover) {
        lottie_player.value.pause()

        emits('onPause')
      }

      if (lottie_player.value && props.playOnHover) {
        lottie_player.value.play()

        emits('onPlay')
      }
    }

    // function to check if the container is no longer being hovered
    const hoverEnded = () => {
      if (lottie_player.value && props.pauseOnHover) {
        lottie_player.value.play()

        emits('onPlay')
      }
      if (lottie_player.value && props.playOnHover) {
        lottie_player.value.pause()

        emits('onPause')
      }
    }

    // watch for changes in props
    // mainly used for the pauseAnimation prop
    watch(props, () => {
      // error if pauseAnimation is true and pauseOnHover is also true or playOnHover is also true
      if ((props.pauseOnHover || props.playOnHover) && props.pauseAnimation) {
        console.error(
          'If you are using pauseAnimation prop for Vue3-Lottie, please remove the props pauseOnHover or playOnHover',
        )
      }

      // control the animation play state
      if (!props.pauseOnHover && !props.playOnHover) {
        if (lottie_player.value && props.pauseAnimation) {
          lottie_player.value.pause()

          emits('onPause')
        } else if (lottie_player.value && !props.pauseAnimation) {
          lottie_player.value.play()

          emits('onPlay')
        }
      }
    })

    // method to play the animation
    const play = () => {
      if (lottie_player.value) {
        lottie_player.value.play()

        emits('onPlay')
      }
    }

    // method to pause the animation
    const pause = () => {
      if (lottie_player.value) {
        lottie_player.value.pause()

        emits('onPause')
      }
    }

    // method to stop the animation. It will reset the animation to the first frame
    const stop = () => {
      if (lottie_player.value) {
        lottie_player.value.stop()

        emits('onStop')
      }
    }

    const setSpeed = (speed: number = 1) => {
      // speed: 1 is normal speed.

      if (speed <= 0) {
        throw new Error('Speed must be greater than 0')
      }

      if (lottie_player.value) {
        lottie_player.value.setSpeed(speed)
      }
    }

    const setDirection = (direction_: 'forward' | 'reverse') => {
      if (lottie_player.value) {
        if (direction_ === 'forward') {
          lottie_player.value.setDirection(1)
          direction.value = 1
        } else if (direction_ === 'reverse') {
          lottie_player.value.setDirection(-1)
          direction.value = -1
        }
      }
    }

    const getDuration = () => {
      if (lottie_player.value) {
        return lottie_player.value.getLottie().totalFrames
      }
    }

    // function to generate random strings for IDs
    const makeid = (length: number) => {
      var result = ''
      var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        )
      }
      return result
    }

    const setupLottie = (elementID: String) => {
      if (props.pauseOnHover && props.playOnHover) {
        throw new Error(
          'You cannot set pauseOnHover and playOnHover for Vue3-Lottie at the same time.',
        )
      }

      if (props.animationLink === '' && props.animationData === {}) {
        throw new Error(
          'You must provide either animationLink or animationData',
        )
      }

      // Unfortunately, this is a hackfix for ssr. We need to wait for the element to be rendered before we can load the animation.
      // One day I will figure out how to do this properly.
      const interval = setInterval(() => {
        if (checkIfContainerExists(elementID)) {
          clearInterval(interval)
          const element = document.querySelector(`[data-id="${elementID}" ]`)

          if (element) {
            loadLottie() // load the animation
          }
        }
      }, 0)
    }

    onMounted(async () => {
      elementid.value = makeid(20) // generate a random id for the container

      setupLottie(elementid.value)
    })

    return {
      elementid,
      hoverEnded,
      hoverStarted,
      getCurrentStyle,
      LottiePlayer,
      lottie_player,
      direction,
      loopCounter,
      getDuration,
      setDirection,
      setSpeed,
      stop,
      pause,
      play,
    }
  },
})
</script>

<style>
.lottie-animation-container {
  width: var(--lottie-animation-container-width);
  height: var(--lottie-animation-container-height);
  background-color: var(--lottie-animation-container-background-color);
  overflow: hidden;
  margin: 0 auto;
}
</style>
