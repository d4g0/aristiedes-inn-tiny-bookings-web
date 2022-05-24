<template>
  <img
    :src="shouldRender ? src : null"
    :alt="alt"
    ref="img_ref"
    @load="onLoad"
    @error="$.emit('error')"
    loading="lazy"
    :class="!loaded ? 'lazy-image' : 'lazy-image lazy-image-loaded'"
  />
</template>

<script>
import { ref,  watchEffect } from "@nuxtjs/composition-api";
import { useElementVisibility } from "@vueuse/core";
export default {
  props: {
    src: {
      type: String,
    },
    alt: {
      type: String,
    },
  },
  setup(props, context) {
    const img_ref = ref(null);
    const loaded = ref(false);
    const shouldRender = ref(false);
    const targetIsVisible = useElementVisibility(img_ref);

    function onLoad() {
      loaded.value = true;
      context.emit("load");
    }


    watchEffect(() => {
      if (isShouldRenderTrue()) {
        return;
      }
      if (targetIsVisible.value) {
        setShouldRenderTrue();
      }
    });
    // decoupled logic into this fn to sapare from the watchEffect
    function isShouldRenderTrue() {
      return shouldRender.value == true;
    }

    function setShouldRenderTrue(){
      shouldRender.value = true;
    }

    return {
      // ref
      img_ref,
      // state
      loaded,
      shouldRender,
      targetIsVisible,
      // fn
      onLoad,
    };
  },
};
</script>

<style>
.lazy-image {
  transition: all 800ms ease;
  opacity: 0;
}
.lazy-image-loaded {
  opacity: 1;
}
</style>