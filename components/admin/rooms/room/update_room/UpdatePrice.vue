<template>
  <div>
    <form @submit.prevent="onSubmit">
      <!-- night_price -->
      <div class="mt-4">
        <label
          for="night_price"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': nightPriceError,
          }"
        >
          Precio de la noche
        </label>
        <input
          type="number"
          inputmode="numeric"
          name="night_price"
          class="
            input-field
            focus-effect
            border-gray-800/40 border
            focus:ring-brand
          "
          :disabled="isSending"
          :class="{
            'opacity-60': isSending,
            'text-red-700 border-red-700 focus:ring-red-700': nightPriceError,
          }"
          v-model="v.night_price.$model"
        />
        <transition name="fade">
          <div class="pl-2 mt-1 text-red-700 text-sm" v-if="nightPriceError">
            <span aria-hidden="true">*</span>
            <span class=""> Por favor introduzca un precio válido </span>
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
import { updateRoomNightPrice } from "~/querys/updateRoomNightPrice";
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
    const night_price = ref(props.room.night_price);

    const rules = {
      night_price: {
        required,
        minValue: minValue(0.01),
      },
    };
    const v = useVuelidate(rules, {
      night_price,
    });

    const nightPriceError = computed(
      () => utts.value && v.value.night_price.$invalid
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
      load: updatePrice,
      loading: isSending,
      setVariables,
    } = smartQueryLoader(
      updateRoomNightPrice,
      (_result) => {
        loadRooms();
        showToastWithText(
          TOAST_TYPES.success,
          `Precio actualizado: ${_result.night_price}`,
          true
        );
      },
      "updateRoomNightPrice"
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
          new_night_price: +night_price.value,
        },
      };

      setVariables(variables);
      updatePrice();
    }
    return {
      isSending,
      onSubmit,
      v,
      nightPriceError,
    };
  },
};
</script>

<style>
</style>