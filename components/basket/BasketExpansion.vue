<template>
  <div>
    <transition name="fade">
      <div
        v-if="isBasketExpanded"
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
        <!-- Expanded info -->
        <div class="frame-30 py-[30px]">
          <div class="max-w-xl">
            <!-- back btn -->
            <div>
              <button
                @click="toogleBasketExpansion"
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
                <span class="font-medium"> Back to listings </span>
              </button>
            </div>

            <!-- sumary -->
            <BaketExpSumary class="mt-[50px]" />

            <!-- rooms -->
            <div class="mt-[50px]">
              <h2 class="font-bold text-3xl md:text-5xl">Rooms</h2>
              <ul class="mt-[20px]">
                <li v-for="item in items" :key="item.id">
                  <BasketExpansionRoomItem
                    :room_item="item"
                    @[REMOVAL_REQUEST]="onRemovalRequest"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useBasketStore } from "~/stores/basket-storage";
import useBodyOverflow from "~/composables/useBodyOverflow.js";
import { watch } from "@nuxtjs/composition-api";
import ChevronDownIcon from "../icons/ChevronDownIcon.vue";
import { useListingsStore } from "~/stores/listings-storage";
import { EVENTS } from "~/db/index";
import BasketExpansionRoomItem from "./BasketExpansionRoomItem.vue";
import BaketExpSumary from "./BaketExpSumary.vue";

export default {
  components: { ChevronDownIcon, BasketExpansionRoomItem, BaketExpSumary },
  setup() {
    // TODO implement a focus trap here
    const REMOVAL_REQUEST =
      EVENTS.CLIENT.BASKET.BASKET_EXPANSION.ROOM_ITEM.REMOVAL_REQUEST;
    // store
    const basketStore = useBasketStore();
    const {
      items,
      isBasketExpanded,
    } = storeToRefs(basketStore);
    const { toogleBasketExpansion, getItemByID, removeFromBasket } =
      basketStore;
    //

    // ui
    const { hideOverflow, showOverflow } = useBodyOverflow();
    // dom overflow handling
    watch(isBasketExpanded, () => {
      if (isBasketExpanded.value) {
        hideOverflow();
      } else {
        showOverflow();
      }
    });

    // listings handling
    const listingsStore = useListingsStore();
    const { addListing } = listingsStore;
    //

    // mutations
    function onRemovalRequest(id) {
      const tempListing = getItemByID(id);
      addListing(tempListing);
      removeFromBasket(id);
    }
    //

    return {
      items,
      isBasketExpanded,

      toogleBasketExpansion,
      // computed

      // evt
      REMOVAL_REQUEST,

      // mutations
      onRemovalRequest,
    };
  },
};
</script>

<style>
</style>