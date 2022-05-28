<template>
  <div>
    <!-- selection form -->
    <div v-if="hotels.length > 0" class="mt-[30px]">
      <form @submit.prevent="selectHotelAsCurrent">
        <div class="w-full">
          <label for="hotels_current_selector" class="sr-only">
            Seleccione:
          </label>
          <select
            v-model="formOptionId"
            name="hotels"
            id="hotels_current_selector"
            class="
              w-full
              bg-gray-200-400
              p-3
              rounded-[16px]
              focus-styles focus:ring-offset-2
            "
          >
            <option value="" disabled selected>Por favor seleccione</option>
            <option
              v-for="hotel in hotels"
              :key="hotel.id"
              :value="hotel.id"
              :id="`current-hotel-selector-option-${hotel.id}`"
            >
              {{ hotel.hotel_name }}
            </option>
          </select>
        </div>
        <div class="mt-[30px]">
          <button
            class="
              rounded-[16px]
              p-3
              bg-black
              dark:bg-type-on-dark
              text-white
              dark:text-type-on-light
              w-full
              font-medium
              focus-styles focus:ring-offset-2
              hover:bg-brand
              dark:hover:bg-brand dark:hover:text-white
              disabled:bg-brand/60 disabled:cursor-not-allowed
            "
          >
            Seleccionar
          </button>
        </div>
      </form>

      <!-- <pre>
            <code>
currentHotel: {{ currentHotel }}
            </code>
      </pre> -->
    </div>

    <!-- no hotels to select -->
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
      <p>No hay hoteles que seleccionar.</p>
      <p>Cree uno para empezar.</p>
    </div>
  </div>
</template>

<script>
import { useHotelListStore } from "~/stores/hotel-list-storage";
import { useCurrentHotelStore } from "~/stores/current-hotel-storage";
import { onMounted, ref } from "@vue/composition-api";
import { storeToRefs } from "pinia";
import { wait } from "~/utils";
export default {
  setup() {
    const formOptionId = ref();
    const hotelListSotre = useHotelListStore();
    const { hotels } = storeToRefs(hotelListSotre);
    const { getHotelById } = hotelListSotre;
    const currentHotelStore = useCurrentHotelStore();
    const { currentHotel } = storeToRefs(currentHotelStore);
    const { selectHotel, recoverCurrentHotelSession } = currentHotelStore;
    const delayAwaited = ref(false);

    onMounted(initSec);

    async function initSec() {
      recoverCurrentHotelSession();
      // await wait(1);
      delayAwaited.value = true;
      markSelected();
    }

    async function markSelected() {
      if (!process.client) {
        return;
      }

      if (!currentHotel) {
        return;
      }

      // wait to make sure the all 
      // options have been rendered
      await wait(1);
      const refOption = document.querySelector(
        `#current-hotel-selector-option-${currentHotel.value.id}`
      );

      if(refOption){
        refOption.selected = true;
      }
    }

    function selectHotelAsCurrent() {
      const hotel = getHotelById(formOptionId.value);

      if (hotel) {
        selectHotel(hotel);
      }
    }
    return {
      delayAwaited,
      formOptionId,
      hotels,
      currentHotel,
      selectHotelAsCurrent,
    };
  },
};
</script>

<style>
</style>