<template>
  <div class="mt-5 pb-32">
    <SearchForm
      :searching="tempLoading"
      :calendarLength="calendarLength"
      @[SEARCH_REQUEST]="onSearchRequest"
    />
  </div>
</template>

<script>
import {
  computed,
  reactive,
  ref,
  useContext,
  watch,
} from "@nuxtjs/composition-api";
import SearchForm from "./SearchForm.vue";
import { genhotelQuery } from "~/querys/hotel";
import { useQuery } from "~/composables/useQuery";
import { EVENTS, TOAST_TYPES } from "~/db";
import { useToastStore } from "~/stores/toast-storage";
import { roomsAvailable } from "~/querys/roomsAvailable";
import {
  date_obj_and_time_zone_to_utc_obj,
  getDateObjFromDateAndTimeStr,
} from "~/utils";
import { useLazyQuery } from "~/composables/useLazyQuery";

export default {
  components: { SearchForm },
  setup() {
    const hotel = ref({});
    const ctx = useContext();
    const HOTEL_ID = +ctx.env.HOTEL_ID;
    const hotelQuery = genhotelQuery(HOTEL_ID);
    const searchInterval = reactive({
      check_in_date: null,
      check_out_date: null,
    });
    // toast
    const toastStore = useToastStore();
    const { showToast } = toastStore;
    const { loading, result, error, refetch } = useQuery(hotelQuery);

    watch(result, (nV) => {
      if (nV) {
        // console.log({ hotel: nV?.data?.hotel });
        if (nV.data.hotel) {
          hotel.value = nV.data.hotel;
        }
        if (nV.errors) {
          console.log(nV.errors[0]);
        }
      }
    });

    const calendarLength = computed(() =>
      hotel.value?.maximun_free_calendar_days
        ? hotel.value?.maximun_free_calendar_days
        : 90
    );

    const SEARCH_REQUEST = EVENTS.CLIENT.SEARCH_ROOM.SEARCH_REQUEST;

    // listings loading
    const {
      loading: listingsLoading,
      result: listingsRes,
      error: listingsError,
      load,
      setVariables,
    } = useLazyQuery(roomsAvailable);

    watch(listingsRes, (nLRes) => {
      if (nLRes?.data && nLRes.data?.getRoomsAvailable) {
        const listings = nLRes.data?.getRoomsAvailable;
        return console.log({ listings });
      }

      if (nLRes?.errors) {
        showToast(
          TOAST_TYPES.error,
          "home.search.errors.listings_load_error",
          true
        );
      }
    });

    watch(listingsError, (nLE) => {
      if (nLE?.message) {
        console.log("listings load Error");
        console.log(nLE);
        showToast(
          TOAST_TYPES.error,
          "home.search.errors.listings_load_error",
          true
        );
      }
    });

    function loadListings() {
      console.log("loadlistings");

      // create input

      //
      // check_out_hour_time
      var input = {
        hotel_id: hotel.value.id,
        start_date: {
          year: searchInterval.check_in_date.year,
          month: searchInterval.check_in_date.month,
          day: searchInterval.check_in_date.day,
          hour: searchInterval.check_in_date.hour,
          minute: searchInterval.check_in_date.minute,
        },
        end_date: {
          year: searchInterval.check_out_date.year,
          month: searchInterval.check_out_date.month,
          day: searchInterval.check_out_date.day,
          hour: searchInterval.check_out_date.hour,
          minute: searchInterval.check_out_date.minute,
        },
      };

      console.log({ input });

      setVariables({ input });
      load();
    }

    // search hanling
    function onSearchRequest({ check_in_date, check_out_date }) {
      console.log("onSearchRequest");
      // console.log({ search_fomr_interval: { check_in_date, check_out_date } });

      // case hotel query has fail
      if (!hotel.value?.hotel_name) {
        console.log("show error toast");
        showToast(
          TOAST_TYPES.error,
          "home.search.errors.hotel_load_error",
          true
        );
        return refetch();
      }

      // ready to load rooms available
      // prepare
      // set date obj when query dates & hotel time
      const fix_check_in_date_obj = getDateObjFromDateAndTimeStr(
        check_in_date,
        hotel.value.check_in_hour_time
      );
      const fix_check_out_date_obj = getDateObjFromDateAndTimeStr(
        check_out_date,
        hotel.value.check_out_hour_time
      );

      // set hotel timeZone localized dates mapped as utc for hit the api with
      // though one damm
      searchInterval.check_in_date = date_obj_and_time_zone_to_utc_obj(
        fix_check_in_date_obj,
        hotel.value.iana_time_zone
      );
      searchInterval.check_out_date = date_obj_and_time_zone_to_utc_obj(
        fix_check_out_date_obj,
        hotel.value.iana_time_zone
      );

      // load
      loadListings();
    }

    // populate listings TODO
    // when listings loaDeD

    const tempLoading = ref(false);
    return {
      hotel,
      calendarLength,
      SEARCH_REQUEST,
      onSearchRequest,
      listingsLoading,
      tempLoading,
      searchInterval,
    };
  },
};
</script>

<style>
</style>