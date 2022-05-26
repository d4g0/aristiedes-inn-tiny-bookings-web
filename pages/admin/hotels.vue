<template>
  <div class="frame-30">
    <MainHeading text="Hoteles" class="mt-10" />
    <CreateHotelSection class="mt-[50px]" />
  </div>
</template>

<script>
import MainHeading from "~/components/admin/global/MainHeading.vue";
import CreateHotelSection from "~/components/admin/hotels/create_hotel_sec/CreateHotelSection.vue";

export default {
  layout: "admin",
  middleware: ['isFullAdmin'],
  components: {
    // dev only
    //
    MainHeading,
    CreateHotelSection,
  },
};
</script>

<style>
</style>