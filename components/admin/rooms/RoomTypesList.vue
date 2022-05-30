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

    <ul
      v-if="roomTypes.length"
      class="mt-[30px] grid gap-[20px] md:grid-cols-2"
    >
      <li v-for="rt in roomTypes" :key="rt.id">
        <RoomTypeListItem :roomType="rt" />
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
    <EndSecLine />
  </div>
</template>

<script>
import { onMounted, ref, watch } from "@nuxtjs/composition-api";
import RoomTypeListItem from "./RoomTypeListItem.vue";
import { useLazyQuery } from "~/composables/useLazyQuery";
import { getRoomTypes } from "~/querys/getRoomTypes.js";
import { API_ERRORS, TOAST_TYPES } from "~/db";
import SubSubHeading from "../global/SubSubHeading.vue";
import EndSecLine from "../global/EndSecLine.vue";
import ReloadIcon from "~/components/icons/ReloadIcon.vue";
const UNAUTHENTICATED = API_ERRORS.UNAUTHENTICATED;
const DB_UNIQUE_CONSTRAINT_ERROR = API_ERRORS.DB_UNIQUE_CONSTRAINT_ERROR;
const FORBIDDEN = API_ERRORS.FORBIDDEN;

export default {
  components: {
    RoomTypeListItem,
    SubSubHeading,
    EndSecLine,
    ReloadIcon,
  },


  setup() {
    // data
    const roomTypes = ref([]);

    // storages deps

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

        roomTypes.value = newR.data.getRoomTypes;
        console.log("room types loa ok");
        console.log(newR?.data?.getRoomTypes);

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
    function mountSec() {
      if (!process.client) {
        return;
      }

      loadRoomTypes();
    }
    onMounted(mountSec);

    return {
      isLoading,
      loadRoomTypes,
      roomTypes,
    };
  },
};
</script>

<style>
</style>