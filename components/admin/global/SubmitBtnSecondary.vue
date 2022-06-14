<template>
  <!-- submit -->
  <div class=" relative">
    <button
      class="
        rounded-[16px]
        p-3
        bg-white
        dark:bg-type-on-dark
        text-type-on-light
        
        dark:text-type-on-dark
        border
        border-gray-400
        w-full
        font-medium
        focus-styles focus:ring-offset-2
        hover:bg-gray-200
        disabled:bg-gray-200/60 disabled:cursor-not-allowed
      "
      :disabled="isSending"
      :class="{
        'opacity-70': isSending,
      }"

      @click="$emit('btn_click')"
    >
      <!-- @click="$emit('btn_hit')" -->
      {{ submitText }}
    </button>

    <!-- spinner -->
    <transition name="fade">
      <div
        v-if="isSending"
        class="
          absolute
          top-0
          left-0
          w-full
          h-full
          flex
          justify-start
          items-center
          pl-4
        "
      >
        <div
          class="
            spinner-border
            animate-spin
            inline-block
            w-8
            h-8
            border-4
            rounded-full
          "
          role="status"
        >
          <span class="sr-only">{{ loadingMsg }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    isSending: {
      type: Boolean,
      default: false,
    },
    loadingMsg: {
      type: String,
      default: "Loading",
    },
    submitText: {
      type: String,
      default: "Submit",
    },
  },
};
</script>

<style>
</style>