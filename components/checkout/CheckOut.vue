<template>
  <div>
    <transition name="fade">
      <!-- checkOutNeeded -->
      <div
        v-if="checkOutNeeded"
        class="
          fixed
          z-10
          w-full
          h-full
          left-0
          top-0
          min-h-screen
          bg-surface-light
          dark:bg-surface-dark
          pb-[300px]
          overflow-y-auto
        "
      >
        <!-- content -->
        <div class="frame-30 py-[30px]">
          <div class="max-w-xl">
            <!-- back btn -->
            <div>
              <button
                @click="tooglecheckOutNeeded"
                class="
                  rounded-xl
                  p-1
                  focus-styles
                  flex
                  items-center
                  justify-between
                  gap-2
                "
              >
                <ChevronDownIcon
                  aria-hidden="true"
                  class="rotate-90 transition-all duration-200"
                />
                <!-- {{ $t("home.basket_exp.backBtn") }} -->
                <span class="font-medium"> Go Back </span>
              </button>
            </div>

            <!-- summary -->

            <CheckoutSumary class="mt-[50px]" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useBasketStore } from "~/stores/basket-storage";
import ChevronDownIcon from "../icons/ChevronDownIcon.vue";
import useBodyOverflow from "~/composables/useBodyOverflow.js";
import { watch } from "@nuxtjs/composition-api";
import CheckoutSumary from "~/components/checkout/CheckoutSumary.vue";

export default {
  components: { ChevronDownIcon, CheckoutSumary },
  setup() {
    const basketStore = useBasketStore();
    const { checkOutNeeded } = storeToRefs(basketStore);
    const { tooglecheckOutNeeded } = basketStore;

    // dom overflow handling
    const { hideOverflow, showOverflow } = useBodyOverflow();
    watch(checkOutNeeded, () => {
      if (checkOutNeeded.value) {
        hideOverflow();
      } else {
        showOverflow();
      }
    });

    return {
      checkOutNeeded,
      tooglecheckOutNeeded,
    };
  },
};
</script>

<style>
</style>