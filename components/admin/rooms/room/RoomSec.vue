<template>
  <div>
    <RoomSecHotelSelector
      @hotel_seleted="onHotelSelected"
      :selectedHotelId="selectedHotelId"
      :hotels="hotels"
      class="max-w-md"
    />
    <RoomSecCreateRoom :hotelId="selectedHotelId" class="mt-[50px]" />
    <RoomSecEditMenu class="mt-[50px]" :hotelId="selectedHotelId"/>
    <!-- refresh eps -->
    <!-- <button @click="loadRoomDependencies">reload</button> -->
  </div>
</template>

<script>
import { onMounted, ref } from "@nuxtjs/composition-api";
import { useLoadRoomDeps } from "~/composables/useLoadRoomDeps";
import RoomSecCreateRoom from "./RoomSecCreateRoom.vue";
import RoomSecHotelSelector from "./RoomSecHotelSelector.vue";
import { wait } from "~/utils";
import RoomSecEditMenu from "./RoomSecEditMenu.vue";
export default {
  components: { RoomSecCreateRoom, RoomSecHotelSelector, RoomSecEditMenu },
  setup() {
    const {
      roomTypes,
      amenities,
      hotels,
      loadRoomDependencies,
      isLoadingDeps,
    } = useLoadRoomDeps();

    const selectedHotelId = ref(null);

    function onHotelSelected({ id }) {
      selectedHotelId.value = +id;
    }

    async function selectFirst() {
      // let fetch happen
      await wait(1);
      if (isLoadingDeps.value) {
        return selectFirst();
      }

      const firstHotel = hotels.value.length ? hotels.value[0] : null;
      if (!firstHotel) {
        return;
      }
      selectedHotelId.value = firstHotel.id;
    }

    function mountSec() {
      if (!process.client) {
        return;
      }

      selectFirst();
    }

    onMounted(mountSec);

    return {
      loadRoomDependencies,
      isLoadingDeps,
      onHotelSelected,
      hotels,
      roomTypes,
      amenities,
      selectedHotelId,
    };
  },
};
</script>

<style>
</style>