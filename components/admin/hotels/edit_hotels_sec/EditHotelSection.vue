<template>
  <div>
    <!-- heading & btn -->
    <div class="flex items-center justify-between">
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
        <HotelList :hotels="hotels" :isLoading="loadingHotels" />
      </div>

      <!-- hotel edit dialog  -->
      <div></div>

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
import { computed, onMounted, ref, watch } from "@nuxtjs/composition-api";
import { useToastStore } from "~/stores/toast-storage";
import { TOAST_TYPES } from "~/db";
export default {
  components: {
    SubHeading,
    HotelList,
    ReloadIcon,
  },

  setup() {
    // data
    const hotels = ref([]);

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
        hotels.value = newR.data.hotels;
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

    const isSectionLoading = computed(() => loadingHotels.value);
    // Life Cycle
    onMounted(loadHotels);

    return {
      // data
      hotels,
      // state
      loadingHotels,
      // isSectionLoading,
      //   fn
      loadHotels,
    };
  },
};
</script>

<style>
</style>