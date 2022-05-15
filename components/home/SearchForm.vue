<template>
  <div class="">
    <div class="">
      <DatePicker />
      <div class="mt-4">
        <button
          class="rounded-[16px] p-3 bg-black text-white w-full font-medium"
        >
          Search
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "../date-input/DatePicker.vue";
export default {
  components: { DatePicker },
  setup() {
    
  },
};
</script>

<style>
</style>