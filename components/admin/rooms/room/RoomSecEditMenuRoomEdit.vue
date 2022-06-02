<template>
  <div>
    <SubHeading text="Información de la habitación" />

    <div class="mt-[30px]">
      <!-- room name -->
      <UpdateName :room="room" />
      <!-- price -->

      <!-- capacity -->

      <!-- number of beds -->
    </div>
  </div>
</template>

<script>
import SubHeading from "../../global/SubHeading.vue";
import UpdateName from "./update_room/UpdateName.vue";
export default {
  components: { UpdateName, SubHeading },
  props: {
    room: {
      type: Object,
      default: () => ({
        id: 0,
      }),
    },
  },

  setup(props){



      return{

      }
  }
};
</script>

<style>
</style>