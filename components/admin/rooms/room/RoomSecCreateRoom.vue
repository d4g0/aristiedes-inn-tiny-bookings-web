<template>
  <div>
    <SubHeading text="Cree una habitación" />
    <RoomSecCreateRoomForm
      class="max-w-md mt-[30px]"
      :isSending="loading"
      @formSubmition="onCreateSubmition"
    />
    <EndSecLine />
  </div>
</template>

<script>
import { watch } from "@vue/composition-api";
import { useLazyQuery } from "~/composables/useLazyAuthQuerySmart_2";
import { API_ERRORS, TOAST_TYPES } from "~/db";
import { useToastStore } from "~/stores/toast-storage";
import EndSecLine from "../../global/EndSecLine.vue";
import SubHeading from "../../global/SubHeading.vue";
import RoomSecCreateRoomForm from "./RoomSecCreateRoomForm.vue";
import { createRoom } from "~/querys/createRoom.js";
export default {
  components: {
    SubHeading,
    RoomSecCreateRoomForm,
    EndSecLine,
  },
  props: {
    hotelId: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    // api call

    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;
    //

    const { loading, setVariables, load, result, error } =
      useLazyQuery(createRoom);

    // result
    watch(result, (newR) => {
      if (newR?.data?.createRoom) {
        // success
        showToastWithText(
          TOAST_TYPES.success,
          `La habitación: ${newR?.data?.createRoom.room_name} ha sido creada`,
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

    function onCreateSubmition({
      room_name,
      night_price,
      capacity,
      number_of_beds,
    }) {
      const variables = {
        input: {
          hotel_id: props.hotelId,
          room_name,
          night_price,
          capacity,
          number_of_beds,
        },
      };

      setVariables(variables);
      load();
    }
    return {
      loading,
      onCreateSubmition,
    };
  },
};
</script>

<style>
</style>