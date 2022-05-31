<template>
  <div>
    <SubSubHeading text="Cree una amenidad" />
    <!-- form -->
    <AmenitiesSecCreateForm class="mt-[30px]" @createReq="fetchCreate" />
    <EndSecLine />
  </div>
</template>

<script>
import EndSecLine from "../../global/EndSecLine.vue";
import SubSubHeading from "../../global/SubSubHeading.vue";
import AmenitiesSecCreateForm from "./AmenitiesSecCreateForm.vue";
import { createRoomAmenity } from "~/querys/createRoomAmenity";
import { useLazyQuery } from "~/composables/useLazyAuthQuery";
import { API_ERRORS, TOAST_TYPES } from "~/db";
import { watch } from "@nuxtjs/composition-api";
import { useToastStore } from "~/stores/toast-storage";
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";

export default {
  components: { SubSubHeading, AmenitiesSecCreateForm, EndSecLine },

  setup() {
    //   data

    // store deps
    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;
    //

    // auth store
    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);

    // api
    const { loading, result, error, load, setVariables, setToken } =
      useLazyQuery(createRoomAmenity);

    // watchers
    // result
    watch(result, (newR) => {
      // console.log("(watch/result change)");
      // console.log({ result: result.value });
      if (newR?.data?.createRoomAmenity) {
        // success
        // console.log(newR?.data?.createRoomAmenity);
        showToastWithText(
          TOAST_TYPES.success,
          `La amenidad: ${newR?.data?.createRoomAmenity.amenity} ha sido creada`,
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
        if (error?.extensions?.code == API_ERRORS.UNAUTHENTICATED) {
          showToastWithText(
            TOAST_TYPES.error,
            "No tiene permiso para realizar esta operación",
            true
          );
        }

        // Duplicated
        if (
          error?.extensions?.exception?.code ==
          API_ERRORS.DB_UNIQUE_CONSTRAINT_ERROR
        ) {
          showToastWithText(
            TOAST_TYPES.error,
            "Falló al crear el hotel porque ya existe uno con ese nombre",
            true
          );
        }

        // FORBIDDEN
        // Duplicated
        if (error?.extensions?.code == API_ERRORS.FORBIDDEN) {
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

    function fetchCreate({ amenity }) {
      var variables = {
        input: {
          amenity,
        },
      };

      setVariables(variables);
      setToken(token.value);
      load();
    }

    return {
      loading,
      fetchCreate,
    };
  },
};
</script>

<style>
</style>