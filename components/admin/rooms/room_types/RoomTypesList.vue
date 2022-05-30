<template>
  <div>
    <!-- heading & btn -->
    <div class="flex items-center justify-between">
      <SubSubHeading text="Editar tipos de habitación" />
      <button
        aria-label="actualizar listado de hoteles"
        class="
          p-2
          rounded-lg
          hover:bg-gray-200
          focus-styles
          focus-visible:ring-brand
        "
        @click="loadRoomTypes"
      >
        <ReloadIcon />
      </button>
    </div>
    <!-- list -->
    <div>
      <ul
        v-if="roomTypes.length"
        class="mt-[30px] grid gap-[20px] md:grid-cols-2"
      >
        <li v-for="rt in roomTypes" :key="rt.id">
          <RoomTypeListItem
            :roomType="rt"
            @editReq="onEditReq"
            @delReq="onDelReq"
          />
        </li>
      </ul>
      <!-- no roomTypes or loading -->
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
          <p>Todavía no hay tipos de habitación .</p>
          <p>Cree uno para empezar.</p>
        </div>
      </div>
    </div>
    <!-- dialogs -->

    <!-- edit  selectedRoomTypeId -->
    <!-- hotel edit dialog  -->
    <div class="max-w-md">
      <transition name="fade">
        <EditRoomTypeDialog
          v-if="editDialogNeeded"
          :selectedRoomType="selectedRoomType"
        />
      </transition>
    </div>
    <!-- dell -->

    <div class="max-w-md">
      <transition name="fade">
        <DellRoomDialog
          v-if="dellDialogNeeded"
          :selectedRoomType="selectedRoomType"
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
import RoomTypeListItem from "./RoomTypeListItem.vue";
import { useLazyQuery } from "~/composables/useLazyQuery";
import { getRoomTypes } from "~/querys/getRoomTypes.js";
import { API_ERRORS, TOAST_TYPES } from "~/db";
import ReloadIcon from "~/components/icons/ReloadIcon.vue";
import { useToastStore } from "~/stores/toast-storage";
import { useRoomTypesStore } from "~/stores/room-types-storage";
import { storeToRefs } from "pinia";
import EditRoomTypeDialog from "./EditRoomTypeDialog.vue";
import useBobyOverflow from "~/composables/useBodyOverflow";
import SubSubHeading from '../../global/SubSubHeading.vue';
import EndSecLine from '../../global/EndSecLine.vue';
import DellRoomDialog from './DellRoomDialog.vue';
const UNAUTHENTICATED = API_ERRORS.UNAUTHENTICATED;
const DB_UNIQUE_CONSTRAINT_ERROR = API_ERRORS.DB_UNIQUE_CONSTRAINT_ERROR;
const FORBIDDEN = API_ERRORS.FORBIDDEN;

export default {
  components: {
    RoomTypeListItem,
    SubSubHeading,
    EndSecLine,
    ReloadIcon,
    EditRoomTypeDialog,
    DellRoomDialog,
    EndSecLine,
    SubSubHeading,
  },

  setup() {
    // data
    // const roomTypes = ref([]);
    const selectedRoomTypeId = ref(null);
    const editDialogNeeded = ref(false);
    const dellDialogNeeded = ref(false);

    // roomType Storage
    const roomTypesStorage = useRoomTypesStore();
    const { populateRoomTypes, getRoomTypeById } = roomTypesStorage;
    const { roomTypes } = storeToRefs(roomTypesStorage);

    const selectedRoomType = computed(() =>
      getRoomTypeById(selectedRoomTypeId.value)
    );

    // storages deps
    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;
    //

    // query
    const {
      loading: isLoading,
      result,
      error,
      load,
    } = useLazyQuery(getRoomTypes);

    // watchers
    // result
    watch(result, (newR) => {
      if (newR?.data?.getRoomTypes) {
        // success
        populateRoomTypes(newR.data.getRoomTypes);
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

    // load fn
    function loadRoomTypes() {
      load();
    }

    provide("loadRoomTypes", loadRoomTypes);
    function mountSec() {
      if (!process.client) {
        return;
      }

      loadRoomTypes();
    }
    onMounted(mountSec);

    // om overflow
    const { hideOverflow, showOverflow } = useBobyOverflow();

    function onEditReq({ id }) {
      selectedRoomTypeId.value = id;
      hideOverflow();
      editDialogNeeded.value = true;
    }
    function onDelReq({ id }) {
      selectedRoomTypeId.value = id;
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
      selectedRoomType,
      isLoading,
      loadRoomTypes,
      roomTypes,

      //
      onEditReq,
      onDelReq,
      //
      editDialogNeeded,
      dellDialogNeeded,
    };
  },
};
</script>

<style>
</style>