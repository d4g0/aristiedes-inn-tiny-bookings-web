<template>
  <div class="w-full">
    <form @submit.prevent="onFormSubmit">
      <!-- field -->
      <div class="mt-4">
        <label
          for="hotelName"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': hotelNameError,
          }"
        >
          Nombre del hotel
        </label>
        <input
          type="hotelName"
          name="hotelName"
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
import { required, minLength, maxLength } from "@vuelidate/validators";
import { EVENTS } from "~/db";
import { computed, ref } from "@nuxtjs/composition-api";
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
    const hotel_name = ref("");
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
        minLength: minLength(8),
        maxLength: maxLength(24),
      },
    };

    // validator instnace
    const v = useVuelidate(rules, { hotel_name });

    // errors
    // hotelNameError
    const hotelNameError = computed(
      () => utts.value && v.value.hotel_name.$invalid
    );

    function onFormSubmit() {
      utts.value = true;


      // emit
      if (!v.value.$invalid) {
        emit(CREATE_HOTEL, {
          hotel_name: hotel_name.value,
        });
      }
    }

    //

    return {
      // form
      v,
      // errors
      hotelNameError,
      //
      // actions
      onFormSubmit,
    };
  },
};
</script>

<style>
</style>