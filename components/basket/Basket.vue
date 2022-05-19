<template>
  <div>
    <transition name="fade">
      <div
        class="fixed -bottom-[164px] lg:-bottom-[184px] left-0 w-full z-10"
        v-if="items.length"
      >
        <div
          class="
            w-full
            h-full
            relative
            -top-[164px]
            lg:-top-[184px]
            bg-black
            dark:bg-surface-light-dim
            text-white
            dark:text-type-on-light
            py-[50px]
            lg:max-w-3xl
            lg:mx-auto
            lg:px-[50px]
            lg:rounded-[32px]
            lg:mb-5
            lg:shadow-md
          "
        >
          <div class="frame-30 w-full flex items-center justify-between">
            <!-- left side (price, rooms, spin btn) -->
            <div class="flex items-center justify-between space-x-[14px] sm:space-x-[24px] ">
              <div class="flex flex-col items-start justify-center">
                <span class="text-xl font-medium"> $ {{ totalPrice }} </span>
                <span class="text-base font-medium"> {{ totalRoomsStr }} </span>
              </div>

              <!-- cart toogle btn -->
              <div>
                <button
                  @click="toogleBasketExpansion"
                  class="rounded-full p-1 focus-styles"
                >
                  <span class="sr-only">
                    {{
                      isBasketExpanded
                        ? $t("home.basket.cartToogleBtn.expanded")
                        : $t("home.basket.cartToogleBtn.not_expanded")
                    }}
                  </span>
                  <ChevronDownIcon
                    aria-hidden="true"
                    class="rotate-180 transition-all duration-200"
                    :class="{
                      'rotate-0': isBasketExpanded,
                    }"
                  />
                </button>
              </div>
            </div>

            <!-- right side (book now btn) -->
            <div>
              <button
                class="
                  rounded-[16px]
                  py-5
                  px-[50px]
                  w-full
                  font-medium
                  focus-styles
                  bg-white
                  dark:bg-black
                  text-type-on-light
                  dark:text-type-on-dark
                  focus-styles focus:ring-offset-2
                  hover:bg-brand
                  dark:hover:bg-brand dark:hover:text-white
                "
              >
                {{ $t("home.basket.bookBtn") }}
              </button>
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
import { computed, useContext } from "@nuxtjs/composition-api";
import ChevronDownIcon from "../icons/ChevronDownIcon.vue";
export default {
  components: {
    ChevronDownIcon,
  },
  setup(props, ctx) {
    const { root } = ctx;

    // $t
    // ctx.root.$i18n.t

    const basketStore = useBasketStore();
    const { items, check_in_date, check_out_date, nights, isBasketExpanded } =
      storeToRefs(basketStore);
    const { toogleBasketExpansion } = basketStore;

    // price
    const totalPrice = computed(() =>
      calculatePrice(nights.value, items.value)
    );

    function calculatePrice(nights = 0, rooms = []) {
      console.log("(calculatePrice)");
      // console.log(rooms);
      const basePrice = 0;
      const totalPrice = rooms.reduce((prevPrice, room) => {
        const roomPrice = nights * room.night_price;
        return roomPrice + prevPrice;
      }, basePrice);

      return totalPrice;
    }

    // rooms
    const totalRooms = computed(() =>
      items.value.reduce((prevRooms, item) => prevRooms + 1, 0)
    );

    const totalRoomsStr = computed(() => formatTotalRooms(totalRooms.value));
    const roomStrSingular = computed(() =>
      root.$i18n.t("home.basket.room.singular")
    );
    const roomStrPlural = computed(() =>
      root.$i18n.t("home.basket.room.plural")
    );
    function formatTotalRooms(rooms) {
      var baseStr = roomStrSingular.value;
      if (rooms > 1) {
        baseStr = roomStrPlural.value;
      }

      return `${rooms} ${baseStr}`;
    }

    //

    // Dev only
    const { populateForDevelopment } = basketStore;
    function initForDev() {
      if (!process.client) {
        return;
      }
      populateForDevelopment();
    }

    // onMounted(initForDev);

    return {
      items,
      totalPrice,
      totalRoomsStr,
      check_in_date,
      check_out_date,
      nights,
      isBasketExpanded,
      toogleBasketExpansion,
    };
  },
};
</script>

<style>
</style>