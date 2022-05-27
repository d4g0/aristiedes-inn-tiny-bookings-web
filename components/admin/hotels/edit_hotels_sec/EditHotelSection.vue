<template>
  <div>
    <!-- heading & btn -->
    <div class="flex items-center justify-between max-w-md">
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
    <div class="w-full max-w-md">
      <!-- hotel list -->
      <div class="mt-[30px]">
        <HotelList
          :hotels="hotels"
          :isLoading="loadingHotels"
          @[EDIT_HOTEL]="onEditReq"
          @[DELETE_HOTEL]="onDelReq"
        />
      </div>

      <!-- hotel edit dialog  -->
      <div>
        <transition name="fade">
          <EditHotelDialog
            v-if="editDialogNeeded"
            @hideEditDialog="onHideEditDialogReq"
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

const EDIT_HOTEL = EVENTS.ADMIN.HOTELS.EDIT_HOTELS.LIST.EDIT_HOTEL;
const DELETE_HOTEL = EVENTS.ADMIN.HOTELS.EDIT_HOTELS.LIST.DELETE_HOTEL;

export default {
  components: {
    SubHeading,
    HotelList,
    ReloadIcon,
    EditHotelDialog,
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

    // edit hotel
    const editDialogNeeded = ref(false);
    const selectedHotelId = ref(null);
    function onHideEditDialogReq() {
      editDialogNeeded.value = false;
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
      console.log(DELETE_HOTEL, { id });
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
      // state
      loadingHotels,
      //   fn
      loadHotels,
      onEditReq,
      onDelReq,
      onHideEditDialogReq,
    };
  },
};
</script>

<style>
</style>