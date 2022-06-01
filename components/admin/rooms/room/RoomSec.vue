<template>
  <div>
    <RoomSecHotelSelector
      @hotel_seleted="onHotelSelected"
      :selectedHotelId="selectedHotelId"
      :hotels="hotels"
      class="max-w-md"
    />
    <RoomSecCreateRoom :hotel="selectedHotel" />
    <button @click="loadRoomDependencies">reload</button>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@nuxtjs/composition-api";
import { useLoadRoomDeps } from "~/composables/useLoadRoomDeps";
import RoomSecCreateRoom from "./RoomSecCreateRoom.vue";
import RoomSecHotelSelector from "./RoomSecHotelSelector.vue";
import { useHotelListStore } from "~/stores/hotel-list-storage";
import { wait } from "~/utils";
export default {
  components: { RoomSecCreateRoom, RoomSecHotelSelector },
  setup() {
    const {
      roomTypes,
      amenities,
      hotels,
      loadRoomDependencies,
      isLoadingDeps,
    } = useLoadRoomDeps();

    const hotelStore = useHotelListStore();
    const { getHotelById } = hotelStore;

    const selectedHotelId = ref(null);
    const selectedHotel = computed(() => getHotelById(selectedHotelId));

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
      selectedHotel,
      selectedHotelId,
    };
  },
};
</script>

<style>
</style>