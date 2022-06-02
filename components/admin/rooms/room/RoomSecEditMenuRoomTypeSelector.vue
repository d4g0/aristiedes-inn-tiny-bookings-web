<template>
  <div>
    <SubHeading text="Tipo"/>
    <form class="mt-[30px]" @submit.prevent="onFormSubmit">
      <!-- user role -->
      <div class="mt-4">
        <label
          for="room_type_selector"
          class="label pl-2"
          :class="{
            'opacity-60': isLoading,
            'text-red-700': roomTypeError,
          }"
        >
          Tipo de habitación:
        </label>
        <select
          v-model="v.room_type_id.$model"
          name="room_type_selector"
          id="room_type_selector"
          class="
            w-full
            input-field
            focus-effect
            border-gray-800/40 border
            focus:ring-brand
          "
          :disabled="isLoading"
          :class="{
            'opacity-60': isLoading,
            'text-red-700 border-red-700 focus:ring-red-700': roomTypeError,
          }"
        >
          <option value="" disabled selected>Por favor seleccione</option>
          <option
            v-for="type in roomTypes"
            :key="type.id"
            :value="type.id"
            :selected="room_type_id == type.id"
          >
            {{ type.room_type }}
          </option>
        </select>

        <transition name="fade">
          <div class="pl-2 mt-1 text-red-700 text-sm" v-if="roomTypeError">
            <span aria-hidden="true">*</span>
            <span class=""> Por favor seleccione un tipo </span>
          </div>
        </transition>
      </div>

      <!-- submit -->
      <div class="mt-[40px] relative">
        <button
          class="
            rounded-[16px]
            p-3
            bg-black
            dark:bg-type-on-dark
            text-white
            dark:text-type-on-light
            w-full
            font-medium
            focus-styles focus:ring-offset-2
            hover:bg-brand
            dark:hover:bg-brand dark:hover:text-white
            disabled:bg-brand/60 disabled:cursor-not-allowed
          "
          :disabled="isLoading"
          :class="{
            'opacity-70': isLoading,
          }"
        >
          Actualizar
        </button>

        <!-- spinner -->
        <transition name="fade">
          <div
            v-if="isLoading"
            class="
              absolute
              top-0
              left-0
              w-full
              h-full
              flex
              justify-start
              items-center
              pl-4
            "
          >
            <div
              class="
                spinner-border
                animate-spin
                inline-block
                w-8
                h-8
                border-4
                rounded-full
              "
              role="status"
            >
              <span class="sr-only">Cargando</span>
            </div>
          </div>
        </transition>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from "@vuelidate/validators";
import { computed, inject, ref } from "@nuxtjs/composition-api";
import { isInCollection } from "~/utils";
import useVuelidate from "@vuelidate/core";
import { useRoomTypesStore } from "~/stores/room-types-storage";
import { storeToRefs } from "pinia";
import { smartQueryLoader } from "~/composables/useSmartQueryControler";
import { useToastStore } from "~/stores/toast-storage";
import { TOAST_TYPES } from "~/db";
import { updateARoomIsType } from "~/querys/updateARoomIsType";
import SubHeading from "~/components/admin/global/SubHeading.vue";

export default {
  components: {
    SubHeading,
  },
  props: {
    room: {
      type: Object,
      default: () => ({
        id: 0,
        room_name: "Supper Nice Room",
        room_type_id: 0,
        room_type_key: "Room Type",
      }),
    },
  },
  setup(props) {
    //   form

    // current room type if any
    const initialRoomType = {
      id: props.room?.room_type_id,
      room_type: props.room?.room_type_key,
    };
    const room_type_id = ref(initialRoomType.id || null);

    const roomTypesStore = useRoomTypesStore();
    const { roomTypes } = storeToRefs(roomTypesStore);

    const utts = ref(false);
    const rules = {
      room_type_id: {
        required,
        inRoomTypesIds: (id) => isInCollection(roomTypes.value, "id", id),
      },
    };

    const v = useVuelidate(rules, { room_type_id });

    const roomTypeError = computed(
      () => utts.value && v.value.room_type_id.$invalid
    );

    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;

    const loadRooms = inject("loadRooms");
    // query
    const {
      load: updateTheRoomIsType,
      loading: isLoading,
      setVariables,
    } = smartQueryLoader(
      updateARoomIsType,
      (_result) => {
        loadRooms();
        showToastWithText(TOAST_TYPES.success, "Tipo Actualizado", true);
      },
      "updateARoomIsType"
    );
    function onFormSubmit() {
      utts.value = true;

      //  form ok
      if (!v.value.$invalid) {
        // hit api
        const variables = {
          input: {
            room_id: props.room.id,
            room_type_id: room_type_id.value,
          },
        };
        setVariables(variables);
        updateTheRoomIsType();
      }
    }

    return {
      isLoading,
      roomTypeError,
      v,
      roomTypes,
      room_type_id,
      onFormSubmit,
    };
  },
};
</script>

<style>
</style>