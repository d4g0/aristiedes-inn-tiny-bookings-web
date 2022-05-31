<template>
  <div class="frame-30">
    <RoomsSec />
    <AuthData class="mt-[750px]" />
  </div>
</template>

<script>
// import MainHeading from "~/components/admin/global/MainHeading.vue";
import RoomsSec from "~/components/admin/rooms/RoomsSec.vue";
import AuthData from "~/components/test/AuthData.vue";
import { onMounted } from '@nuxtjs/composition-api';
export default {
  layout: "admin",
  components: {
    // dev only
    AuthData,
    // MainHeading,
    RoomsSec,
    //
  },

  setup(props, { emit }) {

    onMounted(()=>{

    })
  },
};
</script>

<style>
</style>