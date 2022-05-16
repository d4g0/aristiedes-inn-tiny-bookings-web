<template>
  <div class="">
    <div class="">
      <DatePicker
        @[DATES_RANGE_SELECTED]="onSelection"
        :calendarLength="calendarLength"
      />
      <transition name="fade">
        <div class="mt-4 text-red-900 text-sm pl-2" v-if="selectionError">
          <span aria-hidden="true">*</span>
          <span> {{ $t("home.search.errors.selection_error") }} </span>
        </div>
      </transition>
      <div class="mt-4 relative">
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
          :disabled="searching"
          :class="{
            'opacity-70': searching,
          }"
        >
          {{ $t("home.search.searchBtn") }}
        </button>

        <!-- spinner -->
        <transition name="fade">
          <div
            v-if="searching"
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
                border-2
                rounded-full
              "
              role="status"
            >
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </transition>
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
  props: {
    calendarLength: {
      type: Number,
      default: 90,
    },
    searching: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
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
      // console.log("onSearchReq");

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

      const isValidInterval = interValMS >= dayMs;

      if (!isValidInterval) {
        showSelectionError();
      }

      // clear
      requestSearch();
    }

    function showSelectionError() {
      selectionError.value = true;
      setTimeout(() => (selectionError.value = false), 5 * 1000);
    }

    const SEARCH_REQUEST = EVENTS.CLIENT.SEARCH_ROOM.SEARCH_REQUEST;
    function requestSearch() {
      emit(SEARCH_REQUEST, {
        check_in_date: check_in_date.value,
        check_out_date: check_out_date.value,
      });
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