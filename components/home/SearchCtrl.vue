<template>
  <div class="mt-5">
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
  date_obj_and_time_zone_to_iso,
  date_obj_and_time_zone_to_localized_date_to_utc_str,
  get_luxon_ready_date_obj_from_js_date_and_sql_time_str,
} from "~/utils";
import { useLazyQuery } from "~/composables/useLazyQuery";
import { useListingsStore } from "~/stores/listings-storage";
import { useBasketStore } from "~/stores/basket-storage";

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
    // hotel query
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
    // *****
    // todo watch hotel query error too
    // ****

    const calendarLength = computed(() =>
      hotel.value?.maximun_free_calendar_days
        ? hotel.value?.maximun_free_calendar_days
        : 90
    );

    const SEARCH_REQUEST = EVENTS.CLIENT.SEARCH_ROOM.SEARCH_REQUEST;

    // //
    // listings
    // //
    // listings-storage
    const listingsStorage = useListingsStore();
    const { populateListings } = listingsStorage;

    // listings-query
    const {
      loading: listingsLoading,
      result: listingsRes,
      error: listingsError,
      load,
      setVariables,
    } = useLazyQuery(roomsAvailable);

    // listings-storage response handling
    watch(listingsRes, (nLRes) => {
      if (nLRes?.data && nLRes.data?.getRoomsAvailable) {
        const listings = nLRes.data?.getRoomsAvailable;
        // return console.log({ listings });
        populateListings(listings);
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
        start_date: searchInterval.check_in_date,
        end_date: searchInterval.check_out_date,
      };

      console.log({ input });

      setVariables({ input });
      load();
    }

    // basket
    // initDates
    const basketStorage = useBasketStore();
    const { initBasketDates } = basketStorage;

    //

    // search hanling
    function onSearchRequest({ check_in_date, check_out_date }) {
      // console.log("onSearchRequest");
      // console.log("params");
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
      // api's dates parsing is expecting native js dates numbers in the date obj eg: month 0-11
      const fix_check_in_date_obj =
        get_luxon_ready_date_obj_from_js_date_and_sql_time_str(
          check_in_date,
          hotel.value.check_in_hour_time
        );
      const fix_check_out_date_obj =
        get_luxon_ready_date_obj_from_js_date_and_sql_time_str(
          check_out_date,
          hotel.value.check_out_hour_time
        );

      console.log("fixed booking dates with hotel times");
      console.log({ fix_check_in_date_obj, fix_check_out_date_obj });

      // init basket dates
      // initBasketDates(fix_check_in_date_obj, fix_check_out_date_obj);

      // set hotel timeZone localized dates mapped as utc for hit the api with
      // though one damm
      // this date_obj_and_time_zone_to_utc_obj keeps working ok with the luxon obj
      // api was refactor to use date string so send utc strings as check_in check_out params
      searchInterval.check_in_date = date_obj_and_time_zone_to_localized_date_to_utc_str(
        fix_check_in_date_obj,
        hotel.value.iana_time_zone
      );
      searchInterval.check_out_date = date_obj_and_time_zone_to_localized_date_to_utc_str(
        fix_check_out_date_obj,
        hotel.value.iana_time_zone
      );

      // console.log('final search interval')
      // console.log(searchInterval.check_in_date, searchInterval.check_out_date)

      // load
      loadListings();
    }

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