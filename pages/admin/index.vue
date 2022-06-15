<template>
  <div class="frame-30 mb-20">
    <BookingsSec />
  </div>
</template>

<script>
import BookingsSec from "~/components/admin/bookings/BookingsSec.vue";
export default {
  layout: "admin",
  middleware: "admin",
  components: {
    BookingsSec,
  },
};
</script>

<style>
</style>