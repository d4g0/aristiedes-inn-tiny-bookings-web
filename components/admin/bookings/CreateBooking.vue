<template>
  <div>
    <SubHeading text="Nueva reservación" class="max-w-md" />

    <div v-if="!selectedHotel" class="max-w-md">
      <p class="mt-[50px]">seleccione un hotel</p>
    </div>

    <div v-else>
      <!-- date range -->
      <DateTimePicker
        :calendarLength="calendarLength"
        class="mt-[30px] max-w-md"
        @DATES_RANGE_SELECTED="onDateRangeSelection"
        :selectedHotel="selectedHotel"
      />
      <SubmitBtn
        :isSending="loadingRooms"
        submitText="Ver disponibles"
        class="mt-[30px] max-w-md"
        @btn_click="hitApi"
      />

      <!-- rooms -->
      <RoomListings
        class="mt-[30px]"
        :rooms="rooms"
        v-if="rooms.length"
        @rooms_selected="onSelectedRooms"
      />

      <!-- client -->
      <ClientNameForm
        v-if="rooms_ids.length"
        @submit="onClientNameSubmit"
        class="mt-[50px] max-w-md"
      />

      <!-- price -->
      <PriceForm
        v-if="clientNamesDefined"
        @submit="onPriceSubmit"
        class="mt-[50px] max-w-md"
        :basePrice="basePrice"
        :nights="nights"
        :rooms="selectedRooms"
      />

      <!-- create btn -->
      <SubmitBtn
        v-if="!fieldMissing"
        @btn_click="onCreateReq"
        class="mt-[50px]"
        submitText="Crear Reservación"
        @
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@nuxtjs/composition-api";
import SubHeading from "../global/SubHeading.vue";
import DateTimePicker from "~/components/admin/global/DateTimePicker.vue";
import RoomsPicker from "./RoomsPicker.vue";
import {
  calculateNightsInBetweenDateStr,
  toTimeZoneKeepenLocal_2,
} from "~/utils";
import { useListingsStore } from "~/stores/listings-storage";
import { smartQueryLoader } from "~/composables/useSmartQueryControler";
import { roomsAvailable } from "~/querys/roomsAvailable";
import SubmitBtn from "../global/SubmitBtn.vue";
import { useToastStore } from "~/stores/toast-storage";
import { TOAST_TYPES } from "~/db";
import { storeToRefs } from "pinia";
import RoomListings from "./RoomListings.vue";
import ClientNameForm from "./ClientNameForm.vue";
import PriceForm from "./PriceForm.vue";

export default {
  components: {
    SubHeading,
    DateTimePicker,
    RoomsPicker,
    SubmitBtn,
    RoomListings,
    ClientNameForm,
    PriceForm,
  },
  props: {
    selectedHotel: {
      type: Object,
      default: () => ({
        id: 1,
        hotel_name: "Sloppy Joes Grand Hotel",
        maximun_free_calendar_days: 30,
        check_in_hour_time: "13:34:00",
        check_out_hour_time: "12:33:00",
        iana_time_zone: "America/Lima",
      }),
    },
  },

  setup(props, ctx) {
    const rooms_ids = ref([]);
    const clientName = ref("");
    const clientLastName = ref("");
    const calendarLength = computed(() =>
      props.selectedHotel ? props.selectedHotel.maximun_free_calendar_days : 90
    );
    const totalPrice = ref(0);

    const start_date = ref("");
    const end_date = ref("");

    const clientNamesDefined = ref(false);

    // //
    // listings
    // //
    // storage
    const listingsStorage = useListingsStore();
    const { populateListings, getListingById } = listingsStorage;
    const { listings: rooms } = storeToRefs(listingsStorage);

    const nights = computed(
      () =>
        calculateNightsInBetweenDateStr(start_date.value, end_date.value) || 1
    );

    const basePrice = computed(() =>
      rooms_ids.value.length
        ? rooms_ids.value.reduce((acumulator, roomId) => {
            const room = getListingById(roomId);

            const roomTotalPrice = room ? room.night_price * nights.value : 0;
            acumulator += roomTotalPrice;
            return acumulator;
          }, 0)
        : 0
    );

    const selectedRooms = computed(() =>
      rooms_ids.value.length
        ? rooms_ids.value.map((roomId) => getListingById(roomId))
        : []
    );

    // const basePrice = ref(2)

    // query
    const {
      load: loadRooms,
      loading: loadingRooms,
      setVariables,
    } = smartQueryLoader(
      roomsAvailable,
      (rooms) => populateListings(rooms),
      "getRoomsAvailable"
    );

    function onDateRangeSelection({ start, end }) {
      if (!process.client) {
        return;
      }

      // map to utc dates
      const utc_timezoned_start = toTimeZoneKeepenLocal_2(start, "UTC").toISO();
      const utc_timezoned_end = toTimeZoneKeepenLocal_2(end, "UTC").toISO();

      // console.log({
      //   start,
      //   end,
      //   hotel: props.selectedHotel,
      // });

      start_date.value = utc_timezoned_start;
      end_date.value = utc_timezoned_end;
    }

    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;

    function hitApi() {
      if (!props.selectedHotel.hotel_name) {
        return showToastWithText(
          TOAST_TYPES.error,
          "Error: debe seleccionar un hotel antes",
          true
        );
      }
      const variables = {
        input: {
          hotel_id: +props.selectedHotel.id,
          start_date: start_date.value,
          end_date: end_date.value,
        },
      };

      var iSample = {
        input: {
          start_date: "2022-06-14T00:00:00.000Z", //
          end_date: "2022-06-15T00:00:00.000Z", //
          hotel_id: 1, //
          rooms_ids: [2, 11], //
          client_name: "Lolo ", //
          client_last_name: "Zanchez de la Concepcion", //
          currency_id: 1,
          payment_type_id: 1,
          number_of_guests: 2,
          total_price: 200,
        },
      };

      setVariables(variables);
      loadRooms();
    }

    // rooms selection
    function onSelectedRooms(rooms) {
      console.log({ rooms });
      rooms_ids.value = rooms.map((room) => +room.id);
    }

    // client
    function onClientNameSubmit({ name, lastName }) {
      clientName.value = name;
      clientLastName.value = lastName;
      clientNamesDefined.value = true;
    }

    // price
    function onPriceSubmit({ price }) {
      totalPrice.value = +price;
    }

    const fieldMissing = computed(
      () =>
        !(
          rooms_ids.value.length &&
          clientName.value.length &&
          clientLastName.value.length &&
          totalPrice.value > 0
        )
    );

    function onCreateReq() {
      if (fieldMissing.value) {
        return showToastWithText(
          TOAST_TYPES.error,
          "Error: debe definir todos los valores",
          true
        );
      }
    }

    return {
      calendarLength,
      onDateRangeSelection,
      loadingRooms,
      hitApi,
      rooms,
      onSelectedRooms,
      onClientNameSubmit,
      onPriceSubmit,
      basePrice,
      nights,
      rooms_ids,
      selectedRooms,
      onCreateReq,
      fieldMissing,
      clientNamesDefined,
      clientName,
      clientLastName,
      totalPrice
    };
  },
};
</script>

<style>
</style>