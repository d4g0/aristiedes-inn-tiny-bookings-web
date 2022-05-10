<template>
  <div class="w-full sm:px-8">
    <!-- name & last name -->
    <transition name="fade">
      <form v-if="!namesFormCompleted" @submit.prevent="onNamesSubmit">
        <h1 class="mt-10 text-3xl lg:text-4xl lg:mt-20 font-bold">
          {{ $t("singup.form.names_title") }}
        </h1>

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
              'text-red-700 border-red-700 focus:ring-red-700':
                clientLastNameError,
            }"
            v-model="n.client_last_name.$model"
          />
          <transition name="fade">
            <div
              class="pl-2 mt-1 text-red-700 text-sm"
              v-if="clientLastNameError"
            >
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

        <div class="mt-6 w-full flex items-center justify-start pl-4">
          <span class="text-sm text-gray-800 font-bold opacity-60">1/2</span>
        </div>
      </form>
    </transition>

    <!-- email n pass -->
    <transition name="fade">
      <form @submit.prevent="onFormSubmit" v-if="renderEmailPasswordForm">
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
    </transition>
    <!-- data  debug -->
    <div class="mt-10 border-gray-600 bg-gray-300 overflow-auto rounded-xl p-2">
      <pre>
<code>
name: {{ client_name}}
last_name: {{ client_last_name}}
n: {{n}}
email: {{ email }} 
passwd: {{ password }}
invalid: {{ v.$invalid }}
v: {{ v }}
</code>
        </pre>
    </div>
<!-- errors: {{ v.$errors }} -->
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
    // for api state
    const client_name = ref("");
    const client_last_name = ref("");
    const email = ref("");
    const password = ref("");
    const captchaToken = ref("");

    // ui state
    const namesFormCompleted = ref(false);
    const renderEmailPasswordForm = computed(() => namesFormCompleted.value);

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
      console.log("onNamesSubmit");
      console.log("invalidity:", n.value.$invalid);
      if (!uttns.value) {
        uttns.value = true;
      }

      // go next form
      if (!n.value.$invalid) {
        namesFormCompleted.value = true;
      }
    }

    // user & pass form
    // user has tryed to submit the form
    const utts = ref(false);
    const rules = {
      email: { required, emailValidation },
      password: { required, minLength: minLength(8), maxLength: maxLength(24) },
    };

    const v = useVuelidate(rules, { email, password });

    function onFormSubmit() {
      utts.value = true;

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
      client_name,
      client_last_name,
      utts,
      email,
      password,
      v,
      n,
      // computed
      emailError,
      passwError,
      namesFormCompleted,
      renderEmailPasswordForm,
      clientNameError,
      clientLastNameError,
      // fn
      onNamesSubmit,
      onFormSubmit,
    };
  },
};
</script>
