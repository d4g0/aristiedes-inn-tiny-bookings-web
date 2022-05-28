<template>
  <div>
    <!-- heading & btn -->
    <div class="">
      <SubHeading text="Seleccione el hotel a administrar" />
      <SelectCurrentHotelForm  class="max-w-md"/>
    </div>
  </div>
</template>

<script>
import SubHeading from "../../global/SubHeading.vue";
import SelectCurrentHotelForm from './SelectCurrentHotelForm.vue';
export default {
  components: { SubHeading, SelectCurrentHotelForm },
};
</script>

<style>
</style>