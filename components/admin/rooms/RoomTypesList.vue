<template>
  <div>
    <ul v-if="roomTypes.length">
      <li v-for="rt in roomTypes" :key="rt.id">
        <RoomTypeListItem :roomType="rt" />
      </li>
    </ul>
    <!-- no roomTypes or loading -->

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
        <p>Todavía no hay tipos de habitación .</p>
        <p>Cree uno para empezar.</p>
      </div>
    </div>
  </div>
</template>

<script>
import RoomTypeListItem from "./RoomTypeListItem.vue";
export default {
  components: { RoomTypeListItem },
  props: {
    roomTypes: {
      type: Array,
      default: () => [
        {
          id: 0,
          room_type: "Type",
        },
      ],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>