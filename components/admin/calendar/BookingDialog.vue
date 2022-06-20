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
        <MainHeading text="Detalles de la reserva" />
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
      <div v-if="bookingLoaded" class="mt-[30px]">
        <BookingsListItem :booking="booking" :cancelOption="false" :showRooms="false"/>
      </div>
    </div>
  </div>
</template>

<script>
import XIcon from "~/components/icons/XIcon.vue";
import { inject, onMounted, ref } from "@nuxtjs/composition-api";
import { useToastStore } from "~/stores/toast-storage";
import MainHeading from "~/components/admin/global/MainHeading.vue";
import { smartQueryLoader } from "~/composables/smartQueryLoader";
import { genBookingQuery } from "~/querys/booking";
import BookingsListItem from "../bookings/BookingsListItem.vue";

export default {
  components: {
    XIcon,
    MainHeading,
    BookingsListItem,
  },
  props: {
    bookingId: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const booking = ref();
    const bookingLoaded = ref(false);
    //
    const closeBookingDialog = inject("closeBookingDialog");
    function closeDialog() {
      closeBookingDialog();
    }

    // api
    const {
      load: fetchBooking,
      loading: isLoading,
      setQuery,
    } = smartQueryLoader(
      "",
      (_b) => {
        booking.value = _b;
        bookingLoaded.value = true;
      },
      "getBooking"
    );

    function triggerBookingFetch() {
      const query = genBookingQuery(props.bookingId);
      setQuery(query);
      fetchBooking();
    }

    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;

    onMounted(mountSec);

    function mountSec() {
      console.log({ bi: props.bookingId });
      if (!process.client) {
        return;
      }
      return triggerBookingFetch();
    }

    return {
      closeDialog,
      //   room_type_str,
      //
      isLoading,
      booking,
      bookingLoaded,
    };
  },
};
</script>

<style>
</style>