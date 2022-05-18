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
            <div class="mt-[50px]">
              <h2 class="font-bold text-3xl md:text-5xl">Sumary</h2>
              <ul class="mt-[20px]">
                <!-- in -->
                <li class="py-[12px] border-b border-opacity-50">
                  <div class="flex items-center justify-between">
                    <span>Check in</span>
                    <span>
                      <time :datetime="check_in_date">
                        {{ check_in_date_f }}
                      </time>
                    </span>
                  </div>
                </li>
                <!-- out -->
                <li class="py-[12px] border-b border-opacity-50">
                  <div class="flex items-center justify-between">
                    <span>Check out</span>
                    <span>
                      <time :datetime="check_out_date_f">
                        {{ check_out_date_f }}
                      </time>
                    </span>
                  </div>
                </li>
                <!-- nights -->
                <li class="py-[12px] border-b border-opacity-50">
                  <div class="flex items-center justify-between">
                    <span>Nights</span>
                    <span>
                      {{ nights }}
                    </span>
                  </div>
                </li>
                <!-- check in time -->
                <li class="py-[12px] border-b border-opacity-50">
                  <div class="flex items-center justify-between">
                    <span>Check in time</span>
                    <span>
                      {{ hotel_check_in_time_f }}
                    </span>
                  </div>
                </li>

                <!-- check out time -->
                <li class="py-[12px] border-b border-opacity-50">
                  <div class="flex items-center justify-between">
                    <span>Check out time</span>
                    <span>
                      {{ hotel_check_out_time_f }}
                    </span>
                  </div>
                </li>
              </ul>
            </div>

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
import { computed, watch } from "@nuxtjs/composition-api";
import ChevronDownIcon from "../icons/ChevronDownIcon.vue";
import { useDateFormat } from "@vueuse/core";
import BasketExpansionRoomItem from "./BasketExpansionRoomItem.vue";
import { useListingsStore } from "~/stores/listings-storage";
import { EVENTS } from "~/db/index";

export default {
  components: { ChevronDownIcon, BasketExpansionRoomItem },
  setup() {
    const REMOVAL_REQUEST =
      EVENTS.CLIENT.BASKET.BASKET_EXPANSION.ROOM_ITEM.REMOVAL_REQUEST;
    // TODO implement a focus trap here
    // store
    const basketStore = useBasketStore();
    const {
      items,
      check_in_date,
      check_out_date,
      nights,
      isBasketExpanded,
      hotel_check_in_time,
      hotel_check_out_time,
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

    //comp fn
    function useTimeStrFormat(time_str = "xx:xx:xx") {
      if (typeof time_str != "string") {
        return "";
      }
      const time = time_str.split(":").slice(0, 2).join(":");
      return time;
    }

    // computed
    // to refactor [useDateFormat, useTimeStrFormat] as a luxon powered util in a composable reactive returning fn
    const check_in_date_f = useDateFormat(check_in_date, "YYYY/MM/DD");
    const check_out_date_f = useDateFormat(check_out_date, "YYYY/MM/DD");
    const hotel_check_in_time_f = computed(() =>
      useTimeStrFormat(hotel_check_in_time.value)
    );
    const hotel_check_out_time_f = computed(() =>
      useTimeStrFormat(hotel_check_out_time.value)
    );

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
      check_in_date,
      check_out_date,
      nights,
      isBasketExpanded,
      hotel_check_in_time,
      hotel_check_out_time,

      toogleBasketExpansion,
      // computed
      check_in_date_f,
      check_out_date_f,
      hotel_check_in_time_f,
      hotel_check_out_time_f,

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