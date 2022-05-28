<template>
  <div class="frame-30">
    <MainHeading text="Hoteles" class="mt-10" />
    <CreateHotelSection class="mt-[50px]"/>

    <EditHotelSection class="mt-[50px]" />

    <AuthData class="mt-[750px]" />
  </div>
</template>

<script>
import MainHeading from "~/components/admin/global/MainHeading.vue";
import CreateHotelSection from "~/components/admin/hotels/create_hotel_sec/CreateHotelSection.vue";
import EditHotelSection from "~/components/admin/hotels/edit_hotels_sec/EditHotelSection.vue";

import AuthData from "~/components/test/AuthData.vue";
export default {
  layout: "admin",
  components: {
    // dev only
    AuthData,
    //
    MainHeading,
    CreateHotelSection,
    EditHotelSection,
  },

  setup(props, { emit }) {},
};
</script>

<style>
</style>