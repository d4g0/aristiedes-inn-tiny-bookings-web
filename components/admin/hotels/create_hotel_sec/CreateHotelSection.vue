<template>
  <div>
    <SubHeading text="Crear un hotel" />
    <div class="w-full max-w-md">
      <!-- create hotel -->
      <div>
        <CreateHotelForm :isSending="loading" @[CREATE_HOTEL]="onCreateReq" class="mt-[30px]" />
        <div class="border-b border-gray-200 mt-[50px]"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "@nuxtjs/composition-api";
import SubHeading from "~/components/admin/global/SubHeading.vue";
import CreateHotelForm from "./CreateHotelForm.vue";
import { createHotel } from "~/querys/createHotel.js";
import { useLazyQuery } from "~/composables/useLazyAuthQuery";
import { API_ERRORS, EVENTS, TOAST_TYPES } from "~/db";
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";
import { useToastStore } from "~/stores/toast-storage";
const CREATE_HOTEL = EVENTS.ADMIN.HOTELS.CREATE_HOTEL;
const UNAUTHENTICATED = API_ERRORS.UNAUTHENTICATED;
const DB_UNIQUE_CONSTRAINT_ERROR = API_ERRORS.DB_UNIQUE_CONSTRAINT_ERROR;
const FORBIDDEN = API_ERRORS.FORBIDDEN;
export default {
  components: { SubHeading, CreateHotelForm },
  setup() {
    // toast

    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;
    //

    const isLoading = ref(false);
    // auth store
    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);
    //
    // api call
    const { loading, result, error, load, setVariables, setToken } =
      useLazyQuery(createHotel);

    // result
    watch(result, (newR) => {
      // console.log("(watch/result change)");
      // console.log({ result: result.value });
      if (newR?.data?.createHotel) {
        // success
        console.log("Hotel Created");
        // console.log(newR?.data?.createHotel);
        showToastWithText(
          TOAST_TYPES.success,
          `El hotel: ${newR?.data?.createHotel.hotel_name} ha sido creado`,
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
            "Falló al crear el hotel porque ya existe uno con ese nombre",
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

    function onCreateReq(data) {
      console.log("attempting to create hotel: " + data.hotel_name);

      var variables = {
        input: {
          hotel_name: data.hotel_name,
          maximun_free_calendar_days: data.calendar_length,
          minimal_prev_days_to_cancel: 5,
          check_in_hour_time: {
            hours: data.check_in_hour,
            minutes: data.check_in_minute,
          },
          check_out_hour_time: {
            hours: data.check_out_hour,
            minutes: data.check_out_minute,
          },
          iana_time_zone: data.iana_time_zone,
        },
      };
      setToken(token.value);
      setVariables(variables);
      load();
    }
    return {
      CREATE_HOTEL,
      loading,
      onCreateReq,
    };
  },
};
</script>

<style>
</style>