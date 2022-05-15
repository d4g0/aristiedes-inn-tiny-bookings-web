<template>
  <div class="">
    <div class="">
      <DatePicker @[DATES_RANGE_SELECTED]="onSelection" />
      <transition name="fade">
        <div class="mt-4 text-red-900 text-sm pl-2" v-if="selectionError">
          <span aria-hidden="true">*</span>
          <span> {{ $t("home.search.errors.selection_error") }} </span>
        </div>
      </transition>
      <div class="mt-4">
        <button
          class="
            rounded-[16px]
            p-3
            bg-black
            text-white
            w-full
            font-medium
            focus-styles focus:ring-offset-2
            hover:bg-gray-900
          "
          @click="onSearchReq"
        >
        
          {{ $t("home.search.searchBtn") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@nuxtjs/composition-api";
import { EVENTS } from "~/db";
import DatePicker from "../date-input/DatePicker.vue";
import { isValidDate } from "~/utils";
export default {
  components: { DatePicker },
  setup() {
    const check_in_date = ref("");
    const check_out_date = ref("");

    const DATES_RANGE_SELECTED =
      EVENTS.CLIENT.SEARCH_ROOM.DATES_PICKER.DATES_RANGE_SELECTED;

    function onSelection(data) {
      check_in_date.value = data.check_in_date;
      check_out_date.value = data.check_out_date;
    }

    const selectionError = ref(false);
    function onSearchReq() {
      console.log("onSearchReq");

      // validate dates interval
      const areValidDates =
        isValidDate(check_in_date.value) && isValidDate(check_out_date.value);

      if (!areValidDates) {
        return showSelectionError();
      }

      // chek there is at least a 24h interval (there is a night in between)
      const dayMs = 86400000;
      const interValMS =
        check_out_date.value.valueOf() - check_in_date.value.valueOf();

      const isValidInterval = interValMS > dayMs;
      if (!isValidInterval) {
        showSelectionError();
      }
    }

    function showSelectionError() {
      selectionError.value = true;
      setTimeout(() => (selectionError.value = false), 5 * 1000);
    }

    return {
      DATES_RANGE_SELECTED,
      selectionError,
      onSelection,
      onSearchReq,
    };
  },
};
</script>

<style>
</style>