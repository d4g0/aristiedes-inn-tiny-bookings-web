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
        <MainHeading text="Elimine el hotel" />
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
          @click="$emit('dellDialog')"
        >
          <XIcon />
          <span class="sr-only"> Cerrar </span>
        </button>
      </div>

      <!-- hotel edit dell -->
      <div class="mt-[50px]">
        <p>
          Esta acción es irrecuperable, está completamente seguro que quiere
          eliminarlo ?
        </p>
      </div>

      <div class="mt-[30px] flex items-center justify-between space-x-4">
        <!-- cancel -->
        <button
          @click="$emit('dellDialog')"
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
import SubHeading from "../../global/SubHeading.vue";
import MainHeading from "../../global/MainHeading.vue";
import { inject, provide, watch } from "@nuxtjs/composition-api";
import Dialog from "../../global/Dialog.vue";
import { useLazyQuery } from "~/composables/useLazyAuthQuery";
import { genDellHotelQuery } from "~/querys/deleteHotel";
import { TOAST_TYPES } from "~/db";
import { useToastStore } from "~/stores/toast-storage";
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";

export default {
  components: {
    XIcon,
    SubHeading,
    MainHeading,
    Dialog,
  },
  props: {
    selectedHotelId: {
      type: Number,
    },
  },

  setup(props, { emit }) {
    function closeDialog() {
      emit("dellDialog");
    }
    provide("closeDialog", closeDialog);
    const loadHotels = inject("loadHotels");

    const delHotelQuery = genDellHotelQuery(+props.selectedHotelId);
    const {
      loading: isLoading,
      setToken,
      load,
      result,
      error,
    } = useLazyQuery(delHotelQuery);

    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;
    //

    // result
    watch(result, (newR) => {
      // console.log("(watch/result change)");
      // console.log({ result: result.value });
      if (newR?.data?.delHotel) {
        // success
        // console.log("Hotel has been deleted");
        // console.log(newR?.data?.createHotel);
        showToastWithText(
          TOAST_TYPES.success,
          `El hotel: ${newR?.data?.delHotel.hotel_name} ha sido eliminado`,
          true
        );

        closeDialog();
        loadHotels();
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
            "Fallo al crear el hotel porque ya existe uno con ese nombre",
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

    // auth store
    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);

    function onDellReq() {
      setToken(token.value);
      load();
    }

    return {
      onDellReq,
      isLoading,
    };
  },
};
</script>

<style>
</style>