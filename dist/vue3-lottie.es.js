import { defineComponent, ref, computed, watch, onMounted, openBlock, createElementBlock, normalizeStyle } from "vue";
import Lottie from "lottie-web";
var vue3Lottie_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => ".lottie-animation-container{width:var(--lottie-animation-container-width);height:var(--lottie-animation-container-height);background-color:var(--lottie-animation-container-background-color);overflow:hidden;margin:0 auto}\n")();
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = defineComponent({
  props: {
    animationData: {
      type: Object,
      default: () => ({})
    },
    animationLink: {
      type: String,
      default: ""
    },
    loop: {
      type: [Boolean, Number],
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String],
      default: "100%"
    },
    height: {
      type: [Number, String],
      default: "100%"
    },
    speed: {
      type: Number,
      default: 1
    },
    delay: {
      type: Number,
      default: 0
    },
    direction: {
      type: String,
      default: "forward"
    },
    pauseOnHover: {
      type: Boolean,
      default: false
    },
    playOnHover: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: "transparent"
    },
    pauseAnimation: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    onComplete: null,
    onLoopComplete: null,
    onEnterFrame: null,
    onSegmentStart: null,
    onAnimationLoaded: null
  },
  setup(props, { emit: emits }) {
    let lottieAnimation = ref(null);
    const elementid = ref("");
    let direction = 1;
    const checkIfContainerExists = (elementID) => {
      if (document.querySelector(`[data-id="${elementID}" ]`) !== null) {
        return true;
      } else {
        return false;
      }
    };
    const loadLottie = async (element) => {
      let autoPlay = props.autoPlay;
      if (props.playOnHover) {
        autoPlay = false;
      }
      let animationData = {};
      if (props.animationData !== {}) {
        animationData = JSON.parse(JSON.stringify(props.animationData));
      }
      if (props.animationLink != "") {
        try {
          const response = await fetch(props.animationLink);
          const json = await response.json();
          animationData = json;
        } catch (error) {
          console.error(error);
          return;
        }
      }
      let loop = props.loop;
      if (typeof loop === "number") {
        if (loop > 0) {
          loop = loop - 1;
        }
      }
      if (props.delay > 0) {
        autoPlay = false;
      }
      lottieAnimation = Lottie.loadAnimation({
        container: element,
        renderer: "svg",
        loop,
        autoplay: autoPlay,
        animationData
      });
      setTimeout(() => {
        autoPlay = props.autoPlay;
        if (props.playOnHover) {
          lottieAnimation.pause();
        } else {
          if (autoPlay) {
            lottieAnimation.play();
          } else {
            lottieAnimation.pause();
          }
        }
        emits("onAnimationLoaded");
      }, props.delay);
      lottieAnimation.setSpeed(props.speed);
      if (props.direction === "reverse") {
        lottieAnimation.setDirection(-1);
      }
      if (props.direction === "normal") {
        lottieAnimation.setDirection(1);
      }
      if (props.pauseAnimation) {
        lottieAnimation.pause();
      } else {
        if (props.playOnHover) {
          lottieAnimation.pause();
        }
      }
      lottieAnimation.addEventListener("loopComplete", () => {
        if (props.direction === "alternate") {
          lottieAnimation.stop();
          direction = direction * -1;
          lottieAnimation.setDirection(direction);
          lottieAnimation.play();
        }
        emits("onLoopComplete");
      });
      lottieAnimation.addEventListener("complete", () => {
        emits("onComplete");
      });
      lottieAnimation.addEventListener("enterFrame", () => {
        emits("onEnterFrame");
      });
      lottieAnimation.addEventListener("segmentStart", () => {
        emits("onSegmentStart");
      });
    };
    const getCurrentStyle = computed(() => {
      let width = props.width;
      let height = props.height;
      if (typeof props.width === "number") {
        width = `${props.width}px`;
      }
      if (typeof props.height === "number") {
        height = `${props.height}px`;
      }
      let cssVariables = {
        "--lottie-animation-container-width": width,
        "--lottie-animation-container-height": height,
        "--lottie-animation-container-background-color": props.backgroundColor
      };
      return cssVariables;
    });
    const hoverStarted = () => {
      if (lottieAnimation && props.pauseOnHover) {
        lottieAnimation.pause();
      }
      if (lottieAnimation && props.playOnHover) {
        lottieAnimation.play();
      }
    };
    const hoverEnded = () => {
      if (lottieAnimation && props.pauseOnHover) {
        lottieAnimation.play();
      }
      if (lottieAnimation && props.playOnHover) {
        lottieAnimation.pause();
      }
    };
    watch(() => props.pauseAnimation, () => {
      if ((props.pauseOnHover || props.playOnHover) && props.pauseAnimation) {
        console.error("If you are using pauseAnimation prop for Vue3-Lottie, please remove the props pauseOnHover and playOnHover");
        return;
      }
      if (lottieAnimation) {
        if (props.pauseAnimation) {
          lottieAnimation.pause();
        } else {
          lottieAnimation.play();
        }
      }
    });
    const play = () => {
      if (lottieAnimation) {
        lottieAnimation.play();
      }
    };
    const pause = () => {
      if (lottieAnimation) {
        lottieAnimation.pause();
      }
    };
    const stop = () => {
      if (lottieAnimation) {
        lottieAnimation.stop();
      }
    };
    const destroy = () => {
      if (lottieAnimation) {
        lottieAnimation.destroy();
      }
    };
    const setSpeed = (speed = 1) => {
      if (speed <= 0) {
        throw new Error("Speed must be greater than 0");
      }
      if (lottieAnimation) {
        lottieAnimation.setSpeed(speed);
      }
    };
    const setDirection = (direction2) => {
      if (lottieAnimation) {
        if (direction2 === "forward") {
          lottieAnimation.setDirection(1);
        } else if (direction2 === "reverse") {
          lottieAnimation.setDirection(-1);
        }
      }
    };
    const goToAndStop = (frame, isFrame = true) => {
      if (lottieAnimation) {
        lottieAnimation.goToAndStop(frame, isFrame);
      }
    };
    const goToAndPlay = (frame, isFrame = true) => {
      if (lottieAnimation) {
        lottieAnimation.goToAndPlay(frame, isFrame);
      }
    };
    const playSegments = (segments, forceFlag = false) => {
      if (lottieAnimation) {
        lottieAnimation.playSegments(segments, forceFlag);
      }
    };
    const setSubFrame = (useSubFrame = true) => {
      if (lottieAnimation) {
        lottieAnimation.setSubframe(useSubFrame);
      }
    };
    const getDuration = (inFrames = true) => {
      if (lottieAnimation) {
        return lottieAnimation.getDuration(inFrames);
      }
    };
    const makeid = (length) => {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    };
    const setupLottie = (elementID) => {
      if (props.pauseOnHover && props.playOnHover) {
        throw new Error("You cannot set pauseOnHover and playOnHover for Vue3-Lottie at the same time.");
      }
      if (props.animationLink === "" && props.animationData === {}) {
        throw new Error("You must provide either animationLink or animationData");
      }
      const interval = setInterval(() => {
        if (checkIfContainerExists(elementID)) {
          clearInterval(interval);
          const element = document.querySelector(`[data-id="${elementID}" ]`);
          if (element) {
            loadLottie(element);
          }
        }
      }, 0);
    };
    onMounted(async () => {
      elementid.value = makeid(20);
      setupLottie(elementid.value);
    });
    return {
      elementid,
      hoverEnded,
      hoverStarted,
      getCurrentStyle,
      play,
      pause,
      stop,
      destroy,
      setSpeed,
      setDirection,
      goToAndStop,
      goToAndPlay,
      playSegments,
      setSubFrame,
      getDuration
    };
  }
});
const _hoisted_1 = ["data-id"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    "data-id": _ctx.elementid,
    class: "lottie-animation-container",
    style: normalizeStyle(_ctx.getCurrentStyle),
    onMouseenter: _cache[0] || (_cache[0] = (...args) => _ctx.hoverStarted && _ctx.hoverStarted(...args)),
    onMouseleave: _cache[1] || (_cache[1] = (...args) => _ctx.hoverEnded && _ctx.hoverEnded(...args))
  }, null, 44, _hoisted_1);
}
var Vue3Lottie = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
function install(app, options) {
  const finalOptions = Object.assign({}, {
    name: "Vue3Lottie"
  }, options);
  app.component(`${finalOptions.name}`, Vue3Lottie);
}
const plugin = {
  version: "2.2.5",
  install
};
export { Vue3Lottie, plugin as default, install };
