<template>
  <div>
    <SubHeading text="Reservaciones" class="max-w-md" />
    <div
      class="
        mt-[50px]
        w-full
        border border-gray-400
        rounded-[16px]
        p-[10px]
        md:p-[20px]
      "
    >
      <div v-if="selectedHotel">
        <DateRangePagination
          :selectedHotel="selectedHotel"
          @start_date_update="onStartDateUpdate"
          @end_date_update="onEndDateUpdate"
        />

        <!-- <div class="py-[10px]">Reservaciones: {{ totalBookings }}</div> -->
        <div class="mt-[30px]" v-if="totalPages > 1">
          <div
            v-if="totalPages > 1"
            class="mt-[10px] flex items-center justify-between"
          >
            <!-- prev -->
            <button
              class="
                mr-[20px]
                text-sm
                font-medium
                flex-shrink-0
                opacity-80
                hover:opacity-100
                disabled:opacity-40 disabled:cursor-not-allowed
                focus-styles
              "
              :disabled="loadingBookings || !hasPrevPage"
              @click="onPrevReq"
            >
              <span aria-hidden="true">«</span>
              <span>Anterior</span>
            </button>
            <ul
              class="
                flex
                items-center
                justify-start
                overflow-x-auto
                gap-2
                px-[10px]
                py-[5px]
              "
            >
              <li v-for="n in totalPages" :key="n">
                <button
                  class="
                    w-10
                    h-10
                    border border-gray-300
                    rounded-full
                    p-2
                    opacity-80
                    hover:opacity-100 hover:border-black
                    focus:opacity-100
                    focus-styles
                    focus:ring-offset-2 focus:ring-offset-white
                  "
                  :class="{
                    'border-black opacity-100 bg-black/80 text-white':
                      page == n,
                  }"
                  @click="onPageChange(n)"
                  :disabled="loadingBookings"
                >
                  {{ n }}
                </button>
              </li>
            </ul>

            <!-- next -->
            <button
              class="
                ml-[20px]
                text-sm
                font-medium
                flex-shrink-0
                opacity-80
                hover:opacity-100
                disabled:opacity-40 disabled:cursor-not-allowed
                focus-styles
              "
              :disabled="loadingBookings || !hasNextPage"
              @click="onNextReq"
            >
              <span>Siguiente</span>
              <span aria-hidden="true">»</span>
            </button>
          </div>
        </div>
      </div>
      <div v-else>Debe seleccionar un hotel</div>
    </div>

    <div>
      <!-- loading -->
      <div
        class="p-[40px] flex items-center justify-center"
        v-if="loadingBookings"
      >
        <p class="font-bold animate-pulse text-center text-lg">Cargando</p>
      </div>

      <div v-else>
        <div
          class="p-[50px] flex items-center justify-center"
          v-if="!bookings.length"
        >
          <p class="font-bold opacity-70 text-center text-xl">
            No hay reservaciones en este intervalo
          </p>
        </div>
        <!-- no bookings -->

        <!-- bookings list -->
        <div class="mt-[30px] w-full max-h-[500px] overflow-y-auto" v-else>
          <ul class="grid md:grid-cols-2 gap-y-[20px] md:gap-x-[20px] w-full">
            <li v-for="booking in bookings" :key="booking.id">
              <BookingsListItem
                :booking="booking"
                @cancel_req="onCancelationReq"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="max-w-md">
      <transition name="fade">
        <DellBookingDialog
          v-if="bookingCancelDialogNeeded"
          :bookingId="bookingIdToCancel"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { computed, provide, ref } from "@nuxtjs/composition-api";
import SubHeading from "../global/SubHeading.vue";
import DateRangePagination from "./blist/DateRangePagination.vue";
import { genGetBookingsQuery } from "~/querys/getBookings";
import { smartQueryLoader } from "~/composables/useSmartQueryControler";
import BookingsListItem from "./BookingsListItem.vue";
import DellBookingDialog from "./DellBookingDialog.vue";
export default {
  components: {
    SubHeading,
    DateRangePagination,
    BookingsListItem,
    DellBookingDialog,
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

  setup(props) {
    // dates
    const start_date = ref("");
    const end_date = ref("");
    const page = ref(1);
    const totalPages = ref(1);
    const totalBookings = ref(0);
    const MAX_BOOKINGS_PER_PAGE = 50;
    const bookings = ref([]);

    function onStartDateUpdate({ date }) {
      start_date.value = date;
      triggerLoadBookings();
    }
    function onEndDateUpdate({ date }) {
      end_date.value = date;
      triggerLoadBookings();
    }

    const {
      load: loadBookings,
      loading: loadingBookings,
      setQuery,
      setVariables,
    } = smartQueryLoader(
      "",
      (_bookingsRes) => {
        processBookingRes(_bookingsRes);
      },
      "getBookings"
    );

    provide("loadBookings", loadBookings);
    function triggerLoadBookings() {
      // ignore initial not ready stage
      if (!(start_date.value && end_date.value)) {
        return;
      }
      const variables = {
        input: {
          hotel_id: +props.selectedHotel.id,
          start_date_filter: start_date.value,
          end_date_filter: end_date.value,
          page: page.value,
        },
      };

      const getBookings = genGetBookingsQuery(+props.selectedHotel.id);
      setQuery(getBookings);
      setVariables(variables);
      //   console.log("fetching bookings", { variables });

      loadBookings();
    }

    function processBookingRes(bookingsRes) {
      //   console.log({ bookingsRes });
      bookings.value = bookingsRes.results || [];
      totalBookings.value = bookingsRes.count;
      totalPages.value =
        Math.floor(totalBookings.value / MAX_BOOKINGS_PER_PAGE) + 1;
    }

    // page managment
    function onPageChange(n = 1) {
      page.value = n;
      triggerLoadBookings();
    }

    const hasPrevPage = computed(() =>
      totalPages.value > 1 ? (page.value > 1 ? true : false) : false
    );
    function onPrevReq() {
      page.value = page.value - 1 > 0 ? page.value - 1 : 0;
      triggerLoadBookings();
    }

    const hasNextPage = computed(() =>
      totalPages.value > 1
        ? page.value < totalPages.value
          ? true
          : false
        : false
    );
    function onNextReq() {
      page.value =
        page.value + 1 < totalPages.value ? page.value + 1 : totalPages.value;
      triggerLoadBookings();
    }

    // cancelations
    const bookingIdToCancel = ref(null);
    const bookingCancelDialogNeeded = ref(false);
    function closeCancelDialog() {
      bookingIdToCancel.value = null;
      bookingCancelDialogNeeded.value = false;
    }

    provide("closeCancelDialog", closeCancelDialog);

    function onCancelationReq({ id }) {
      console.log("canceling: ", id);
      bookingIdToCancel.value = +id;
      bookingCancelDialogNeeded.value = true;
    }

    return {
      onStartDateUpdate,
      onEndDateUpdate,
      page,
      totalPages,
      loadingBookings,
      bookings,
      onCancelationReq,
      bookingCancelDialogNeeded,
      bookingIdToCancel,
      totalBookings,
      onPageChange,
      hasPrevPage,
      onPrevReq,
      hasNextPage,
      onNextReq,
    };
  },
};
</script>

<style>
</style>