<template>
  <div>
    <SubSubHeading text="Crear un nuevo tipo de habitación" />
    <RoomTypeCreateForm
      class="mt-[30px]"
      @createReq="onCreateReq"
      :isSending="loading"
    />

    <div class="border-b border-gray-200 mt-[50px]"></div>
  </div>
</template>

<script>
import SubSubHeading from "../global/SubSubHeading.vue";
import RoomTypeCreateForm from "./RoomTypeCreateForm.vue";
import { createRoomType } from "~/querys/createRoomType";
import { useLazyQuery } from "~/composables/useLazyAuthQuery";
import { useToastStore } from "~/stores/toast-storage";
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";
import { watch } from "@nuxtjs/composition-api";
import { API_ERRORS, TOAST_TYPES } from "~/db";
const UNAUTHENTICATED = API_ERRORS.UNAUTHENTICATED;
const DB_UNIQUE_CONSTRAINT_ERROR = API_ERRORS.DB_UNIQUE_CONSTRAINT_ERROR;
const FORBIDDEN = API_ERRORS.FORBIDDEN;

export default {
  components: {
    SubSubHeading,
    RoomTypeCreateForm,
  },

  setup() {
    //   query
    const { result, error, loading, load, setVariables, setToken } =
      useLazyQuery(createRoomType);

    // watchers
    // result
    watch(result, (newR) => {
      if (newR?.data?.createRoomType) {
        // success
        showToastWithText(
          TOAST_TYPES.success,
          `El tipo: ${newR?.data?.createRoomType.room_type} ha sido creado`,
          true
        );
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
          "Fallo al contactar con el API",
          true
        );
      }
    });

    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;
    //

    // auth store
    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);

    function onCreateReq(data) {
      const variables = {
        input: data,
      };
      setVariables(variables);
      setToken(token.value);
      load();
    }

    return {
      onCreateReq,
      loading,
    };
  },
};
</script>

<style>
</style>