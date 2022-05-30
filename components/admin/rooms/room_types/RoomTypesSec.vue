<template>
  <div>
    <sub-heading text="Tipos de habitación" />
    <!-- [create] -->
    <RoomTypeCreateSec class="mt-[50px]" />

    <!-- [list / edit / dell]  |-> loadRoomTypes()  loading-->
    <RoomTypesList class="mt-[50px]" />
  </div>
</template>

<script>
import SubHeading from "~/components/admin/global/SubHeading.vue";
import RoomTypeCreateSec from "./RoomTypeCreateSec.vue";
import RoomTypesList from "~/components/admin/rooms/room_types/RoomTypesList.vue";
export default {
  components: {
    SubHeading,
    RoomTypeCreateSec,
    RoomTypesList,
    SubHeading,
  },
  setup(props) {},
};
</script>

<style>
</style>