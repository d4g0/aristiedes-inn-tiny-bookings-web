<template>
  <div class="pb-20">
    <MainHeading text="Calendario" class="mt-10" />
    <!-- hotel selector -->
    <HotelSelector class="mt-[50px] max-w-md" />

    <div v-if="hotels.length">
      <!-- rooms load btn -->
      <div class="mt-[30px] max-w-md">
        <SubmitBtnSecondary
          @btn_click="triggerRoomsLoad"
          submitText="Cargar habitaciones"
          :isSending="loadingRooms"
        />

        <div v-if="rooms.length" class="mt-4 pl-2">
          <p>
            <span> &bull; </span>
            <span> Habitaciones cargadas </span>
          </p>
        </div>
      </div>

      <!-- calendar & room locks -->
      <div v-if="rooms.length">
        <Calendar
          class="mt-[150px]"
          :selectedHotel="selectedHotel"
          :rooms="rooms"
          @time_line_element_click="onTimeLineElClick"
        />

        <LockARoom class="mt-[150px]" :rooms="rooms" />
      </div>
      <div v-else class="py-[40px] flex items-center justify-center">
        <p class="font-bold text-lg opacity-60 text-center">
          Debe cargar las habitaciones para poder ver el calendario
        </p>
      </div>
    </div>
    <!-- load failure msg -->
    <div v-else class="py-[40px] flex items-center justify-center">
      <p class="font-bold text-lg opacity-60 text-center">
        Debe seleccionar un hotel y cargar sus habitaciones para poder ver el
        calendario
      </p>
    </div>

    <!-- booking Dialog -->
    <div class="max-w-md">
      <transition name="fade">
        <BookingDialog
          v-if="showBookingDialog"
          :bookingId="selectedBookingId"
        />
      </transition>
    </div>
  </div>
</template>


<script>
import { storeToRefs } from "pinia";
import { useHotelListStore } from "~/stores/hotel-list-storage";
import MainHeading from "../global/MainHeading.vue";
import { computed, provide, ref, watch } from "@nuxtjs/composition-api";
import HotelSelector from "../global/HotelSelector.vue";
import Calendar from "./Calendar.vue";
import { smartQueryLoader } from "~/composables/smartQueryLoader";
import { genRoomsQuery } from "~/querys/rooms";
import SubmitBtnSecondary from "../global/SubmitBtnSecondary.vue";
import LockARoom from "./LockARoom.vue";
import BookingDialog from "./BookingDialog.vue";
import useBobyOverflow from "~/composables/useBodyOverflow";
export default {
  components: {
    MainHeading,
    HotelSelector,
    Calendar,
    SubmitBtnSecondary,
    LockARoom,
    BookingDialog,
  },
  setup() {
    const hotelStore = useHotelListStore();
    const { hotels, selectedHotel } = storeToRefs(hotelStore);
    const { hideOverflow, showOverflow } = useBobyOverflow();

    const getRoomsQueryDynamic = computed(() =>
      genRoomsQuery(selectedHotel.value?.id)
    );
    const rooms = ref([]);

    const {
      setQuery,
      load: fetchRooms,
      loading: loadingRooms,
    } = smartQueryLoader(
      "",
      (_rooms) => {
        // console.log({ _rooms });
        rooms.value = _rooms;
      },
      "rooms"
    );

    function triggerRoomsLoad() {
      rooms.value = [];
      console.log("trigger RoomsLoad");
      setQuery(getRoomsQueryDynamic.value);
      fetchRooms();
    }

    provide("triggerRoomsLoad", triggerRoomsLoad);

    watch(selectedHotel, (newH) => {
      // console.log({ newH });
      if (typeof newH?.id == "number" && newH?.id >= 0) {
        triggerRoomsLoad();
      }
    });

    // BookingDialog
    const selectedBookingId = ref();
    const showBookingDialog = ref(false);
    const closeBookingDialog = () => {
      showBookingDialog.value = false;
      showOverflow();
    };
    const onShowBookingReq = (booking) => (showBookingDialog.value = true);
    provide("closeBookingDialog", closeBookingDialog);

    function onTimeLineElClick({ item }) {
      console.log({ item });
      // case booking
      if (item.booking_id || item.booking_id === 0) {
        selectedBookingId.value = item.booking_id;
        onShowBookingReq();
        hideOverflow();
      }
    }

    return {
      selectedHotel,
      hotels,
      rooms,
      triggerRoomsLoad,
      loadingRooms,
      // booking og
      selectedBookingId,
      showBookingDialog,
      onTimeLineElClick,
    };
  },
};
</script>

<style>
</style>