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
        <MainHeading text="Elimine la habitación" />
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
          @click="hideDelDialog"
        >
          <XIcon />
          <span class="sr-only"> Cerrar </span>
        </button>
      </div>

      <!-- hotel edit dell -->
      <div class="mt-[50px]">
        <span class="block font-bold">
          {{ roomName }}
        </span>
        <p class="mt-4">
          Esta acción es irrecuperable, está completamente seguro que quiere
          eliminarlo ?
        </p>
      </div>

      <div class="mt-[30px] flex items-center justify-between space-x-4">
        <!-- cancel -->
        <button
          @click="hideDelDialog"
          class="
            rounded-[16px]
            w-full
            p-3
            hover:bg-gray-200
            focus-styles focus:ring-offset-2
          "
        >
          Cancelar
        </button>

        <!-- eliminate -->
        <button
          @click="onDellReq"
          class="
            rounded-[16px]
            w-full
            p-3
            bg-red-500
            dark:bg-red-500
            text-white
            dark:text-white
            font-medium
            focus-styles focus:ring-offset-2
            hover:bg-red-600
            dark:hover:bg-red-600 dark:hover:text-white
            disabled:bg-red-500/60 disabled:cursor-not-allowed
          "
          :disabled="isLoading"
          :class="{
            'opacity-70': isLoading,
          }"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref } from "@nuxtjs/composition-api";
import XIcon from '~/components/icons/XIcon.vue';
import MainHeading from '../../global/MainHeading.vue';
export default {
  components: { XIcon, MainHeading },
  props: {
    roomName: {
      type: String,
      default: "Room Name",
    },
  },
  setup() {
    const hideDelDialog = inject("hideDelDialog");
    const loadRooms = inject("loadRooms");

    const isLoading = ref(false);
    function onDellReq() {
      //   fetchDellRoomType();
    }

    return {
      hideDelDialog,
      onDellReq,
      //
      isLoading,
    };
  },
};
</script>

<style>
</style>