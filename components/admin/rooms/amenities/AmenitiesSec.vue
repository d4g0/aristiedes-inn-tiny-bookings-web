<template>
  <div>
    <SubHeading text="Amenidades" class="mt-[100px]" />

    <!-- [create amenity] -->
    <AmenitiesSecCreate class="mt-[50px]" />

    <!-- [ amenity list edit @ remove] -->
  </div>
</template>

<script>
import SubHeading from "../../global/SubHeading.vue";
import AmenitiesSecCreate from "./AmenitiesSecCreate.vue";
export default {
  components: { SubHeading, AmenitiesSecCreate },
};
</script>

<style>
</style>