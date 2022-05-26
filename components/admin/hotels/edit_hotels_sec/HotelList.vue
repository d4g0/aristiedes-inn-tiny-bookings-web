<template>
  <div class="w-full">
    <ul v-if="hotels.length" class="space-y-[20px]">
      <li v-for="hotel in hotels" :key="hotel.id">
        <hotel-list-item :hotel="hotel" />
      </li>
    </ul>

    <!-- empty msg -->
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
  setup() {},
};
</script>

<style>
</style>