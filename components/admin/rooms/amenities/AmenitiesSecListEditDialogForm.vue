<template>
  <div>
    <form @submit.prevent="onSubmit">
      <!-- Hotel Name -->
      <div class="mt-4">
        <label
          for="amenity"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': roomAmenityError,
          }"
        >
          Amenitdad
        </label>
        <input
          type="text"
          name="amenity"
          class="
            input-field
            focus-effect
            border-gray-800/40 border
            focus:ring-brand
          "
          :disabled="isSending"
          :class="{
            'opacity-60': isSending,
            'text-red-700 border-red-700 focus:ring-red-700': roomAmenityError,
          }"
          v-model="v.amenity.$model"
        />
        <transition name="fade">
          <div class="pl-2 mt-1 text-red-700 text-sm" v-if="roomAmenityError">
            <span aria-hidden="true">*</span>
            <span class="">
              Por favor introduzca una amenidad válida ( 2 a 30 caracteres, sin
              el caracter / )</span
            >
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
  </div>
</template>

<script>
import { computed, ref } from "@nuxtjs/composition-api";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  props: {
    isSending: {
      type: Boolean,
      default: false,
    },
    actualRoomAmenityStr: {
      type: String,
      default: "room_type",
    },
  },
  setup(props, { emit }) {
    // --
    // data
    // --
    const amenity = ref(props.actualRoomAmenityStr);

    const noChar = (char) => (str) => {
      return !str.includes(char);
    };

    //

    // --
    // form validation
    // --
    // rules
    const rules = {
      amenity: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(30),
        noSlashChar: noChar("/"),
      },
    };

    // utts
    const utts = ref(false);
    // v
    const v = useVuelidate(rules, { amenity });

    // computed errors
    const roomAmenityError = computed(
      () => utts.value && v.value.amenity.$invalid
    );
    //

    //

    // --
    // submit handler
    // --
    function onSubmit() {
      utts.value = true;

      if (!v.value.$invalid) {
        emit("editReq", { amenity: amenity.value });
      }
    }

    //

    return {
      // v
      v,
      roomAmenityError,

      // fn
      onSubmit,
    };
  },
};
</script>

<style>
</style>