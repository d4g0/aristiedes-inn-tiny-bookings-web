<template>
  <div>
    <SubHeading text="Crear un hotel" />
    <div class="w-full max-w-md">
      <!-- create hotel -->
      <div>
        <CreateHotelForm :isSending="isLoading" />
        <div class="border border-b-gray-200 mt-[50px]"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@nuxtjs/composition-api";
import SubHeading from "~/components/admin/global/SubHeading.vue";
import CreateHotelForm from "./CreateHotelForm.vue";
export default {
  components: { SubHeading, CreateHotelForm },
  setup() {
    const isLoading = ref(false);
    return {
      isLoading,
    };
  },
};
</script>

<style>
</style>