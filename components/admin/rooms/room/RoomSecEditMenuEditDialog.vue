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
        <RoomSecEditMenuRoomTypeSelector :room="room"/>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "@nuxtjs/composition-api";
import MainHeading from "../../global/MainHeading.vue";
import XIcon from "~/components/icons/XIcon.vue";
import RoomSecEditMenuRoomTypeSelector from "./RoomSecEditMenuRoomTypeSelector.vue";
export default {
  components: {
    MainHeading,
    XIcon,
    RoomSecEditMenuRoomTypeSelector,
  },
  props: {
    room: {
      type: Object,
      default: () => ({
        id: 0,
        room_name: "Supper Nice Room",
        room_type_id: 0,
        room_type_key: "Room Type",
      }),
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