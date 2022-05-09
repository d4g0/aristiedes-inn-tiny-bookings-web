<template>
  <div class="w-full sm:px-8">
    <form @submit.prevent="onFormSubmit">
      <!-- email -->
      <div class="mt-4">
        <label
          for="email"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': emailError,
          }"
        >
          {{ $t("login.form.email") }}
        </label>
        <input
          type="email"
          name="email"
          class="
            input-field
            focus-effect
            border-gray-800/40 border
            focus:ring-brand
          "
          :disabled="isSending"
          :class="{
            'opacity-60': isSending,
            'text-red-700 border-red-700 focus:ring-red-700': emailError,
          }"
          v-model="v.email.$model"
        />
        <transition name="fade">
          <div class="pl-2 mt-1 text-red-700 text-sm" v-if="emailError">
            <span aria-hidden="true">*</span>
            <span class="">
              {{ $t("login.form.validation_errors_hints.email") }}
            </span>
          </div>
        </transition>
      </div>

      <!-- passw -->
      <div class="mt-4">
        <label
          for="password"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': passwError,
          }"
        >
          {{ $t("login.form.password") }}
        </label>
        <input
          type="password"
          name="password"
          class="
            input-field
            focus-effect
            border-gray-800/40 border
            focus:ring-brand
          "
          :disabled="isSending"
          :class="{
            'opacity-60': isSending,
            'text-red-700 border-red-700 focus:ring-red-700': passwError,
          }"
          v-model="v.password.$model"
        />
        <transition name="fade">
          <div class="pl-2 mt-1 text-red-700 text-sm" v-if="passwError">
            <span aria-hidden="true">*</span>
            <span class="">
              {{ $t("login.form.validation_errors_hints.password") }}
            </span>
          </div>
        </transition>
      </div>

      <!-- submit -->
      <div class="mt-[40px] relative">
        <button
          class="
            bg-brand
            py-2
            rounded-xl
            text-white
            font-medium
            text-lg
            w-full
            focus-effect focus:ring-brand
            disabled:bg-brand/60 disabled:cursor-not-allowed
          "
          :disabled="isSending"
        >
          {{ $t("login.form.submit") }}
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
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </transition>
      </div>
    </form>
    <!-- data  debug -->
    <!-- <div
      class="mt-10 border-gray-600 bg-gray-300 overflow-auto rounded-xl p-2"
    >
      <pre>
<code>
email: {{ email }} 
passwd: {{ password }}
invalid: {{ v.$invalid }}
errors: {{ v.$errors }}
v: {{ v }}
</code>
        </pre>
    </div> -->
  </div>
</template>

<script>
import { ref, computed } from "@nuxtjs/composition-api";
import useVuelidate from "@vuelidate/core";
import { EVENTS } from "~/db";
import {
  required,
  email as emailValidation,
  minLength,
  maxLength,
} from "@vuelidate/validators";
export default {
  props: {
    isSending: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const email = ref("");
    const password = ref("");
    // user has tryed to submit the form
    const utts = ref(false);
    const rules = {
      email: { required, emailValidation },
      password: { required, minLength: minLength(8), maxLength: maxLength(24) },
    };

    const v = useVuelidate(rules, { email, password });

    function onFormSubmit() {
      utts.value = true;

      //   console.log({
      //     evt: EVENTS.LOGIN.FORM_SUBMITION_EVENT,
      //     email: email.value,
      //     password: password.value,
      //   });

      // emit
      if (!v.value.$invalid) {
        emit(EVENTS.LOGIN.FORM_SUBMITION_EVENT, {
          email: email.value,
          password: password.value,
        });
      }
    }

    const emailError = computed(() => utts.value && v.value.email.$invalid);
    const passwError = computed(() => utts.value && v.value.password.$invalid);

    return {
      // state
      utts,
      email,
      password,
      v,
      // computed
      emailError,
      passwError,
      // fn
      onFormSubmit,
    };
  },
};
</script>
