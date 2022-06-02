<template>
  <div>
    <SubHeading text="Información de la habitación" />

    <div class="mt-[50px]">
      <!-- room name -->
      <UpdateName :room="room" />
      <!-- price -->
      <UpdatePrice :room="room" class="mt-[50px]" />

      <!-- capacity -->

      <!-- number of beds -->
    </div>
  </div>
</template>

<script>
import SubHeading from "../../global/SubHeading.vue";
import UpdateName from "./update_room/UpdateName.vue";
import UpdatePrice from "./update_room/UpdatePrice.vue";
export default {
  components: { UpdateName, SubHeading, UpdatePrice },
  props: {
    room: {
      type: Object,
      default: () => ({
        id: 0,
      }),
    },
  },

  setup(props) {
    return {};
  },
};
</script>

<style>
</style>