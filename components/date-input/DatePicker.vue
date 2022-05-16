<template>
  <div>
    <v-date-picker
      v-model="range"
      is-range
      :update-on-input="false"
      :max-date="maxDate"
      color="gray"
      @drag="onDateSelection"
      :min-date="minDate"
      :is-dark="isDark"
    >
      <template v-slot="{ inputValue, inputEvents }">
        <div class="flex justify-between items-center gap-2 w-full">
          <!-- check in -->
          <div
            class="
              border border-gray-300
              dark:border-opacity-20
              rounded-[16px]
              p-3
            "
          >
            <label
              for="check-in"
              class="block text-sm font-medium uppercase tracking-wider"
              >Check in</label
            >
            <input
              :value="inputValue.start"
              v-on="inputEvents.start"
              name="check-in"
              class="
                mt-2
                block
                border
                dark:border-opacity-20
                px-2
                py-1
                w-full
                rounded
                focus-styles
                font-medium
                text-lg
                bg-surface-light
                dark:bg-surface-dark
              "
            />
          </div>

          <!-- check out -->
          <div
            class="
              border border-gray-300
              dark:border-opacity-20
              rounded-[16px]
              p-3
            "
          >
            <label
              for="check-out"
              class="block text-sm font-medium uppercase tracking-wider"
              >Check out</label
            >
            <input
              :value="inputValue.end"
              v-on="inputEvents.end"
              name="check-out"
              class="
                mt-2
                block
                border
                dark:border-opacity-20
                px-2
                py-1
                w-full
                rounded
                focus-styles
                font-medium
                text-lg
                bg-surface-light
                dark:bg-surface-dark
              "
            />
          </div>
        </div>
      </template>
    </v-date-picker>

    <!-- <pre>
<code>
range: {{ range }}
</code>
    </pre> -->
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from "@nuxtjs/composition-api";
import { getDatesRange } from "~/utils";
import { useDaysStore } from "~/stores/days-search.js";
import { storeToRefs } from "pinia";
import { EVENTS } from "~/db";

export default {
  props: {
    calendarLength: {
      type: Number,
      default: 90,
    },
  },

  setup(props, { emit }) {
    const { startDate: todayDate, endDate: todayPlus3 } = getDatesRange(3);

    // data

    // sync
    // isValidDate
    // init days-storage
    // check if dates in days-storage are valid
    // if not se Default range [ t , t+3]
    const daysStorage = useDaysStore();
    const { saveDates, initWithFalback, setDates } = daysStorage;
    const { check_in_date, check_out_date } = storeToRefs(daysStorage);
    initWithFalback(todayDate, todayPlus3);

    const minDate = ref(todayDate);
    const maxDate = computed(() => {
      const { endDate: hotelLastDay } = getDatesRange(props.calendarLength);
      return hotelLastDay;
    });

    const range = reactive({
      start: "",
      end: "",
    });
    range.start = check_in_date;
    range.end = check_out_date;

    const DATES_RANGE_SELECTED =
      EVENTS.CLIENT.SEARCH_ROOM.DATES_PICKER.DATES_RANGE_SELECTED;
    function onDateSelection(range) {
      // console.log({
      //   loc: "onDateSelection",
      //   range,
      // });
      setDates({
        check_in: new Date(range.start),
        check_out: new Date(range.end),
      });
      saveDates();
      propagateDates();
    }

    function propagateDates() {
      emit(DATES_RANGE_SELECTED, {
        check_in_date: check_in_date.value,
        check_out_date: check_out_date.value,
      });
    }

    if (process.client) {
      propagateDates();
    }

    // dark handling todo make right
      const isDark = ref(false);
    // const htmlRef = ref();
    // onMounted(() => {
    //   if (!process.client) {
    //     return;
    //   }
    //   htmlRef.value = document.documentElement;
    // });
    // const htmlClasses = computed(() =>
    //   htmlRef.value?.classList ? Array.from(htmlRef.value?.classList) : []
    // );
    // computed(() => htmlClasses.value.includes("dark"));
    // console.log(htmlClasses)

    return {
      range,
      minDate,
      maxDate,
      onDateSelection,
      isDark,
    };
  },
};
</script>

<style>
</style>