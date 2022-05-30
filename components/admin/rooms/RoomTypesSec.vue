<template>
  <div>
    <SubHeading text="Tipos de habitación" />
    <!-- [create] -->
    <RoomTypeCreateSec class="mt-[50px]" />

    <!-- [list / edit / dell]  |-> loadRoomTypes()  loading-->
    <RoomTypesList class="mt-[50px]"/>
  </div>
</template>

<script>
import SubHeading from "../global/SubHeading.vue";
import RoomTypeCreateSec from "./RoomTypeCreateSec.vue";
import RoomTypesList from './RoomTypesList.vue';
export default {
  components: {
    SubHeading,
    RoomTypeCreateSec,
    RoomTypesList,
  },
  setup(props) {},
};
</script>

<style>
</style>