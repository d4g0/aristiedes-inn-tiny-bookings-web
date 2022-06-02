<template>
  <div>
    <form @submit.prevent="onSubmit">
      <!-- number_of_beds -->
      <div class="mt-4">
        <label
          for="number_of_beds"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': bedsError,
          }"
        >
          Número de camas
        </label>
        <input
          type="number"
          inputmode="numeric"
          name="number_of_beds"
          class="
            input-field
            focus-effect
            border-gray-800/40 border
            focus:ring-brand
          "
          :disabled="isSending"
          :class="{
            'opacity-60': isSending,
            'text-red-700 border-red-700 focus:ring-red-700': bedsError,
          }"
          v-model="v.number_of_beds.$model"
        />
        <transition name="fade">
          <div class="pl-2 mt-1 text-red-700 text-sm" v-if="bedsError">
            <span aria-hidden="true">*</span>
            <span class="">
              Por favor introduzca una número válido (al menos 1)
            </span>
          </div>
        </transition>
      </div>

      <SubmitBtn
        :isSending="isSending"
        loadingMsg="Cargando"
        submitText="Actualizar"
        class="mt-[40px]"
      />
    </form>
  </div>
</template>

<script>
import { computed, inject, ref } from "@nuxtjs/composition-api";
import SubmitBtn from "~/components/admin/global/SubmitBtn.vue";
import { required, minValue } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { updateNumberOfBeds } from "~/querys/updateRoomNumberOfBeds";
import { smartQueryLoader } from "~/composables/useSmartQueryControler";
import { useToastStore } from "~/stores/toast-storage";
import { TOAST_TYPES } from "~/db";

export default {
  components: {
    SubmitBtn,
  },
  props: {
    room: {
      SubmitBtntype: Object,
      default: () => ({
        id: 0,
      }),
    },
  },
  setup(props) {
    // ---
    // form
    // ----
    const utts = ref(false);
    const number_of_beds = ref(props.room.number_of_beds);

    const rules = {
      number_of_beds: {
        required,
        minValue: minValue(1),
      },
    };
    const v = useVuelidate(rules, {
      number_of_beds,
    });

    const bedsError = computed(
      () => utts.value && v.value.number_of_beds.$invalid
    );

    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;

    // parent rooms load
    const loadRooms = inject("loadRooms");
    // ---
    // api
    // ---
    const {
      load: updateBeds,
      loading: isSending,
      setVariables,
    } = smartQueryLoader(
      updateNumberOfBeds,
      (_result) => {
        loadRooms();
        showToastWithText(
          TOAST_TYPES.success,
          `Camas actualizadas: ${_result.number_of_beds}`,
          true
        );
      },
      "updateRoomNumberOfBeds"
    );

    // form trigger
    function onSubmit() {
      utts.value = true;

      //   validation
      if (v.value.$invalid) {
        return;
      }

      // hit api
      const variables = {
        input: {
          room_id: props.room.id,
          new_number_of_beds: +number_of_beds.value,
        },
      };

      setVariables(variables);
      updateBeds();
    }
    return {
      isSending,
      onSubmit,
      v,
      bedsError,
    };
  },
};
</script>

<style>
</style>