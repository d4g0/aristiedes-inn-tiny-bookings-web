<template>
  <div
    class=""
  >
    <div class="w-full flex items-center justify-between gap-2">
      <div>
        <p class="font-medium">Desde</p>
        <DateTimePickerSimple
          :initialDate="start_date"
          class="mt-2"
          @DATES_SELECTED="onStartDateSelection"
        />
      </div>

      <div>
        <div class="flex justify-end items-center">
          <p class="font-medium">Hasta</p>
        </div>
        <DateTimePickerSimple
          :initialDate="end_date"
          class="mt-2"
          inputClasses="text-right"
          @DATES_SELECTED="onEndDateSelection"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@nuxtjs/composition-api";
import {
  getDatesRange_2,
  toTimeZoneKeepenLocal_2,
} from "~/utils";
import DateTimePickerSimple from "../../global/DateTimePickerSimple.vue";
export default {
  components: { DateTimePickerSimple },
  props: {
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
    const { startDate, endDate } = getDatesRange_2(-15, 15);

    const start_date = ref(startDate);
    const end_date = ref(endDate);

    const utc_start_date = computed(() =>
      toTimeZoneKeepenLocal_2(start_date.value, "UTC").toISO()
    );

    const utc_end_date = computed(() =>
      toTimeZoneKeepenLocal_2(end_date.value, "UTC").toISO()
    );

    function onStartDateSelection({ date }) {
      start_date.value = date;
      emit("start_date_update", { date: start_date.value });
    }

    function onEndDateSelection({ date }) {
      end_date.value = date;
      emit("end_date_update", { date: end_date.value });
    }

    onMounted(async () => {
      // give a little delay to trigger initial load
      // await wait(1);
      emit("start_date_update", { date: start_date.value });
      emit("end_date_update", { date: end_date.value });
    });

    return {
      start_date,
      end_date,
      utc_start_date,
      utc_end_date,
      onStartDateSelection,
      onEndDateSelection,
    };
  },
};
</script>

<style>
</style>