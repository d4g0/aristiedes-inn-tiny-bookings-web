<template>
  <div class="absolute bottom-0 left-0 w-full flex items-center z-30">
    <div class="frame-p max-w-md mx-auto">
      <div
        class="
          bg-gray-200
          p-1
          rounded-lg
          border border-gray-400
          flex
          justify-between
          items-start
          shadow-lg
        "
        :class="{
          'bg-red-200 border-red-400 text-red-900': isErrorToast,
        }"
      >
        <p class="p-3">
          {{ contentPath.length > 0 ? $t(contentPath) : contentText }}
        </p>
        <button
          @click="$emit('close')"
          class="p-2 focus-styles focus:ring-brand rounded-full"
          :class="{
            'focus:ring-red-900': isErrorToast,
          }"
        >
          <span class="sr-only">Close</span>
          <XIcon class="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue-demi";
import XIcon from "~/components/icons/XIcon.vue";
import { TOAST_TYPES } from "~/db";
export default {
  components: {
    XIcon,
  },
  props: {
    type: {
      type: String,
      default: "",
    },
    contentPath: {
      type: String,
      default: "",
    },
    contentText: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const isErrorToast = computed(() => props.type == TOAST_TYPES.error);

    return {
      isErrorToast,
    };
  },
};
</script>

<style>
</style>