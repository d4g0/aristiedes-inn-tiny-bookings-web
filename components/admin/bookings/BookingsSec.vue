<template>
  <div>
    <MainHeading text="Reservaciones" class="mt-10" />
    
    <!-- hotel selector -->
    <HotelSelector class="mt-[50px]"/>
    <!-- create -->
    <CreateBooking class="mt-[50px]" />
    <!-- list -->
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import MainHeading from "../global/MainHeading.vue";
import CreateBooking from "./CreateBooking.vue";
import HotelSelector from '../global/HotelSelector.vue';
export default {
  components: {
    MainHeading,
    CreateBooking,
    HotelSelector,
  },

  
};
</script>

<style>
</style>