<template>
  <div>
    <div v-if="!selectedHotel" class="flex items-center justify-center px-10">
      <p>Por favor seleccione un hotel</p>
    </div>

    <v-date-picker
      v-else
      locale="es"
      v-model="range"
      mode="dateTime"
      is24hr
      is-range
      :update-on-input="false"
      :max-date="maxDate"
      color="gray"
      @input="onDateSelection"
      :min-date="minDate"
      :minute-increment="5"
    >
      <!-- @drag="onDateSelection" -->
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
import { computed, reactive, ref, watch } from "@nuxtjs/composition-api";
import { getDatesRange, sqlTimeStrToTimeObj } from "~/utils";

export default {
  props: {
    calendarLength: {
      type: Number,
      default: 90,
    },
    selectedHotel: {
      type: Object,
      default: () => ({
        id: 1,
        hotel_name: "Sloppy Joes Grand Hotel",
        maximun_free_calendar_days: 30,
        check_in_hour_time: "13:34:00",
        check_out_hour_time: "12:33:00",
        iana_time_zone: "America/Lima",
      }),
    },
  },

  setup(props, { emit }) {
    const { startDate: todayDate, endDate: todayPlus3 } = getDatesRange(3);

    const minDate = ref(todayDate);
    const maxDate = computed(() => {
      const { endDate: hotelLastDay } = getDatesRange(props.calendarLength);
      return hotelLastDay;
    });

    const range = reactive({
      start: "",
      end: "",
    });
    range.start = todayDate;
    range.end = todayPlus3;

    function onDateSelection(range) {
      emit("DATES_RANGE_SELECTED", {
        start: range.start,
        end: range.end,
      });
    }

    // on mounted propagate default
    emit("DATES_RANGE_SELECTED", {
      start: new Date(range.start),
      end: new Date(range.end),
    });

    // todo auto choose time
    // watch(props, (nProps) => {
    //   console.log("watcher hit", { nProps });

    //   if (nProps.selectedHotel) {
    //     const start_time = sqlTimeStrToTimeObj(
    //       props.selectedHotel.check_in_hour_time
    //     );
    //     const end_time = sqlTimeStrToTimeObj(
    //       props.selectedHotel.check_out_hour_time
    //     );

    //     range.start.setHours(start_time.hour, start_time.minute, 0);
    //     range.end.setHours(end_time.hour, end_time.minute, 0);

    //     console.log({
    //       start_time,
    //       end_time,
    //       range,
    //     });
    //   }
    // });
    return {
      range,
      minDate,
      maxDate,
      onDateSelection,
    };
  },
};
</script>

<style>
</style>