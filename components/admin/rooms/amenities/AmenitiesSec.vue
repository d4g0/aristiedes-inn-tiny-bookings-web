<template>
  <div>
    <SubHeading text="Amenidades" class="mt-[100px]" />

    <!-- [create amenity] -->
    <AmenitiesSecCreate class="mt-[50px]" />

    <!-- [ amenity list (edit & remove)] -->
    <AmenitiesSecList class="mt-[50px]" />
  </div>
</template>

<script>
import SubHeading from "../../global/SubHeading.vue";
import AmenitiesSecCreate from "./AmenitiesSecCreate.vue";
import AmenitiesSecList from "./AmenitiesSecList.vue";
export default {
  components: { SubHeading, AmenitiesSecCreate, AmenitiesSecList },
};
</script>

<style>
</style>