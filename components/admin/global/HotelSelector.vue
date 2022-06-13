<template>
  <div>
    <form v-if="hotels">
      <!-- user role -->
      <div class="mt-4">
        <label for="hotel_selector" class="label pl-2">
          Trabajando en el hotel:
        </label>
        <select
          name="hotel_selector"
          id="hotel_selector"
          class="
            w-full
            input-field
            focus-effect
            border-gray-800/40 border
            focus:ring-brand
          "
          @change="onChange"
        >
          <option value="" disabled selected>Por favor seleccione</option>
          <option
            v-for="hotel in hotels"
            :key="hotel.id"
            :value="hotel.id"
            :selected="selectedHotelId === +hotel.id"
          >
            {{ hotel.hotel_name }} ( Id: {{ hotel.id }})
          </option>
        </select>
      </div>
    </form>
    <div
      v-else
      class="
        flex flex-col
        items-center
        justify-center
        opacity-60
        text-xl
        font-medium
        text-center
        py-[50px]
      "
    >
      <div v-if="loadingHotels">
        <p class="animate-pulse">Cargando</p>
      </div>
      <div v-else>
        <p>Todavía no hay hoteles que seleccionar.</p>
        <p>Cree uno para empezar.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useHotelListStore } from "~/stores/hotel-list-storage";
import { smartQueryLoader } from "~/composables/useSmartQueryControler";
import { getHotels } from "~/querys/hotels";
import { computed, onMounted } from "@nuxtjs/composition-api";
import { wait } from "~/utils";
export default {
  props: {},
  setup(props, { emit }) {
    //   store

    const hotelStore = useHotelListStore();
    const { hotels, selectedHotel } = storeToRefs(hotelStore);
    const { populateHotels, selectHotel } = hotelStore;

    const selectedHotelId = computed(() =>
      selectedHotel.value ? selectedHotel.value.id : null
    );

    // query
    // smartQueryLoader
    const { load: loadHotels, loading: loadingHotels } = smartQueryLoader(
      getHotels,
      (_hotels) => {
        populateHotels(_hotels);
        selectFirst();
      },
      "hotels"
    );

    //

    function onChange(evt) {
      //   emit("hotel_seleted", { id: +evt.target.value });
      selectHotel(+evt.target.value);
    }

    // select first as default
    async function selectFirst() {
      await wait(0);
      // let fetch happen
      if (!hotels.value.length) {
        return;
      }
      const firstHotel = hotels.value.length ? hotels.value[0] : null;
      if (!firstHotel) {
        return;
      }
      selectHotel(+firstHotel.id);
    }

    function mountSec() {
      if (!process.client) {
        return;
      }
      //   if no hotels in store load and populate
      //   selectFirst();
      if (!hotels.value.length) {
        loadHotels();
      } else {
        selectFirst();
      }
    }

    onMounted(mountSec);

    return {
      onChange,
      hotels,
      loadingHotels,
      selectedHotelId,
    };
  },
};
</script>

<style>
</style>