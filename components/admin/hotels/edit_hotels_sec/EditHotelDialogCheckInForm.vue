<template>
  <form @submit.prevent="onCheckInSubmit">
    <SubHeading text="Entrada" />
    <!-- Check in time  -->
    <div class="mt-[30px]">
      <span
        for="calendar_length"
        class="label pl-2"
        :class="{
          'opacity-60': isSending,
          'text-red-700': checkInHourError || checkInMinuteError,
        }"
      >
        Hora - Minuto (24h)
      </span>
      <!-- inputs -->
      <div class="flex items-center justify-between gap-8">
        <!-- check in hour -->
        <div>
          <label for="check_in_hour" class="sr-only">Hora</label>
          <input
            type="number"
            name="check_in_hour"
            inputmode="numeric"
            class="
              input-field
              focus-effect
              border-gray-800/40 border
              focus:ring-brand
            "
            :disabled="isSending"
            :class="{
              'opacity-60': isSending,
              'text-red-700 border-red-700 focus:ring-red-700':
                checkInHourError,
            }"
            v-model="v_check_in.check_in_hour.$model"
          />
        </div>
        <!-- check in minute -->
        <div>
          <label for="check_in_minute" class="sr-only">Minuto</label>
          <input
            type="number"
            name="check_in_minute"
            inputmode="numeric"
            class="
              input-field
              focus-effect
              border-gray-800/40 border
              focus:ring-brand
            "
            :disabled="isSending"
            :class="{
              'opacity-60': isSending,
              'text-red-700 border-red-700 focus:ring-red-700':
                checkInMinuteError,
            }"
            v-model="v_check_in.check_in_minute.$model"
          />
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <div class="pl-2 mt-1 text-red-700 text-sm" v-if="checkInHourError">
          <span aria-hidden="true">*</span>
          <span class="">
            Por favor introduzca una hora válida, entre 0 y 23
          </span>
        </div>

        <div
          class="pl-2 mt-1 text-red-700 text-sm"
          v-else-if="checkInMinuteError"
        >
          <span aria-hidden="true">*</span>
          <span class="">
            Por favor introduzca un minuto válido, entre 0 y 59
          </span>
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
        :disabled="isSending"
        :class="{
          'opacity-70': isSending,
        }"
      >
        Actualizar
      </button>

      <!-- spinner -->
      <transition name="fade">
        <div
          v-if="isSending"
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
</template>

<script>
import {
  computed,
  inject,
  onMounted,
  ref,
  watch,
} from "@nuxtjs/composition-api";
import XIcon from "~/components/icons/XIcon.vue";
import { useHotelListStore } from "~/stores/hotel-list-storage";
import SubHeading from "../../global/SubHeading.vue";
import useVuelidate from "@vuelidate/core";
import { required, maxValue, minValue } from "@vuelidate/validators";
import MainHeading from "../../global/MainHeading.vue";
import { updateHotelCheckIn } from "~/querys/updateHotelCheckIn.js";
import { useLazyQuery } from "~/composables/useLazyAuthQuery.js";
import { useToastStore } from "~/stores/toast-storage";
import { API_ERRORS, EVENTS, TOAST_TYPES } from "~/db";
import { sqlTimeStrToTimeObj } from "~/utils";
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";
const UNAUTHENTICATED = API_ERRORS.UNAUTHENTICATED;
const DB_UNIQUE_CONSTRAINT_ERROR = API_ERRORS.DB_UNIQUE_CONSTRAINT_ERROR;
const FORBIDDEN = API_ERRORS.FORBIDDEN;

export default {
  components: { XIcon, SubHeading, MainHeading },
  props: {
    selectedHotelId: {
      type: Number,
    },
  },

  setup(props, { emit }) {
    const hotelsStore = useHotelListStore();
    const { getHotelById } = hotelsStore;
    const hotel = ref();

    // hotel times
    const check_in_hour = ref(12);
    const check_in_minute = ref(0);
    //

    const utts_check_in = ref(false);
    //
    // validation rules
    const ci_rules = {
      check_in_hour: {
        required,
        minValue: minValue(0),
        maxValue: maxValue(23),
      },
      check_in_minute: {
        required,
        minValue: minValue(0),
        maxValue: maxValue(59),
      },
    };

    const v_check_in = useVuelidate(ci_rules, {
      check_in_hour,
      check_in_minute,
    });

    const {
      loading: isSending,
      setVariables,
      setToken,
      load,
      result,
      error,
    } = useLazyQuery(updateHotelCheckIn);

    // check_in_hour error
    const checkInHourError = computed(
      () => utts_check_in.value && v_check_in.value.check_in_hour.$invalid
    );
    // check_in_minute
    const checkInMinuteError = computed(
      () => utts_check_in.value && v_check_in.value.check_in_minute.$invalid
    );

    // auth store
    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);

    function onCheckInSubmit() {
      utts_check_in.value = true;

      // emit
      if (!v_check_in.value.$invalid) {
        setToken(token.value);
        const variables = {
          input: {
            hotel_id: props.selectedHotelId,
            check_in_hour_time: {
              hours: parseInt(check_in_hour.value),
              minutes: parseInt(check_in_minute.value),
            },
          },
        };
        console.log("hiting check in edit api with");
        console.log(variables);
        setVariables(variables);
        // hit edit api
        load();
      }
    }

    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;
    //

    // parent fn
    const loadHotels = inject("loadHotels");
    const closeDialog = inject("closeDialog");

    // result
    watch(result, (newR) => {
      // console.log("(watch/result change)");
      // console.log({ result: result.value });
      if (newR?.data?.updateHotelCheckIn) {
        // success
        console.log("Hotel Check in updated");
        // console.log(newR?.data?.createHotel);
        showToastWithText(
          TOAST_TYPES.success,
          `El check in del hotel: ${newR?.data?.updateHotelCheckIn.hotel_name} ha sido actualizado`,
          true
        );

        closeDialog();
        loadHotels();
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
            "Fallo al crear el hotel porque ya existe uno con ese nombre",
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
          "Fallo al contactar con el API",
          true
        );
      }
    });

    function init() {
      // init current hotel values
      hotel.value = getHotelById(props.selectedHotelId);
      const timeObj = sqlTimeStrToTimeObj(hotel.value.check_in_hour_time);
      // console.log(timeObj);
      check_in_hour.value = timeObj.hour;
      check_in_minute.value = timeObj.minute;
    }

    onMounted(init);

    return {
      hotel,
      isSending,
      onCheckInSubmit,
      v_check_in,
      checkInHourError,
      checkInMinuteError,
    };
  },
};
</script>

<style>
</style>