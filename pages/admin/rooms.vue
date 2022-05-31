<template>
  <div class="frame-30">
    <RoomsSec />
  </div>
</template>

<script>
import RoomsSec from "~/components/admin/rooms/RoomsSec.vue";

export default {
  layout: "admin",
  middleware: "admin",
  components: { RoomsSec },
};
</script>

<style>
</style>