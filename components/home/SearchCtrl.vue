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
      result: listingsResult,
      error: listingsError,
      load,
      setVariables,
    } = useLazyQuery(roomsAvailable);

    function loadListings() {
      // const check_in_utc_date_obj = DateObjToUTC(
      //   searchInterval.check_in_date.value
      // );
      // const check_out_utc_date = new Date(
      //   searchInterval.check_out_date
      // ).toISOString();

      // create input

      // complete utc date times
      // set utc date with hotel chec_in, check_out time
      // value and add those to the allready available utc day date

      // console.log({
      //   loc: "loa listings",
      //   check_in_obj,
      //   check_out_obj,
      //   check_in_utc_date,
      //   check_out_utc_date,
      // });

      //
      // check_out_hour_time
      var input = {
        input: {
          hotel_id: hotel.value.id,
          start_date: {
            year: 2022,
            month: 4,
            day: 10,
            hour: 10,
            minute: 0,
          },
          end_date: {
            year: 2022,
            month: 4,
            day: 12,
            hour: 10,
            minute: 0,
          },
        },
      };
    }

    // search hanling
    function onSearchRequest({ check_in_date, check_out_date }) {
      console.log("onSearchRequest");
      console.log({ search_fomr_interval: { check_in_date, check_out_date } });
      // console.log({ hotel_name: hotel.value?.hotel_name });\

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
      const fix_check_in_date_obj = getDateObjFromDateAndTimeStr(
        check_in_date,
        hotel.value.check_in_hour_time
      );
      const fix_check_out_date_obj = getDateObjFromDateAndTimeStr(
        check_out_date,
        hotel.value.check_out_hour_time
      );

      console.log({
        fix_check_in_date_obj,
        fix_check_out_date_obj,
      });
      searchInterval.check_in_date = date_obj_and_time_zone_to_utc_obj(
        fix_check_in_date_obj,
        hotel.value.iana_time_zone
      );
      searchInterval.check_out_date = date_obj_and_time_zone_to_utc_obj(
        fix_check_out_date_obj,
        hotel.value.iana_time_zone
      );

      console.log({
        searchInterval: {
          check_in_date: searchInterval.check_in_date,
          check_out_date: searchInterval.check_out_date,
        },
      });
      // load
      // loadListings();
      // populate listings
    }

    const tempLoading = ref(false);
    return {
      hotel,
      calendarLength,
      SEARCH_REQUEST,
      onSearchRequest,
      listingsLoading,
      tempLoading,
      searchInterval
    };
  },
};
</script>

<style>
</style>