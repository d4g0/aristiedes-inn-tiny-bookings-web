<template>
  <div class="frame-30 pb-4">
    <MainHeading text="Hoteles" class="mt-10" />
    <CreateHotelSection class="mt-[50px]" />
    <EditHotelSection class="mt-[50px]"/>
  </div>
</template>

<script>
import MainHeading from "~/components/admin/global/MainHeading.vue";
import CreateHotelSection from "~/components/admin/hotels/create_hotel_sec/CreateHotelSection.vue";
import EditHotelSection from '~/components/admin/hotels/edit_hotels_sec/EditHotelSection.vue';

export default {
  layout: "admin",
  middleware: ['isFullAdmin'],
  components: {
    // dev only
    //
    MainHeading,
    CreateHotelSection,
    EditHotelSection,
  },
};
</script>

<style>
</style>