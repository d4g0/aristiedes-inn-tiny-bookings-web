<template>
  <div>
    <!-- heading & btn -->
    <div class="flex items-center justify-between ">
      <SubHeading text="Editar hoteles" />
      <button
        aria-label="actualizar listado de hoteles"
        class="
          p-2
          rounded-lg
          hover:bg-gray-200
          focus-styles
          focus-visible:ring-brand
        "
        @click="loadHotels"
      >
        <ReloadIcon />
      </button>
    </div>
    <div class="w-full">
      <!-- hotel list -->
      <div class="mt-[50px]">
        <HotelList
          :hotels="hotels"
          :isLoading="loadingHotels"
          @[EDIT_HOTEL]="onEditReq"
          @[DELETE_HOTEL]="onDelReq"
        />
      </div>

      <!-- hotel edit dialog  -->
      <div class="max-w-md">
        <transition name="fade">
          <EditHotelDialog
            v-if="editDialogNeeded"
            @hideEditDialog="onHideEditDialogReq"
            :selectedHotelId="selectedHotelId"
          />
        </transition>
      </div>

      <!-- dell hotel dialog  -->
      <div class="max-w-md">
        <transition name="fade">
          <DellHotelDialog
            v-if="dellDialogNeeded"
            @dellDialog="onHideDellDialogReq"
            :selectedHotelId="selectedHotelId"
          />
        </transition>
      </div>

      <div class="border border-b-gray-200 mt-[50px]"></div>
    </div>
  </div>
</template>

<script>
import SubHeading from "~/components/admin/global/SubHeading.vue";
import HotelList from "./HotelList.vue";
import ReloadIcon from "~/components/icons/ReloadIcon.vue";
import { useLazyQuery } from "~/composables/useLazyQuery";
import { getHotels } from "~/querys/hotels.js";
import {
  computed,
  onMounted,
  provide,
  ref,
  watch,
} from "@nuxtjs/composition-api";
import { useToastStore } from "~/stores/toast-storage";
import { useHotelListStore } from "~/stores/hotel-list-storage";
import { EVENTS, TOAST_TYPES } from "~/db";
import { storeToRefs } from "pinia";
import EditHotelDialog from "./EditHotelDialog.vue";
import useBobyOverflow from "~/composables/useBodyOverflow";
import DellHotelDialog from "./DellHotelDialog.vue";

const EDIT_HOTEL = EVENTS.ADMIN.HOTELS.EDIT_HOTELS.LIST.EDIT_HOTEL;
const DELETE_HOTEL = EVENTS.ADMIN.HOTELS.EDIT_HOTELS.LIST.DELETE_HOTEL;

export default {
  components: {
    SubHeading,
    HotelList,
    ReloadIcon,
    EditHotelDialog,
    DellHotelDialog,
  },

  setup() {
    // data
    const hotelListSotre = useHotelListStore();
    const { hotels } = storeToRefs(hotelListSotre);
    const { populateHotels } = hotelListSotre;

    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;

    // hotels query
    // const loadingHotels = ref(true);
    const {
      loading: loadingHotels,
      result,
      error,
      load,
    } = useLazyQuery(getHotels);

    // result
    watch(result, (newR) => {
      // console.log("(watch/result change)");
      // console.log({ result: result.value });
      if (newR?.data?.hotels) {
        // success
        console.log("Hotels Loaded");
        // console.log(newR?.data?.createHotel);
        // hotels.value = newR.data.hotels;
        populateHotels(newR.data.hotels);
        return;
      }

      // const temp_err = '';
      if (newR?.errors) {
        console.log("Api error");
        var error = newR.errors[0];
        console.log(error);

        // errors
        return;
      }
    });
    // error
    watch(error, (newE) => {
      if (newE) {
        console.log("fetch error");
        console.log(newE);
        showToastWithText(
          TOAST_TYPES.error,
          "Fallo al contactar con el API",
          true
        );
      }
    });

    function loadHotels() {
      load();
    }

    provide("loadHotels", loadHotels);
    //
    // dom goverflow
    const { hideOverflow, showOverflow } = useBobyOverflow();

    //
    // edit hotel
    const selectedHotelId = ref(null);
    const editDialogNeeded = ref(false);
    function onHideEditDialogReq() {
      editDialogNeeded.value = false;
      showOverflow();
    }

    // dell hotel
    const dellDialogNeeded = ref(false);
    function onHideDellDialogReq() {
      dellDialogNeeded.value = false;
      showOverflow();
    }

    // reqs
    function onEditReq({ id }) {
      // console.log(EDIT_HOTEL, { id });
      selectedHotelId.value = id;
      hideOverflow();
      editDialogNeeded.value = true;
    }

    function onDelReq({ id }) {
      // console.log(DELETE_HOTEL, { id });
      selectedHotelId.value = id;
      hideOverflow();
      dellDialogNeeded.value = true;
    }

    // Life Cycle
    onMounted(loadHotels);

    return {
      // data
      hotels,
      EDIT_HOTEL,
      DELETE_HOTEL,
      editDialogNeeded,
      selectedHotelId,
      dellDialogNeeded,
      // state
      loadingHotels,
      //   fn
      loadHotels,
      onEditReq,
      onDelReq,
      onHideEditDialogReq,
      onHideDellDialogReq,
    };
  },
};
</script>

<style>
</style>