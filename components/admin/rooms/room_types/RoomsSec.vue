<template>
  <div>
    <MainHeading text="Habitaciones" class="mt-10" />
    <RoomTypesSec class="mt-[100px]"/>
    <!-- <AmenitiesSec/> -->
  </div>
</template>

<script>
import MainHeading from "~/components/admin/global/MainHeading.vue";
import RoomTypesSec from "~/components/admin/rooms/room_types/RoomTypesSec.vue";

var figmaTable = `
Resources
    Rooms
    Rooms Types
    Amenities
Operations
Rooms
    Create a room
    Delete a Room
    Edit a Room
Rooms Types
    Create RoomType
    Delete RoomType
    Edit RoomType
Amenities
    CreateRoomAmenity
    Edit RoomAMenity
    Delete RoomAmenity

`;
export default {
  components: {
    MainHeading,
    RoomTypesSec,
  },
};
</script>

<style>
</style>