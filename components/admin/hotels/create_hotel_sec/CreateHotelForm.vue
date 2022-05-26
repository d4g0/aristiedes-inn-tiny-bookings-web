<template>
  <div class="w-full">
    <form @submit.prevent="onFormSubmit">
      <!-- Hotel Name -->
      <div class="mt-4">
        <label
          for="hotel_name"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': hotelNameError,
          }"
        >
          Nombre del hotel
        </label>
        <input
          type="text"
          name="hotel_name"
          class="
            input-field
            focus-effect
            border-gray-800/40 border
            focus:ring-brand
          "
          :disabled="isSending"
          :class="{
            'opacity-60': isSending,
            'text-red-700 border-red-700 focus:ring-red-700': hotelNameError,
          }"
          v-model="v.hotel_name.$model"
        />
        <transition name="fade">
          <div class="pl-2 mt-1 text-red-700 text-sm" v-if="hotelNameError">
            <span aria-hidden="true">*</span>
            <span class=""> Por favor introduzca un nombre válido </span>
          </div>
        </transition>
      </div>

      <!-- Calendar Length  -->
      <div class="mt-4">
        <label
          for="calendar_length"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': calendarLengthError,
          }"
        >
          Longitud del calendario
        </label>
        <input
          type="number"
          name="calendar_length"
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
              calendarLengthError,
          }"
          v-model="v.calendar_length.$model"
        />
        <transition name="fade">
          <div
            class="pl-2 mt-1 text-red-700 text-sm"
            v-if="calendarLengthError"
          >
            <span aria-hidden="true">*</span>
            <span class="">
              Por favor introduzca un número válido, entre 10 y 90
            </span>
          </div>
        </transition>
      </div>

      <!-- Check in time  -->
      <div class="mt-4">
        <span
          for="calendar_length"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': checkInHourError || checkInMinuteError,
          }"
        >
          Hora de entrada (24h)
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
              v-model="v.check_in_hour.$model"
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
              v-model="v.check_in_minute.$model"
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

      <!-- Check out time  -->
      <div class="mt-4">
        <span
          for="calendar_length"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': checkOutHourError || checkOutMinuteError,
          }"
        >
          Hora de salida (24h)
        </span>
        <!-- inputs -->
        <div class="flex items-center justify-between gap-8">
          <!-- check in hour -->
          <div>
            <label for="check_out_hour" class="sr-only">Hora</label>
            <input
              type="number"
              name="check_out_hour"
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
                  checkOutHourError,
              }"
              v-model="v.check_out_hour.$model"
            />
          </div>
          <!-- check in minute -->
          <div>
            <label for="check_out_minute" class="sr-only">Minuto</label>
            <input
              type="number"
              name="check_out_minute"
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
                  checkOutMinuteError,
              }"
              v-model="v.check_out_minute.$model"
            />
          </div>
        </div>

        <transition name="fade" mode="out-in">
          <div class="pl-2 mt-1 text-red-700 text-sm" v-if="checkOutHourError">
            <span aria-hidden="true">*</span>
            <span class="">
              Por favor introduzca una hora válida, entre 0 y 23
            </span>
          </div>

          <div
            class="pl-2 mt-1 text-red-700 text-sm"
            v-else-if="checkOutMinuteError"
          >
            <span aria-hidden="true">*</span>
            <span class="">
              Por favor introduzca un minuto válido, entre 0 y 59
            </span>
          </div>
        </transition>
      </div>

      <!-- Hotel Time Zone -->
      <div class="mt-4">
        <label
          for="iana_time_zone"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': ianaTimeZoneError,
          }"
        >
          Zona horaria del hotel
        </label>
        <input
          type="text"
          name="iana_time_zone"
          class="
            input-field
            focus-effect
            border-gray-800/40 border
            focus:ring-brand
          "
          :disabled="isSending"
          :class="{
            'opacity-60': isSending,
            'text-red-700 border-red-700 focus:ring-red-700': ianaTimeZoneError,
          }"
          v-model="v.iana_time_zone.$model"
        />
        <transition name="fade">
          <div class="pl-2 mt-1 text-red-700 text-sm" v-if="ianaTimeZoneError">
            <span aria-hidden="true">*</span>
            <span class="">
              Por favor introduzca una zona horaria (iana time zone)
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
          Crear
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
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  maxValue,
  minValue,
} from "@vuelidate/validators";
import { EVENTS } from "~/db";
import { computed, ref } from "@nuxtjs/composition-api";
import { getCurrentTimeZone } from "~/utils";
const CREATE_HOTEL = EVENTS.ADMIN.HOTELS.CREATE_HOTEL;
export default {
  props: {
    isSending: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    //   data
    const hotel_name = ref("Sloppy Joe's Grand Hotel");
    const calendar_length = ref(30);
    const check_in_hour = ref(12);
    const check_in_minute = ref(0);
    const check_out_hour = ref(13);
    const check_out_minute = ref(0);
    const iana_time_zone = ref(getCurrentTimeZone());
    //

    // //
    // form handling
    // //

    // user has tryed to submit the form
    const utts = ref(false);
    // validation rules
    const rules = {
      hotel_name: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(60),
      },
      calendar_length: {
        required,
        minValue: minValue(10),
        maxValue: maxValue(90),
      },
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
      check_out_hour: {
        required,
        minValue: minValue(0),
        maxValue: maxValue(23),
      },
      check_out_minute: {
        required,
        minValue: minValue(0),
        maxValue: maxValue(59),
      },
      iana_time_zone: {
        required,
      },
    };

    // validator instnace
    const v = useVuelidate(rules, {
      hotel_name,
      calendar_length,
      check_in_hour,
      check_in_minute,
      check_out_hour,
      check_out_minute,
      iana_time_zone,
    });

    // errors
    // hotelNameError
    const hotelNameError = computed(
      () => utts.value && v.value.hotel_name.$invalid
    );
    // calendarLengthError
    const calendarLengthError = computed(
      () => utts.value && v.value.calendar_length.$invalid
    );

    // check_in_hour error
    const checkInHourError = computed(
      () => utts.value && v.value.check_in_hour.$invalid
    );
    // check_in_minute
    const checkInMinuteError = computed(
      () => utts.value && v.value.check_in_minute.$invalid
    );
    // check_out_hour
    const checkOutHourError = computed(
      () => utts.value && v.value.check_out_hour.$invalid
    );
    // check_out_minute
    const checkOutMinuteError = computed(
      () => utts.value && v.value.check_out_minute.$invalid
    );

    // iana_time_zone
    const ianaTimeZoneError = computed(
      () => utts.value && v.value.iana_time_zone.$invalid
    );

    function onFormSubmit() {
      utts.value = true;

      // emit
      if (!v.value.$invalid) {
        emit(CREATE_HOTEL, {
          hotel_name: hotel_name.value,
          calendar_length: calendar_length.value,
          check_in_hour: check_in_hour.value,
          check_in_minute: check_in_minute.value,
          check_out_hour: check_out_hour.value,
          check_out_minute: check_out_minute.value,
          iana_time_zone: iana_time_zone.value,
        });
      }
    }

    //

    return {
      // ata
      hotel_name,
      calendar_length,
      check_in_hour,
      check_in_minute,
      check_out_hour,
      check_out_minute,
      iana_time_zone,
      // form
      v,
      // errors
      hotelNameError,
      calendarLengthError,
      checkInHourError,
      checkInMinuteError,
      checkOutHourError,
      checkOutMinuteError,
      ianaTimeZoneError,
      //
      // actions
      onFormSubmit,
    };
  },
};
</script>

<style>
</style>