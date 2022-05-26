<template>
  <div>
    <SubHeading text="Crear un hotel" />
    <div class="w-full max-w-md ">
    <CreateHotelForm :isSending="isLoading"/>
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