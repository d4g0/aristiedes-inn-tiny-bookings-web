<template>
  <div>
    <MainHeading text="Habitaciones" class="mt-10" />
    <RoomSec class="mt-[50px]" />
    <RoomTypesSec />
    <AmenitiesSec class="mt-[50px]" />
  </div>
</template>

<script>
import MainHeading from "~/components/admin/global/MainHeading.vue";
import RoomTypesSec from "~/components/admin/rooms/room_types/RoomTypesSec.vue";
import AmenitiesSec from "~/components/admin/rooms/amenities/AmenitiesSec.vue";
import RoomSec from "~/components/admin/rooms/room/RoomSec.vue";
export default {
  components: {
    RoomTypesSec,
    AmenitiesSec,
    MainHeading,
    RoomSec,
  },

  setup() {
    return {};
  },
};
</script>

<style>
</style>



















