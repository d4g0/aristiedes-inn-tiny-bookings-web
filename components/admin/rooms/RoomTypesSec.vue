<template>
  <div>
    <SubHeading text="Tipos de habitación" />
    <!-- [create] -->
    <RoomTypeCreateSec class="mt-[50px]"/>

    
    <!-- [list / edit / dell]  |-> loadRoomTypes()  loading-->
  </div>
</template>

<script>
import { onMounted, provide, ref, watch } from "@nuxtjs/composition-api";
import SubHeading from "../global/SubHeading.vue";
import { useLazyQuery } from "~/composables/useLazyAuthQuery";
import { getRoomTypesQuery } from "~/querys/roomTypes.js";
import { useRoomTypesStore } from "~/stores/room-types-storage";
import { storeToRefs } from "pinia";
import RoomTypeCreateSec from "./RoomTypeCreateSec.vue";
export default {
  components: {
    SubHeading,
    RoomTypeCreateSec,
  },

  setup(props) {
    const roomTypesStorage = useRoomTypesStore();
    const { roomTypes } = storeToRefs(roomTypesStorage);
    const { populateRoomTypes } = roomTypesStorage;

    const { result, error, loading, load } = useLazyQuery(getRoomTypesQuery);

    // result
    // watch(result, (newR) => {
    //   // console.log("(watch/result change)");
    //   // console.log({ result: result.value });
    //   if (newR?.data?.getRoomTypes) {
    //     // success
    //     console.log("Hotels Loaded");
    //     populateRoomTypes(newR.data.getRoomTypes);
    //     return;
    //   }

    //   // const temp_err = '';
    //   if (newR?.errors) {
    //     console.log("Api error");
    //     var error = newR.errors[0];
    //     console.log(error);

    //     // errors
    //     return;
    //   }
    // });
    // // error
    // watch(error, (newE) => {
    //   if (newE) {
    //     console.log("fetch error");
    //     console.log(newE);
    //     showToastWithText(
    //       TOAST_TYPES.error,
    //       "Fallo al contactar con el API",
    //       true
    //     );
    //   }
    // });

    // onMounted(mountSec);

    function mountSec() {
      // loadRoomTypes();
    }

    function loadRoomTypes() {
      load();
    }

    provide("loadRoomTypes", loadRoomTypes);
    return { roomTypes, loading };
  },
};
</script>

<style>
</style>