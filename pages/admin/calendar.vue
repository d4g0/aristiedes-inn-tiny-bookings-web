<template>
  <div class="frame-30">
    <CalendarSec />
  </div>
</template>

<script>
import CalendarSec from "~/components/admin/calendar/CalendarSec.vue";
export default {
  layout: "admin",
  middleware: "admin",
  components: { CalendarSec },
};
</script>

<style>
</style>