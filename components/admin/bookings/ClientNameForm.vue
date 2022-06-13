<template>
  <div>
    <SubHeading text="Datos del cliente" />
    <form @submit.prevent="onSubmit" class="mt-[30px]">
      <!-- name -->
      <div class="mt-4">
        <label
          for="client_name"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': nameError,
          }"
        >
          Nombre
        </label>
        <input
          type="text"
          id="client_name"
          class="
            input-field
            focus-effect
            border-gray-800/40 border
            focus:ring-brand
          "
          :disabled="isSending"
          :class="{
            'opacity-60': isSending,
            'text-red-700 border-red-700 focus:ring-red-700': nameError,
          }"
          v-model="v.name.$model"
        />
        <transition name="fade">
          <div class="pl-2 mt-1 text-red-700 text-sm" v-if="nameError">
            <span aria-hidden="true">*</span>
            <span class=""> Por favor introduzca un nombre válido </span>
          </div>
        </transition>
      </div>

      <!-- last name -->
      <div class="mt-4">
        <label
          for="client_last_name"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': lastNameError,
          }"
        >
          Apellido
        </label>
        <input
          type="text"
          id="client_last_name"
          class="
            input-field
            focus-effect
            border-gray-800/40 border
            focus:ring-brand
          "
          :disabled="isSending"
          :class="{
            'opacity-60': isSending,
            'text-red-700 border-red-700 focus:ring-red-700': lastNameError,
          }"
          v-model="v.last_name.$model"
        />
        <transition name="fade">
          <div class="pl-2 mt-1 text-red-700 text-sm" v-if="lastNameError">
            <span aria-hidden="true">*</span>
            <span class="">
              Por favor introduzca un apellido o apellidos válido
            </span>
          </div>
        </transition>
      </div>

      <SubmitBtn class="mt-[30px]" submitText="Seleccionar" />
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { computed, ref } from "@nuxtjs/composition-api";
import SubHeading from "../global/SubHeading.vue";
import SubmitBtn from "../global/SubmitBtn.vue";
export default {
  components: { SubHeading, SubmitBtn },
  props: {
    isSending: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { emit }) {
    const name = ref("");
    const last_name = ref("");
    const utts = ref(false);

    const rules = {
      name: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(60),
      },
      last_name: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(60),
      },
    };
    const v = useVuelidate(rules, {
      name,
      last_name,
    });

    const nameError = computed(() => utts.value && v.value.name.$invalid);
    const lastNameError = computed(
      () => utts.value && v.value.last_name.$invalid
    );
    function onSubmit() {
      if (!utts.value) {
        utts.value = true;
      }

      if (!v.value.$invalid) {
        emit("submit", { name: name.value, lastName: last_name.value });
      }
    }

    return {
      onSubmit,
      nameError,
      lastNameError,
      v,
    };
  },
};
</script>

<style>
</style>