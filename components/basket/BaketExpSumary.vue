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
    </ul>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useBasketStore } from "~/stores/basket-storage";
import { computed } from "@nuxtjs/composition-api";
import ChevronDownIcon from "../icons/ChevronDownIcon.vue";
import { useDateFormat } from "@vueuse/core";
import BasketExpansionRoomItem from "./BasketExpansionRoomItem.vue";

export default {
  components: { ChevronDownIcon, BasketExpansionRoomItem },
  setup() {
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

      // evt

      // mutations
    };
  },
};
</script>

<style>
</style>