<template>
  <div class="w-full max-w-md mx-auto">
    <SingUpForm :isSending="loading" @[FULL_FORM_SUBMIT]="onFormSubmit" />
  </div>
</template>

<script>
import SingUpForm from "./SingUpForm.vue";
import { EVENTS, TOAST_TYPES } from "~/db";
import { useLazyQuery } from "~/composables/useLazyQueryWithCaptcha";
import { singup as singupQuery } from "~/querys/singup.js";
import { inject, ref, watch } from "@nuxtjs/composition-api";
import { useAuthStore } from "~/stores/auth";
const FULL_FORM_SUBMIT = EVENTS.SINGUP.FULL_FORM_SUBMIT;
export default {
  components: { SingUpForm },
  setup() {
    var singUpQueryInputAnatomy = {
      input: {
        client_name: "casidy4",
        client_last_name: "valdez",
        password: "supper-foo-pass",
        email: "casidy4@gmail.com",
      },
    };

    const { loading, result, error, load, setVariables, setToken } =
      useLazyQuery(singupQuery);

    function onFormSubmit(data) {
      console.log("(sing up ctrl) form submit");
      // console.log(data);

      setVariables({
        input: {
          client_last_name: data.client_last_name,
          client_name: data.client_name,
          email: data.email,
          password: data.password,
        },
      });

      setToken(data.captchaToken);

      load();
    }

    watch(result, (newR, oldR) => {
      // console.log({ result: result.value });
      // success
      if (newR?.data?.singUp) {
        onSuccess(newR?.data?.singUp);
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

    const showToast = inject('showToast');

    function onError(error) {
      console.log("(singup) error detected ");
      console.log(error.message);
      console.log(error?.extensions?.exception?.code);

      showToast(TOAST_TYPES.error, "singup.errors.submition_fail");
    }

    const authStore = useAuthStore();
    const { authenticate } = authStore;

    function onSuccess(data) {
      console.log("(singup) user found ");
      // console.log({
      //   user: data.user,
      //   token: data.token,
      //   token_created_at: data.token_created_at,
      // });

      // authenticate & stuff aja
      authenticate({
        user: data.user,
        token: data.token,
        token_created_at: data.token_created_at,
      });
    }

    return {
      FULL_FORM_SUBMIT,
      onFormSubmit,
      loading,
    };
  },
};
</script>

<style>
</style>