<template>
  <div>
    <form @submit.prevent="onSubmit">
      <!-- capacity -->
      <div class="mt-4">
        <label
          for="capacity"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': capacityError,
          }"
        >
          Capacidad
        </label>
        <input
          type="number"
          inputmode="numeric"
          name="capacity"
          class="
            input-field
            focus-effect
            border-gray-800/40 border
            focus:ring-brand
          "
          :disabled="isSending"
          :class="{
            'opacity-60': isSending,
            'text-red-700 border-red-700 focus:ring-red-700': capacityError,
          }"
          v-model="v.capacity.$model"
        />
        <transition name="fade">
          <div class="pl-2 mt-1 text-red-700 text-sm" v-if="capacityError">
            <span aria-hidden="true">*</span>
            <span class="">
              Por favor introduzca una capacidad válida (al menos 1)
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
import { updateRoomCapacity } from "~/querys/updateRoomCapacity";
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
    const capacity = ref(props.room.capacity);

    const rules = {
      capacity: {
        required,
        minValue: minValue(1),
      },
    };
    const v = useVuelidate(rules, {
      capacity,
    });

    const capacityError = computed(
      () => utts.value && v.value.capacity.$invalid
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
      updateRoomCapacity,
      (_result) => {
        loadRooms();
        showToastWithText(
          TOAST_TYPES.success,
          `Capacidad actualizada: ${_result.capacity}`,
          true
        );
      },
      "updateRoomCapacity"
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
          new_capacity: +capacity.value,
        },
      };

      setVariables(variables);
      updateBeds();
    }
    return {
      isSending,
      onSubmit,
      v,
      capacityError,
    };
  },
};
</script>

<style>
</style>