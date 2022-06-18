<template>
  <div class="max-w-md">
    <sub-heading text="Bloque una habitacion" />

    <div class="mt-[30px]">
      <form @submit.prevent="onSubmit">
        <!-- room selector -->
        <div class="mt-[50px]">
          <label for="room_selector" class="label pl-2">Habitación: </label>
          <select
            name=""
            id="room_selector"
            v-model="selectedRoomId"
            class="
              w-full
              input-field
              focus-effect
              border-gray-800/40 border
              focus:ring-brand
            "
          >
            <option disabled>Por favor seleccione</option>
            <option v-for="room in rooms" :key="room.id" :value="room.id">
              <span> {{ room.room_name }} </span>
            </option>
          </select>
        </div>
        <!-- reason -->
        <div class="mt-4">
          <label
            for="reason"
            class="label pl-2"
            :class="{
              'opacity-60': isSending,
            }"
          >
            Razón:
          </label>
          <input
            type="text"
            id="reason"
            class="
              input-field
              focus-effect
              border-gray-800/40 border
              focus:ring-brand
            "
            :disabled="isSending"
            :class="{
              'opacity-60': isSending,
            }"
            v-model="reason"
          />
        </div>

        <!-- date in -->
        <div class="mt-4">
          <label
            for="end_date"
            class="label pl-2"
            :class="{
              'opacity-60': isSending,
            }"
          >
            <span> Fecha de inicio : </span>

            <DateTimePickerSimple
              :initialDate="start_date"
              @DATES_SELECTED="onStartDateSelection"
            />
          </label>
        </div>

        <!-- date out -->
        <div class="mt-4">
          <label
            for="end_date"
            class="label pl-2"
            :class="{
              'opacity-60': isSending,
            }"
          >
            <span> Fecha de fin : </span>

            <DateTimePickerSimple
              :initialDate="end_date"
              @DATES_SELECTED="onEndDateSelection"
            />
          </label>
        </div>

        <!-- submitt -->
        <SubmitBtn
          :isSending="isSending"
          submitText="Bloquear"
          class="mt-[30px]"
        />
      </form>
    </div>
    <!-- debug -->
    <!-- <pre class="overflow-x-auto">
          <code>
  start_date:
  {{start_date}}
  -
  utc_start_date_str:
  {{utc_start_date_str}}
  ----
  end_date:
  {{end_date}}
  -
  utc_end_date_str:
  {{utc_end_date_str}}
          </code>
        </pre> -->
  </div>
</template>

<script>
import { computed, ref } from "@nuxtjs/composition-api";
import SubHeading from "../global/SubHeading.vue";
import SubmitBtn from "../global/SubmitBtn.vue";
import DateTimePickerSimple from "../global/DateTimePickerSimple.vue";
import { utc_zoned_keeping_local } from "~/utils";
import { useToastStore } from "~/stores/toast-storage";
import { API_ERRORS, TOAST_TYPES } from "~/db";
import { smartQueryLoader } from "~/composables/smartQueryLoader";
import { createARoomLockPeriod } from "~/querys/createARoomLockPeriod";

export default {
  components: {
    SubHeading,
    SubmitBtn,
    DateTimePickerSimple,
  },
  props: {
    rooms: {
      type: Array,
      default: () => [
        {
          id: 0,
        },
      ],
    },
  },
  setup(props) {
    const selectedRoomId = ref();
    const reason = ref("Mantenimiento");
    const start_date = ref(new Date());
    const end_date = ref(new Date());

    const utc_start_date_str = computed(() =>
      utc_zoned_keeping_local(start_date.value)
    );

    const utc_end_date_str = computed(() =>
      utc_zoned_keeping_local(end_date.value)
    );

    function onStartDateSelection({ date }) {
      start_date.value = date;
    }

    function onEndDateSelection({ date }) {
      end_date.value = date;
    }

    const formValid = computed(
      () =>
        start_date.value &&
        end_date.value &&
        reason.value.length &&
        (selectedRoomId.value || selectedRoomId.value === 0)
    );

    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;

    // api
    const {
      load: reqRoomBlock,
      loading: isSending,
      setVariables,
    } = smartQueryLoader(
      createARoomLockPeriod,
      (_r) => {
        // console.log(_r);
        showToastWithText(
          TOAST_TYPES.success,
          "Habitacion bloqueada exitosamente",
          true
        );
      },
      "createARoomLockPeriod",
      (_error) => {
        console.log(_error);
        console.log('code:' , _error?.extensions?.exception?.code);
        if (_error?.extensions?.exception?.code == API_ERRORS.ROOM_NOT_AVAILABLE) {
          showToastWithText(
            TOAST_TYPES.error,
            "La habitacion no esta disponible en ese rango, revise en el calendario.",
            true
          );
        }
      }
    );

    function onSubmit() {
      if (!formValid.value) {
        // error toast
        return showToastWithText(
          TOAST_TYPES.error,
          "Todos los campos deben llenarse",
          true
        );
      }

      // api
      triggerBlockReq();
    }

    function triggerBlockReq() {
      const variables = {
        input: {
          room_id: selectedRoomId.value,
          reason: reason.value,
          start_date: utc_start_date_str.value,
          end_date: utc_end_date_str.value,
        },
      };
      setVariables(variables);
      reqRoomBlock();
    }

    return {
      onSubmit,
      selectedRoomId,
      isSending,
      reason,
      start_date,
      end_date,
      onStartDateSelection,
      onEndDateSelection,
      utc_start_date_str,
      utc_end_date_str,
    };
  },
};
</script>

<style>
</style>