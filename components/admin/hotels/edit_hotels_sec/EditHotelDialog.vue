<template>
  <div
    class="
      fixed
      z-10
      inset-0
      w-full
      h-full
      bg-white/90
      backdrop-blur-md
      overflow-auto
    "
  >
    <div
      class="
        w-full
        max-w-xl
        mx-auto
        p-[30px]
        mt-20
        bg-white
        border border-gray-500
        rounded-[16px]
      "
    >
      <!-- h1 & close btn -->
      <div class="flex items-center justify-between">
        <MainHeading text="Edite el hotel" />
        <button
          class="
            rounded-full
            p-2
            focus-styles
            -translate-x-2
            hover:bg-gray-300
            dark:hover:bg-gray-600
            text-type-on-light
            dark:text-type-on-dark
          "
          @click="$emit('hideEditDialog')"
        >
          <XIcon />
          <span class="sr-only"> Cerrar </span>
        </button>
      </div>

      <!-- hotel edit checkin form -->
      <div class="mt-[50px]">
        <EditHotelDialogCheckInForm :selectedHotelId="selectedHotelId" />
      </div>
    </div>
  </div>
</template>

<script>
import XIcon from "~/components/icons/XIcon.vue";
import SubHeading from "../../global/SubHeading.vue";
import MainHeading from "../../global/MainHeading.vue";
import EditHotelDialogCheckInForm from "./EditHotelDialogCheckInForm.vue";
import { provide } from "@nuxtjs/composition-api";

export default {
  components: { XIcon, SubHeading, MainHeading, EditHotelDialogCheckInForm },
  props: {
    selectedHotelId: {
      type: Number,
    },
  },

  setup(props, { emit }) {
    function closeDialog() {
      emit("hideEditDialog");
    }
    provide("closeDialog", closeDialog);

    return {};
  },
};
</script>

<style>
</style>