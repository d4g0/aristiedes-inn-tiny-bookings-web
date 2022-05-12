<template>
  <form @submit.prevent="onNamesSubmit">
    <h2 class="mt-10 text-2xl lg:mt-20 font-bold">
      {{ $t("singup.form.names_title") }}
    </h2>

    <!-- name -->
    <div class="mt-10">
      <label
        for="client_name"
        class="label pl-2"
        :class="{
          'text-red-700': clientNameError,
        }"
      >
        {{ $t("singup.form.client_name") }}
      </label>
      <input
        type="text"
        name="client_name"
        class="
          input-field
          focus-effect
          border-gray-800/40 border
          focus:ring-brand
        "
        :class="{
          'text-red-700 border-red-700 focus:ring-red-700': clientNameError,
        }"
        v-model="n.client_name.$model"
      />
      <transition name="fade">
        <div class="pl-2 mt-1 text-red-700 text-sm" v-if="clientNameError">
          <span aria-hidden="true">*</span>
          <span class="">
            {{ $t("singup.errors.name_error") }}
          </span>
        </div>
      </transition>
    </div>

    <!-- last name -->
    <div class="mt-4">
      <label
        for="client_last_name"
        class="label pl-2"
        :class="{
          'text-red-700': clientLastNameError,
        }"
      >
        {{ $t("singup.form.client_last_name") }}
      </label>
      <input
        type="text"
        name="client_last_name"
        class="
          input-field
          focus-effect
          border-gray-800/40 border
          focus:ring-brand
        "
        :class="{
          'text-red-700 border-red-700 focus:ring-red-700': clientLastNameError,
        }"
        v-model="n.client_last_name.$model"
      />
      <transition name="fade">
        <div class="pl-2 mt-1 text-red-700 text-sm" v-if="clientLastNameError">
          <span aria-hidden="true">*</span>
          <span class="">
            {{ $t("singup.errors.last_name_error") }}
          </span>
        </div>
      </transition>
    </div>

    <!-- submit -->
    <div class="mt-[40px] relative">
      <button
        class="
          bg-white
          py-2
          rounded-xl
          text-brand
          border-brand border
          font-medium
          text-lg
          w-full
          focus-effect focus:ring-brand
          disabled:bg-brand/60 disabled:cursor-not-allowed
          hover:bg-brand hover:text-white
          focus:bg-brand focus:text-white
        "
      >
        {{ $t("singup.form.next") }}
      </button>
    </div>

    <!-- <div class="mt-6 w-full flex items-center justify-start pl-4">
      <span class="text-sm text-gray-800 font-bold opacity-60">1/2</span>
    </div> -->
  </form>
</template>

<script>
import { ref, computed } from "@nuxtjs/composition-api";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { EVENTS } from "~/db";
export default {
  setup(props, { emit }) {
    // for api state
    const client_name = ref("");
    const client_last_name = ref("");

    // names form
    // user has tryed to submit the names form
    const uttns = ref(false);
    const nRules = {
      client_name: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(60),
      },
      client_last_name: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(60),
      },
    };

    const n = useVuelidate(nRules, { client_name, client_last_name });
    const clientNameError = computed(
      () => uttns.value && n.value.client_name.$invalid
    );

    const clientLastNameError = computed(
      () => uttns.value && n.value.client_last_name.$invalid
    );

    function onNamesSubmit() {
    //   console.log("onNamesSubmit");
    //   console.log("invalidity:", n.value.$invalid);
      if (!uttns.value) {
        uttns.value = true;
      }

      // go next form
      if (!n.value.$invalid) {
        emit(EVENTS.SINGUP.NAMES_FORM_SUBMISSION, {
          client_name: client_name.value,
          client_last_name: client_last_name.value,
        });
      }
    }

    return {
      // state
      client_name,
      client_last_name,
      n,
      // computed
      clientNameError,
      clientLastNameError,
      // fn
      onNamesSubmit,
    };
  },
};
</script>

<style>
</style>