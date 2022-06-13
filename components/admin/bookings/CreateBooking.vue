<template>
  <div>
    <SubHeading text="Nueva reservación" />

    <!-- date range -->

    <CreateBookingDateSelector />

    <!-- rooms -->

    <!-- client -->

    <!-- price -->
  </div>
</template>

<script>
import { ref } from "@nuxtjs/composition-api";
import SubHeading from "../global/SubHeading.vue";
import CreateBookingDateSelector from './CreateBookingDateSelector.vue';
export default {
  components: { SubHeading, CreateBookingDateSelector },

  setup(props, ctx) {
    const start_date = ref("");
    const end_date = ref();

    return {};
  },
};
</script>

<style>
</style>