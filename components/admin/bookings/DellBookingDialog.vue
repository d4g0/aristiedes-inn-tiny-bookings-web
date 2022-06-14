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
        <MainHeading text="Cancelar la reservación" />
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
          @click="closeDialog"
        >
          <XIcon />
          <span class="sr-only"> Cerrar </span>
        </button>
      </div>

      <!-- hotel edit dell -->
      <div class="mt-[50px]">
        <!-- <span class="block font-bold">
          {{ room_type_str }}
        </span> -->
        <p class="mt-4">
          Esta acción es irrecuperable, está completamente seguro que quiere
          eliminarlo ?
        </p>
      </div>

      <div class="mt-[30px] flex items-center justify-between space-x-4">
        <!-- cancel -->
        <button
          @click="closeDialog"
          class="
            rounded-[16px]
            w-full
            p-3
            hover:bg-gray-200
            focus-styles focus:ring-offset-2
          "
        >
          No
        </button>

        <!-- eliminate -->
        <div class="relative w-full border">
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
            Cancelar
          </button>

          <!-- spinner -->
          <transition name="fade">
            <div
              v-if="isLoading"
              class="
                absolute
                top-0
                left-0
                w-full
                h-full
                flex
                justify-start
                items-center
                pl-4
              "
            >
              <div
                class="
                  spinner-border
                  animate-spin
                  inline-block
                  w-8
                  h-8
                  border-4
                  rounded-full
                "
                role="status"
              >
                <span class="sr-only">Cargando</span>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XIcon from "~/components/icons/XIcon.vue";
import { computed, inject } from "@nuxtjs/composition-api";
import { smartQueryLoader } from "~/composables/smartQueryLoader";
import { gencancelABooking } from "~/querys/cancelBooking";
import { useToastStore } from "~/stores/toast-storage";
import { API_ERRORS, TOAST_TYPES } from "~/db";
import MainHeading from "../global/MainHeading.vue";
const UNAUTHENTICATED = API_ERRORS.UNAUTHENTICATED;
const FORBIDDEN = API_ERRORS.FORBIDDEN;

export default {
  components: {
    XIcon,
    MainHeading,
  },
  props: {
    bookingId: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const loadBookings = inject("loadBookings");
    const room_type_str = computed(() => props.selectedRoomType.room_type);
    //
    const closeCancelDialog = inject("closeCancelDialog");
    function closeDialog() {
      closeCancelDialog();
    }
    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;

    // api
    const {
      load: fetchCanceling,
      loading: isLoading,
      setQuery,
    } = smartQueryLoader(
      "",
      (_result) => {
        console.log(_result);
        loadBookings();
        closeCancelDialog();
        showToastWithText(TOAST_TYPES.success, "Reservación cancelada", true);
      },
      "cancelBooking"
    );

    function executeCancelation() {
      const query = gencancelABooking(props.bookingId);
      setQuery(query);
      fetchCanceling();
    }

    function onDellReq() {
      executeCancelation();
    }

    return {
      closeDialog,
      onDellReq,
      room_type_str,
      //
      isLoading,
    };
  },
};
</script>

<style>
</style>