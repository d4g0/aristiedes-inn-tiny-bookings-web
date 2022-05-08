<template>
  <div class="w-full max-w-md mx-auto">
    <div class="py-5 mt-20 mb-32 lg:mb-52 flex flex-col items-center w-full">
      <h1 class="text-4xl lg:text-5xl font-bold">Login</h1>
      <LoginForm
        class="mt-[40px]"
        :isSending="loading"
        @[FORM_SUBMITION_EVENT]="onFormSubmit"
      />
    </div>
  </div>
</template>

<script>
import { EVENTS, API_ERRORS, TOAST_TYPES } from "~/db";
import { useLazyQuery } from "~/composables/useLazyQuery";
const { FORM_SUBMITION_EVENT } = EVENTS.LOGIN;
import { loginQuery } from "~/querys/login.js";
import { watch, ref, inject } from "@nuxtjs/composition-api";

export default {
  setup(props, { emit }) {
    const showToast = inject("showToast");
    const { loading, result, error, load, setVariables } =
      useLazyQuery(loginQuery);

    async function onFormSubmit({ email, password }) {
      setVariables({ input: { email, password } });
      load();
    }

    watch(result, (newR, oldR) => {
      // console.log({ result: result.value });
      // success
      if (newR?.data?.login) {
        onSuccess(newR?.data?.login);
      }
      // error
      if (newR?.errors) {
        onError(newR.errors[0]);
      }
    });

    watch(error, (nE, oE) => {
      if (nE) {
        onError(nE);
      }
    });

    function onError(error) {
      console.log("(login) error detected ");
      console.log(error.message);
      console.log(error?.extensions?.exception?.code);

      const API_ERROR = error?.extensions?.exception?.code || "";

      if (API_ERRORS.USER_NOT_FOUND == API_ERROR) {
        showToast(TOAST_TYPES.error, "login.errors.user_not_found", true);
      } else {
        showToast(TOAST_TYPES.error, "login.errors.fetch_error");
      }
    }

    function onSuccess(data) {
      console.log("(login) user found ");
      // console.log(data);
      emit(EVENTS.LOGIN.SUCCESS, data);
    }

    return {
      loading,
      // evt key
      FORM_SUBMITION_EVENT,
      onFormSubmit,
    };
  },
};
</script>
