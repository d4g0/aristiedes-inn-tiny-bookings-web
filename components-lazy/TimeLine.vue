<template>
  <div id="timeline">
    <calendar-view
      :show-date="showDate"
      :startingDayOfWeek="1"
      :periodChangedCallback="onPeriodChange"
      :items="timeLineItems"
      class="theme-default holiday-us-traditional holiday-us-official"
      @click-item="onCalItemClick"
    >
      <template #header="{ headerProps }">
        <calendar-view-header
          :header-props="headerProps"
          @input="setShowDate"
        />
      </template>
    </calendar-view>
  </div>
</template>
<script>
import { computed, ref } from "@nuxtjs/composition-api";
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
import "~/node_modules/vue-simple-calendar/static/css/default.css";
import { sqlDateUTCToTimeZone } from "~/utils";

function toCalendarItem(roomLock, tz = "UTC") {
  const title = roomLock.is_a_booking
    ? `Reserva #${roomLock.booking_id}`
    : "Bloqueada";
  const startDate = sqlDateUTCToTimeZone(roomLock.start_date, tz);
  const endDate = sqlDateUTCToTimeZone(roomLock.end_date, tz);
  return {
    ...roomLock,
    title,
    startDate,
    endDate,
    // classes: "text-xl bg-red-500",
  };
}

export default {
  components: {
    CalendarView,
    CalendarViewHeader,
  },
  props: {
    roomLocks: {
      type: Array,
      default: () => [
        {
          id: 77,
          room_id: 11,
          start_date: "2022-05-12 10:00:00",
          end_date: "2022-05-13 00:00:00",
          reason: "Painting",
          is_a_booking: false,
          booking_id: null,
        },
      ],
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
  setup(props, {emit}) {
    const showDate = ref(new Date());

    function setShowDate(d) {
      showDate.value = d;
    }

    const timeLineItems = computed(() =>
      props.roomLocks.map((rl) =>
        toCalendarItem(rl, props.selectedHotel.iana_time_zone)
      )
    );

    function onPeriodChange(payload) {
      emit('period_change', payload);
      // console.log({
      //   PeriodChangePayload: payload,
      // });
    }

    function onCalItemClick(payload) {
      console.log({ calItemPayload: payload });
    }

    return {
      showDate,
      setShowDate,
      onPeriodChange,
      timeLineItems,
      onCalItemClick,
    };
  },
};
</script>
<style scoped>
#timeline {
  color: #2c3e50;
  height: 100%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

div[title="Bloqueo"] {
  background-color: red;
}
</style>