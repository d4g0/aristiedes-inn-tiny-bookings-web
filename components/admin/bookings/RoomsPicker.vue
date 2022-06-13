<template>
  <div>
    
  </div>
</template>

<script>
import SubmitBtn from "../global/SubmitBtn.vue";
export default {
  components: { SubmitBtn },
  props: {
    calendarLength: {
      type: Number,
      default: 90,
    },
    loadingRooms: {
      type: Boolean,
      default: false,
    },
  },

  setup() {},
};
</script>

<style>
</style>