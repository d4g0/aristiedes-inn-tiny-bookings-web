<template>
  <div class="overflow-hidden  rounded-3xl " ref="mapConatiner">
    <!-- skeleton load -->
    <div v-if="shouldRenderSkeleton" class="absolute inset-0 rounded-3xl w-full h-full bg-gray-200 animate-pulse">
    </div>

    <iframe
      v-if="mapNeeded"
      :src="mapSrc"
      frameborder="0"
      style="border: 0"
      allowfullscreen
      aria-hidden="false"
      tabindex="0"
      loading="lazy"
      class="absolute w-full h-full  rounded-3xl "
      @load="shouldRenderSkeleton = false"
    ></iframe>
  </div>
</template>

<script>
// google maps link
// ""
import { reactive, ref, toRefs, watch } from "@nuxtjs/composition-api";
import { useElementVisibility } from "@vueuse/core";
export default {
  props: {
    mapSrc: {
      type: String,
      default:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.3614473826865!2d-78.15714388471447!3d-10.069440711010744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91aa1787b5266449%3A0xf9a122ce44ffe019!2sHospedaje%20Aristides%20Inn!5e0!3m2!1ses-419!2scu!4v1646520877923!5m2!1ses-419!2scu",
    },
    mapTitle: {
      type: String,
      default: "",
    },
  },
  setup() {
    const mapConatiner = ref(null);
    const state = reactive({
      mapConatinerViewed: useElementVisibility(mapConatiner),
      mapNeeded: false,
    });

    watch(
      () => state.mapConatinerViewed,
      (a, b) => {
        if (!state.mapNeeded) {
          state.mapNeeded = true;
        }
      }
    );

    var shouldRenderSkeleton = ref(true);

    return {
      shouldRenderSkeleton,
      mapConatiner,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped></style>
