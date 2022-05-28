<template>
  <div class="h-full border-2 border-gray-400 p-[20px] sm:p-[30px] rounded-[16px]">
    <!-- core -->
    <div class="h-full flex items-center justify-between">
      <!-- name -->
      <div class="max-w-[130px]">
        <h3 class="font-bold">
          {{ hotel.hotel_name }}
        </h3>
      </div>

      <!-- actions -->
      <div class="flex gap-x-5">
        <button
          class="opacity-70 focus:opacity-100 focus-styles"
          @click="editReq"
        >
          <span class="border-b border-gray-400"> Editar </span>
        </button>
        <button
          class="opacity-70 focus:opacity-100 focus-styles"
          @click="delReq"
        >
          <span class="border-b border-gray-400"> Eliminar </span>
        </button>
      </div>
    </div>

    <!-- <pre>
<code>
hotel: {{ hotel }}
</code>
    </pre> -->
  </div>
</template>

<script>
import { EVENTS } from "~/db";

const EDIT_HOTEL = EVENTS.ADMIN.HOTELS.EDIT_HOTELS.LIST.EDIT_HOTEL;
const DELETE_HOTEL = EVENTS.ADMIN.HOTELS.EDIT_HOTELS.LIST.DELETE_HOTEL;

export default {
  props: {
    hotel: {
      type: Object,
      default: () => ({
        id: 1,
        hotel_name: "Sloppy Joes Grand Hotel",
        maximun_free_calendar_days: 30,
        check_in_hour_time: "13:30:00",
        check_out_hour_time: "12:00:00",
        iana_time_zone: "America/Lima",
      }),
    },
  },

  setup(props, { emit }) {
    function editReq() {
      emit(EDIT_HOTEL, { id: props.hotel.id });
    }

    function delReq() {
      emit(DELETE_HOTEL, { id: props.hotel.id });
    }

    return {
      editReq,
      delReq,
    };
  },
};
</script>

<style>
</style>