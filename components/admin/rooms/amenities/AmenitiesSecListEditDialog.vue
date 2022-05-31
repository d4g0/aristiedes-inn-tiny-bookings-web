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
        <MainHeading text="Edite la amenidad" class="max-w-[80%]" />
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
        <AmenitiesSecListEditDialogForm
          :actualRoomAmenityStr="room_amenity_str"
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
import { useLazyQuery } from "~/composables/useLazyAuthQuery";
import { updateRoomAmenity } from "~/querys/updateRoomAmenity";
import { useAuthStore } from "~/stores/auth";
import { useToastStore } from "~/stores/toast-storage";
import { storeToRefs } from "pinia";
import { API_ERRORS, TOAST_TYPES } from "~/db";
import MainHeading from "../../global/MainHeading.vue";
import AmenitiesSecListEditDialogForm from "./AmenitiesSecListEditDialogForm.vue";
const UNAUTHENTICATED = API_ERRORS.UNAUTHENTICATED;
const FORBIDDEN = API_ERRORS.FORBIDDEN;

export default {
  components: {
    XIcon,
    MainHeading,
    AmenitiesSecListEditDialogForm,
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
    const hideEditDialog = inject("hideEditDialog");
    function closeDialog() {
      hideEditDialog();
    }

    // stores deps

    // auth

    // apia
    const { loading, result, error, load, setVariables, setToken } =
      useLazyQuery(updateRoomAmenity);

    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;

    // auth store
    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);

    const loadAmenities = inject("loadAmenities");
    // result
    watch(result, (newR) => {
      const payload = newR?.data?.updateRoomAmenity;
      if (payload) {
        // success
        showToastWithText(
          TOAST_TYPES.success,
          "La amenidad fue actualizada",
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

    function fetchUpdateRoomType(new_room_amenity) {
      const variables = {
        input: {
          amenity: room_amenity_str.value,
          new_amenity: new_room_amenity.trim(),
        },
      };

      setVariables(variables);
      setToken(token.value);
      load();
    }

    function onEditReq({ amenity }) {
      fetchUpdateRoomType(amenity);
    }

    return {
      closeDialog,
      onEditReq,
      room_amenity_str,
      //
      loading,
    };
  },
};
</script>

<style>
</style>