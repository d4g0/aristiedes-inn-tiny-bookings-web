<template>
  <div class="w-full sm:px-8">
    <!-- name & last name -->
    <transition name="fade" mode="out-in">
      <!-- TOO set negative namesFormComplete selection for pro  -->
      <NamesForm
        @[NAMES_FORM_SUBMISSION]="onNamesSubmit"
        v-if="!namesFormCompleted"
      />

      <!-- email n pass  -->

      <div v-else>
        <!-- back btn -->
        <button
          @click="backToNames"
          class="
            mt-10
            flex
            items-center
            justify-between
            focus-styles
            hover:bg-gray-200
            px-2
            py-1
            rounded-md
          "
          :disabled="isSending"
        >
          <ChevronLeft class="w-5 h-5" />
          <span class="ml-1 leading-none"> {{ $t("singup.form.back") }} </span>
        </button>

        <h1 class="mt-10 text-3xl lg:text-4xl lg:mt-20 font-bold">
          {{ $t("singup.form.credentials_title") }}
        </h1>

        <form @submit.prevent="onFormSubmit" class="mt-10">
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
      </div>
    </transition>
    <!-- data  debug -->
    <div class="mt-10 border-gray-600 bg-gray-300 overflow-auto rounded-xl p-2">
      <pre>
<code>
name: {{ client_name}}
last_name: {{ client_last_name}}
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
const NAMES_FORM_SUBMISSION = EVENTS.SINGUP.NAMES_FORM_SUBMISSION;
import {
  required,
  email as emailValidation,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import NamesForm from "./NamesForm.vue";
import ChevronLeft from "~/components/icons/ChevronLeft.vue";

export default {
  components: { NamesForm, ChevronLeft },
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

    // captcha state
    const captchaTokenReady = ref(false);

    // state
    const namesFormCompleted = ref(false);

    function onNamesSubmit(namesData) {
      // console.log("onNamesSubmit");
      // console.log(namesData);
      // go next form
      namesFormCompleted.value = true;
      client_name.value = namesData.client_name;
      client_last_name.value = namesData.client_last_name;
    }

    function backToNames() {
      namesFormCompleted.value = false;
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
      if (!v.value.$invalid && captchaTokenReady.value) {
        emit(EVENTS.SINGUP.FULL_FORM_SUBMIT, {
          email: email.value,
          password: password.value,
          client_name: client_name.value,
          client_last_name: client_last_name.value,
          captchaToken: captchaToken.value,
        });
      }
    }

    const emailError = computed(() => utts.value && v.value.email.$invalid);
    const passwError = computed(() => utts.value && v.value.password.$invalid);

    // captcha

    return {
      // ata
      NAMES_FORM_SUBMISSION,
      // state
      client_name,
      client_last_name,
      utts,
      email,
      password,
      v,
      namesFormCompleted,
      // computed
      emailError,
      passwError,
      // fn
      onNamesSubmit,
      onFormSubmit,
      backToNames,
    };
  },
};
</script>
