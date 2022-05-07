<template>
  <div class="w-full sm:px-8">
    <form>
      <!-- email -->
      <div class="mt-4">
        <label for="email" class="label">Email</label>
        <input type="email" name="email" class="input-field focus-effect" />
      </div>

      <!-- passw -->
      <div class="mt-4">
        <label for="password" class="label">Password</label>
        <input
          type="password"
          name="password"
          class="input-field focus-effect"
        />
      </div>

      <!-- submit -->
      <div class="mt-[40px] relative">
        <button
          class="
            bg-brand
            py-2
            rounded-xl
            text-white
            font-medium
            text-lg
            w-full
            focus-effect
            disabled:bg-brand/60 disabled:cursor-not-allowed
          "
          :disabled="isSending"
        >
          Submit
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
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </transition>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "@nuxtjs/composition-api";
export default {
  props: {
    isSending: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const email = ref("");
    const password = ref("");

    return {};
  },
};
</script>

<style scopped>
.label {
  @apply block text-lg font-medium;
}
.input-field {
  @apply mt-1
            block
            w-full
            p-2
            rounded-xl
            font-medium
            bg-transparent
            border-gray-800/40 border;
}
.focus-effect {
  @apply transition-shadow duration-500
            focus:outline-none
            focus:ring
            focus:ring-brand
            focus:ring-offset-white
            focus:ring-offset-2;
}

.spinner-border {
  /* border: 0.25em solid white; */
  /* border-right-color: transparent; */
  @apply border-[0.25em] border-solid border-r-transparent border-white;
}
</style>
