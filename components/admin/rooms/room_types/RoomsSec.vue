<template>
  <div>
    <MainHeading text="Habitaciones" class="mt-10" />
    <RoomTypesSec />
    <AmenitiesSec class="mt-[50px]" />
  </div>
</template>

<script>
import MainHeading from "~/components/admin/global/MainHeading.vue";
import RoomTypesSec from "~/components/admin/rooms/room_types/RoomTypesSec.vue";
import AmenitiesSec from "~/components/admin/rooms/amenities/AmenitiesSec.vue";

export default {
  components: {
    RoomTypesSec,
    AmenitiesSec,
    MainHeading,
  },

  setup() {
    return {};
  },
};
</script>

<style>
</style>



















