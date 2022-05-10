<template>
  <div class="w-full max-w-md mx-auto">
    <SingUpForm @[FULL_FORM_SUBMIT]="onFormSubmit" />
  </div>
</template>

<script>
import SingUpForm from "./SingUpForm.vue";
import { EVENTS } from "~/db";
import { useLazyQuery } from "~/composables/useLazyQueryWithCaptcha";
import { singup as singupQuery } from "~/querys/singup.js";
import { ref } from "@nuxtjs/composition-api";
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
    const formData = ref("");
    const captchaToken = ref("");
    function onFormSubmit(data) {
      console.log("(sing up ctrl)");
      console.log(data);

      formData.value = {
        client_last_name: data.client_last_name,
        client_name: data.client_name,
        email: data.email,
        password: data.password,
      };

      captchaToken.value = data.captchaToken;
    }

    const {} = useLazyQuery(singupQuery, { input: formData.value });

    return {
      FULL_FORM_SUBMIT,
      onFormSubmit,
    };
  },
};
</script>

<style>
</style>