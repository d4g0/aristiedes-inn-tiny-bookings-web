<template>
  <div
    class="
      fixed
      z-10
      inset-0
      w-full
      h-full
      bg-white/90
      backdrop-blur-md
      overflow-auto
    "
  >
    <div
      class="
        w-full
        max-w-xl
        mx-auto
        p-[30px]
        mt-20
        bg-white
        border border-gray-500
        rounded-[16px]
      "
    >
      <!-- h1 & close btn -->
      <div class="flex items-center justify-between">
        <MainHeading text="Elimine la amenidad" />
        <button
          class="
            rounded-full
            p-2
            focus-styles
            -translate-x-2
            hover:bg-gray-300
            dark:hover:bg-gray-600
            text-type-on-light
            dark:text-type-on-dark
          "
          @click="closeDialog"
        >
          <XIcon />
          <span class="sr-only"> Cerrar </span>
        </button>
      </div>

      <!-- hotel edit dell -->
      <div class="mt-[50px]">
        <span class="block font-bold">
          {{ room_amenity_str }}
        </span>
        <p class="mt-4">
          Esta acción es irrecuperable, está completamente seguro que quiere
          eliminarlo ?
        </p>
      </div>

      <div class="mt-[30px] flex items-center justify-between space-x-4">
        <!-- cancel -->
        <button
          @click="closeDialog"
          class="
            rounded-[16px]
            w-full
            p-3
            hover:bg-gray-200
            focus-styles focus:ring-offset-2
          "
        >
          Cancelar
        </button>

        <!-- eliminate -->
        <button
          @click="onDellReq"
          class="
            rounded-[16px]
            w-full
            p-3
            bg-red-500
            dark:bg-red-500
            text-white
            dark:text-white
            font-medium
            focus-styles focus:ring-offset-2
            hover:bg-red-600
            dark:hover:bg-red-600 dark:hover:text-white
            disabled:bg-red-500/60 disabled:cursor-not-allowed
          "
          :disabled="isLoading"
          :class="{
            'opacity-70': isLoading,
          }"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import XIcon from "~/components/icons/XIcon.vue";
import { computed, inject, watch } from "@nuxtjs/composition-api";
import { useLazyQuery } from "~/composables/useLazyAuthQuery";
import { deleteRoomAmenity } from "~/querys/delRoomAmenity";
import { useAuthStore } from "~/stores/auth";
import { useToastStore } from "~/stores/toast-storage";
import { storeToRefs } from "pinia";
import { API_ERRORS, TOAST_TYPES } from "~/db";
import MainHeading from "../../global/MainHeading.vue";
const UNAUTHENTICATED = API_ERRORS.UNAUTHENTICATED;
const FORBIDDEN = API_ERRORS.FORBIDDEN;

export default {
  components: {
    XIcon,
    MainHeading,
    MainHeading,
  },

  props: {
    selectedAmenity: {
      type: Object,
      default: () => ({
        id: 0,
        amenity: "foo-type",
      }),
    },
  },

  setup(props) {
    const room_amenity_str = computed(() => props.selectedAmenity.amenity);
    //
    const hideDelDialog = inject("hideDelDialog");
    function closeDialog() {
      hideDelDialog();
    }

    // api
    const {
      loading: isLoading,
      result,
      error,
      load,
      setVariables,
      setToken,
    } = useLazyQuery(deleteRoomAmenity);

    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;

    // auth store
    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);

    const loadAmenities = inject("loadAmenities");
    // result
    watch(result, (newR) => {
      if (newR?.data?.deleteRoomAmenity) {
        // success
        showToastWithText(
          TOAST_TYPES.success,
          "El amenidad fue eliminada",
          true
        );

        loadAmenities();
        closeDialog();
        return;
      }

      // const temp_err = '';
      if (newR?.errors) {
        console.log("Api error");
        var error = newR.errors[0];

        // console.log(error);
        // UNAUTHENTICATED
        if (error?.extensions?.code == UNAUTHENTICATED) {
          showToastWithText(
            TOAST_TYPES.error,
            "Su sessión ha expirado, vaya a login",
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

        // forgein key error
        if (
          error?.extensions?.exception?.code ==
          API_ERRORS.PRISMA_FORGEIN_KEY_ERROR_CODE
        ) {
          showToastWithText(
            TOAST_TYPES.error,
            `Falló al intertar eliminar: Existen habitaciones que possen este tipo, 
             asígneles otro o elimínelas para poder eliminar este tipo`,
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
          "Fallo al contactar con el API",
          true
        );
      }
    });

    function fetchDellRoomType() {
      const variables = {
        input: {
          amenity: room_amenity_str.value,
        },
      };
      setVariables(variables);
      setToken(token.value);
      load();
    }

    function onDellReq() {
      fetchDellRoomType();
    }

    return {
      closeDialog,
      onDellReq,
      room_amenity_str,
      //
      isLoading,
    };
  },
};
</script>

<style>
</style>