<template>
  <div>
    <!-- heading & btn -->
    <div class="flex items-center justify-between">
      <SubSubHeading text="Editar las  amenidades" />
      <button
        aria-label="actualizar listado de hoteles"
        class="
          p-2
          rounded-lg
          hover:bg-gray-200
          focus-styles
          focus-visible:ring-brand
        "
        @click="loadAmenities"
      >
        <ReloadIcon />
      </button>
    </div>

    <!-- list -->
    <div>
      <ul
        v-if="amenities.length"
        class="mt-[30px] grid gap-[20px] md:grid-cols-2"
      >
        <li v-for="amenity in amenities" :key="amenity.id">
          <AmenitiesSecListItem
            :amenity="amenity"
            @editReq="onEditReq"
            @delReq="onDelReq"
          />
        </li>
      </ul>

      <!-- empty or loading -->
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
        <div v-if="isLoading">
          <p class="animate-pulse">Cargando</p>
        </div>

        <div v-else>
          <p>Todavía no hay amenidades .</p>
          <p>Cree una para empezar.</p>
        </div>
      </div>
    </div>

    <!-- edit -->
    <div class="max-w-md">
      <transition name="fade">
        <AmenitiesSecListEditDialog
          v-if="editDialogNeeded"
          :selectedAmenity="selectedAmenity"
        />
      </transition>
    </div>

    <!-- dell -->
    <div class="max-w-md">
      <transition name="fade">
        <AmenitiesSecListDellDialog
          v-if="dellDialogNeeded"
          :selectedAmenity="selectedAmenity"
        />
      </transition>
    </div>

    <EndSecLine />
  </div>
</template>

<script>
import {
  computed,
  onMounted,
  provide,
  ref,
  watch,
} from "@nuxtjs/composition-api";
import ReloadIcon from "~/components/icons/ReloadIcon.vue";
import EndSecLine from "../../global/EndSecLine.vue";
import SubSubHeading from "../../global/SubSubHeading.vue";
import AmenitiesSecListItem from "./AmenitiesSecListItem.vue";
import useBobyOverflow from "~/composables/useBodyOverflow";
import { useLazyQuery } from "~/composables/useLazyAuthQuery";
import { getRoomAmenities } from "~/querys/getRoomAmenities";
import { useRoomAmenitiesStore } from "~/stores/room-amenyties-storage";
import { storeToRefs } from "pinia";
import { useToastStore } from "~/stores/toast-storage";
import AmenitiesSecListEditDialog from "./AmenitiesSecListEditDialog.vue";
import AmenitiesSecListDellDialog from "./AmenitiesSecListDellDialog.vue";
export default {
  components: {
    SubSubHeading,
    ReloadIcon,
    EndSecLine,
    AmenitiesSecListItem,
    AmenitiesSecListEditDialog,
    AmenitiesSecListDellDialog,
  },
  setup() {
    const editDialogNeeded = ref(false);
    const dellDialogNeeded = ref(false);
    const selectedRoomAmenityId = ref(null);

    // roomType Storage
    const roomAmenitiesStorage = useRoomAmenitiesStore();
    const { populateRoomAmenities, getRoomAmenityById } = roomAmenitiesStorage;
    const { amenities } = storeToRefs(roomAmenitiesStorage);

    const selectedAmenity = computed(() =>
      getRoomAmenityById(selectedRoomAmenityId.value)
    );

    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;
    //

    // query
    const {
      result,
      loading: isLoading,
      error,
      load,
    } = useLazyQuery(getRoomAmenities);

    // watchers

    // result
    watch(result, (newR) => {
      const payload = newR?.data?.getRoomAmenities;
      if (payload) {
        // success
        populateRoomAmenities(payload);
        return;
      }

      // const temp_err = '';
      if (newR?.errors) {
        console.log("Api error");
        var error = newR.errors[0];
        console.log(error);
        // UNAUTHENTICATED
        if (error?.extensions?.code == UNAUTHENTICATED) {
          showToastWithText(
            TOAST_TYPES.error,
            "No tiene permiso para realizar esta operación",
            true
          );
        }

        // Duplicated
        if (error?.extensions?.exception?.code == DB_UNIQUE_CONSTRAINT_ERROR) {
          showToastWithText(
            TOAST_TYPES.error,
            "Fallo al crear el tipo de habitación porque ya existe uno con ese nombre",
            true
          );
        }

        // FORBIDDEN
        // Duplicated
        if (error?.extensions?.code == FORBIDDEN) {
          showToastWithText(
            TOAST_TYPES.error,
            "No tiene permiso para realizar esta operación",
            true
          );
        }

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
          "Falló al contactar con el API",
          true
        );
      }
    });

    //

    // load fn
    function loadAmenities() {
      load();
    }

    provide("loadAmenities", loadAmenities);
    function mountSec() {
      if (!process.client) {
        return;
      }
      // if amenities present
      // use those in initial load
      if (amenities.value.length) {
        return;
      }
      loadAmenities();
    }
    onMounted(mountSec);

    // om overflow
    const { hideOverflow, showOverflow } = useBobyOverflow();

    function onEditReq({ id }) {
      selectedRoomAmenityId.value = id;
      hideOverflow();
      editDialogNeeded.value = true;
    }
    function onDelReq({ id }) {
      selectedRoomAmenityId.value = id;
      hideOverflow();
      dellDialogNeeded.value = true;
    }

    function hideEditDialog() {
      showOverflow();
      editDialogNeeded.value = false;
    }
    function hideDelDialog() {
      showOverflow();
      dellDialogNeeded.value = false;
    }

    provide("hideEditDialog", hideEditDialog);
    provide("hideDelDialog", hideDelDialog);

    return {
      amenities,
      selectedAmenity,
      loadAmenities,
      isLoading,
      onEditReq,
      onDelReq,
      editDialogNeeded,
      dellDialogNeeded,
    };
  },
};
</script>

<style>
</style>