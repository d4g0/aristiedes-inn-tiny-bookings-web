<template>
  <div>
    <form @submit.prevent="onSubmit">
      <!-- Room Name -->
      <div class="mt-4">
        <label
          for="room_name"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': roomNameError,
          }"
        >
          Nombre
        </label>
        <input
          type="text"
          name="room_name"
          class="
            input-field
            focus-effect
            border-gray-800/40 border
            focus:ring-brand
          "
          :disabled="isSending"
          :class="{
            'opacity-60': isSending,
            'text-red-700 border-red-700 focus:ring-red-700': roomNameError,
          }"
          v-model="v.room_name.$model"
        />
        <transition name="fade">
          <div class="pl-2 mt-1 text-red-700 text-sm" v-if="roomNameError">
            <span aria-hidden="true">*</span>
            <span class=""> Por favor introduzca un nombre válido </span>
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
import { required, minLength, maxLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { updateRoomName } from "~/querys/updateRoomName";
import { smartQueryLoader } from "~/composables/useSmartQueryControler";
import { useToastStore } from '~/stores/toast-storage';
import { TOAST_TYPES } from '~/db';

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
    const room_name = ref(props.room.room_name);
    const rules = {
      room_name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(20),
      },
    };
    const v = useVuelidate(rules, {
      room_name,
    });

    const roomNameError = computed(
      () => utts.value && v.value.room_name.$invalid
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
      load: updateName,
      loading: isSending,
      setVariables,
    } = smartQueryLoader(
      updateRoomName,
      (_result) => {
        loadRooms();
        showToastWithText(
          TOAST_TYPES.success,
          `Nombre actualizado: ${_result.room_name}`,
          true
        );
      },
      "updateRoomName"
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
          room_name: room_name.value,
        },
      };

      setVariables(variables);
      updateName();
    }
    return {
      isSending,
      onSubmit,
      v,
      roomNameError,
    };
  },
};
</script>

<style>
</style>