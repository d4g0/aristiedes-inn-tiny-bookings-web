<template>
  <!-- submit -->
  <div class="relative">
    <button
      class="
        rounded-[16px]
        p-3
        bg-black
        dark:bg-type-on-dark
        text-white
        dark:text-type-on-light
        w-full
        font-medium
        focus-styles focus:ring-offset-2
        hover:bg-brand
        dark:hover:bg-brand dark:hover:text-white
        disabled:bg-brand/60 disabled:cursor-not-allowed
      "
      :disabled="isSending"
      :class="{
        'opacity-70': isSending,
      }"
      @click="$emit('btn_click')"
    >
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

  setup(props, { emit }) {
    function onClick() {
      emit('btn_click')
    }

    return{
      onClick
    }
  },
};
</script>

<style>
</style>