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
        <MainHeading text="Edite la habitación" class="max-w-[80%]" />
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
          @click="hideEditDialog"
        >
          <XIcon />
          <span class="sr-only"> Cerrar </span>
        </button>
      </div>

      <!-- edit  form -->
      <div class="mt-[50px]">
        <!-- <AmenitiesSecListEditDialogForm
          :actualRoomAmenityStr="room_amenity_str"
          :isSending="loading"
          @editReq="onEditReq"
        /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from '@nuxtjs/composition-api';
import MainHeading from '../../global/MainHeading.vue';
import XIcon from '~/components/icons/XIcon.vue';
export default {
  components: { MainHeading, XIcon },
  props: {
    selectedRoomId: {
      type: Number,
      default: 0,
    },
  },

  setup() {
    const hideEditDialog = inject("hideEditDialog");
    return {
      hideEditDialog,
    };
  },
};
</script>

<style>
</style>