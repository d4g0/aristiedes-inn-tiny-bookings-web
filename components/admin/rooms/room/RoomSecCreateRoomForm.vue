<template>
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
</template>

<script>
import {
  required,
  minValue,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { computed, ref } from "@nuxtjs/composition-api";
import useVuelidate from "@vuelidate/core";

export default {
  props: {
    isSending: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    

    const utts = ref(false);
    const room_name = ref("");
    const night_price = ref(10);
    const capacity = ref(2);
    const number_of_beds = ref(1);

    const rules = {
      room_name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(20),
      },
      night_price: {
        minValue: minValue(0.01),
      },
      capacity: {
        minValue: minValue(1),
      },
      number_of_beds: {
        minValue: minValue(1),
      },
    };

    const v = useVuelidate(rules, {
      room_name,
      night_price,
      capacity,
      number_of_beds,
    });

    // computed errors
    const roomNameError = computed(
      () => utts.value && v.value.room_name.$invalid
    );

    const nightPriceError = computed(
      () => utts.value && v.value.night_price.$invalid
    );

    const capacityError = computed(
      () => utts.value && v.value.capacity.$invalid
    );

    const bedsError = computed(
      () => utts.value && v.value.number_of_beds.$invalid
    );

    function onSubmit() {
      utts.value = true;

      if (!v.value.$invalid) {
        emit("formSubmition", {
          room_name: room_name.value,
          night_price: +night_price.value,
          capacity: +capacity.value,
          number_of_beds: +number_of_beds.value,
        });
      }
    }
    return {
      room_name,
      night_price,
      capacity,
      number_of_beds,
      onSubmit,
      //   v
      v,
      roomNameError,
      nightPriceError,
      capacityError,
      bedsError,
    };
  },
};
</script>

<style>
</style>