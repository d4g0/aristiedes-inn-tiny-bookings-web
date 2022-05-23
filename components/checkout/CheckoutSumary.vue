<template>
  <div class="">
    <h2 class="font-bold text-3xl md:text-5xl">
      {{ $t("home.basket_exp.summary.summary_key") }}
    </h2>
    <ul class="mt-[20px]">
      <!-- in -->
      <li class="py-[12px] border-b border-opacity-50">
        <div class="flex items-center justify-between">
          <span>{{ $t("home.basket_exp.summary.check_in") }}</span>
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
          <span>{{ $t("home.basket_exp.summary.check_out") }} </span>
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
          <span>{{ $t("home.basket_exp.summary.nights") }}</span>
          <span>
            {{ nights }}
          </span>
        </div>
      </li>
      <!-- check in time -->
      <li class="py-[12px] border-b border-opacity-50">
        <div class="flex items-center justify-between">
          <span>{{ $t("home.basket_exp.summary.check_in_time") }}</span>
          <span>
            {{ hotel_check_in_time_f }}
          </span>
        </div>
      </li>

      <!-- check out time -->
      <li class="py-[12px] border-b border-opacity-50">
        <div class="flex items-center justify-between">
          <span>{{ $t("home.basket_exp.summary.check_out_time") }}</span>
          <span>
            {{ hotel_check_out_time_f }}
          </span>
        </div>
      </li>

      <!-- rooms -->
      <li class="py-[12px] border-b border-opacity-50">
        <div class="flex items-center justify-between">
          <span>{{ roomStrPlural }}</span>
          <span>
            {{ totalRooms }}
          </span>
        </div>
      </li>

      <!-- total -->
      <li class="py-[12px] border-b border-opacity-50">
        <div class="flex items-center justify-between">
          <span>{{ $t("home.check_out.total_price") }}</span>
          <span>
            {{ totalPrice }}
          </span>
        </div>
      </li>

      <!-- coin -->
      <li class="py-[12px] border-b border-opacity-50">
        <div class="flex items-center justify-between">
          <span>{{ $t("home.check_out.currency") }}</span>
          <span>
            USD
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useBasketStore } from "~/stores/basket-storage";
import { computed } from "@nuxtjs/composition-api";
import ChevronDownIcon from "../icons/ChevronDownIcon.vue";
import { useDateFormat } from "@vueuse/core";
import BasketExpansionRoomItem from "../basket/BasketExpansionRoomItem.vue";

export default {
  components: { ChevronDownIcon, BasketExpansionRoomItem },
  setup(props, ctx) {
    // TODO implement a focus trap here

    const { root } = ctx;
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

    // rooms;
    const totalRooms = computed(() => items.value?.length || 0);
    const roomStrPlural = computed(() =>
      root.$i18n.t("home.basket.room.plural")
    );

    // price
    const totalPrice = computed(() =>
      calculatePrice(nights.value, items.value)
    );

    function calculatePrice(nights = 0, rooms = []) {
      // console.log("(calculatePrice)");
      // console.log(rooms);
      const basePrice = 0;
      const totalPrice = rooms.reduce((prevPrice, room) => {
        const roomPrice = nights * room.night_price;
        return roomPrice + prevPrice;
      }, basePrice);

      return "$ " + totalPrice;
    }

    // const totalPriceStr = computed(()=>root.$i18n.t("home.check_out.total_price"))
    //

    // mutations

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
      // room
      roomStrPlural,
      totalRooms,
      // price
      totalPrice,

      // evt

      // mutations
    };
  },
};
</script>

<style>
</style>