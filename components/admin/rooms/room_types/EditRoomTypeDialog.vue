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
        <MainHeading text="Edite el tipo de habitación" class="max-w-[80%]" />
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

      <!-- hotel edit checkin form -->
      <div class="mt-[50px]">
        <EditRoomTypeDialogForm
          :actualRoomType="room_type_str"
          :isSending="loading"
          @editReq="onEditReq"
        />
      </div>
    </div>
  </div>
</template>

<script>
import XIcon from "~/components/icons/XIcon.vue";
import { computed, inject, watch } from "@nuxtjs/composition-api";
import EditRoomTypeDialogForm from "./EditRoomTypeDialogForm.vue";
import { useLazyQuery } from "~/composables/useLazyAuthQuery";
import { updateRoomType } from "~/querys/updateRoomType";
import { useAuthStore } from "~/stores/auth";
import { useToastStore } from "~/stores/toast-storage";
import { storeToRefs } from "pinia";
import { API_ERRORS, TOAST_TYPES } from "~/db";
import MainHeading from '../../global/MainHeading.vue';
const UNAUTHENTICATED = API_ERRORS.UNAUTHENTICATED;
const FORBIDDEN = API_ERRORS.FORBIDDEN;

export default {
  components: {
    XIcon,
    MainHeading,
    EditRoomTypeDialogForm,
    MainHeading,
  },
  props: {
    selectedRoomType: {
      type: Object,
      default: () => ({
        id: 0,
        room_type: "foo-type",
      }),
    },
  },

  setup(props) {
    const room_type_str = computed(() => props.selectedRoomType.room_type);
    //
    const hideEditDialog = inject("hideEditDialog");
    function closeDialog() {
      hideEditDialog();
    }

    // stores deps

    // auth

    // api
    const { loading, result, error, load, setVariables, setToken } =
      useLazyQuery(updateRoomType);

    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;

    // auth store
    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);

    const loadRoomTypes = inject("loadRoomTypes");
    // result
    watch(result, (newR) => {
      // console.log("(watch/result change)");
      // console.log({ result: result.value });
      if (newR?.data?.updateRoomType) {
        // success
        showToastWithText(TOAST_TYPES.success, "El tipo fue actualizado", true);

        loadRoomTypes();
        closeDialog();
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

    function fetchUpdateRoomType(new_room_type) {
      const variables = {
        input: {
          room_type: room_type_str.value,
          new_room_type: new_room_type,
        },
      };

      setVariables(variables);
      setToken(token.value);
      load();
    }

    function onEditReq({ room_type }) {
      fetchUpdateRoomType(room_type);
    }

    return {
      closeDialog,
      onEditReq,
      room_type_str,
      //
      loading,
    };
  },
};
</script>

<style>
</style>