<template>
  <div>
    <SubHeading text="Nueva reservación" />

    <!-- date range -->

    <DateTimePicker
      :calendarLength="calendarLength"
      class="mt-[30px]"
      @DATES_RANGE_SELECTED="onDateRangeSelection"
      :selectedHotel="selectedHotel"
    />
    <!-- -->
    <!-- rooms -->

    <!-- client -->

    <!-- price -->
  </div>
</template>

<script>
import { computed, ref } from "@nuxtjs/composition-api";
import SubHeading from "../global/SubHeading.vue";
import DateTimePicker from "~/components/admin/global/DateTimePicker.vue";
export default {
  components: {
    SubHeading,
    DateTimePicker,
  },
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

  setup(props, ctx) {
    const start_date = ref("");
    const end_date = ref();

    const calendarLength = computed(() =>
      props.selectedHotel ? props.selectedHotel.maximun_free_calendar_days : 90
    );

    function onDateRangeSelection({ start, end }) {
      if (!process.client) {
        return;
      }
      console.log({ start, end });
    }

    return {
      calendarLength,
      onDateRangeSelection,
    };
  },
};
</script>

<style>
</style>