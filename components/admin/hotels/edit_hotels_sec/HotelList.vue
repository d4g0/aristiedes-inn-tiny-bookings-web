<template>
  <div class="w-full">
    <ul v-if="hotels.length" class="space-y-[20px]">
      <li v-for="hotel in hotels" :key="hotel.id">
        <HotelListItem
          :hotel="hotel"
          @[EDIT_HOTEL]="onEditReq"
          @[DELETE_HOTEL]="onDelReq"
        />
      </li>
    </ul>

    <!-- empty or loading msg -->
    <div
      v-else
      class="
        flex flex-col
        items-center
        justify-center
        opacity-60
        text-xl
        font-medium
        text-center
        py-[50px]
      "
    >
      <div v-if="isLoading">
        <p class="animate-pulse">Cargando</p>
      </div>

      <div v-else>
        <p>Todavía no hay hoteles que editar.</p>
        <p>Cree uno para empezar.</p>
      </div>
    </div>
  </div>
</template>

<script>
import HotelListItem from "./HotelListItem.vue";
import { EVENTS } from "~/db";
const EDIT_HOTEL = EVENTS.ADMIN.HOTELS.EDIT_HOTELS.LIST.EDIT_HOTEL;
const DELETE_HOTEL = EVENTS.ADMIN.HOTELS.EDIT_HOTELS.LIST.DELETE_HOTEL;

export default {
  components: { HotelListItem },
  props: {
    hotels: {
      type: Array,
      default: () => [{ id: 0 }],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    function onEditReq({ id }) {
      emit(EDIT_HOTEL, { id });
    }
    function onDelReq({ id }) {
      emit(DELETE_HOTEL, { id });
    }

    return {
      EDIT_HOTEL,
      DELETE_HOTEL,
      onEditReq,
      onDelReq,
    };
  },
};
</script>

<style>
</style>