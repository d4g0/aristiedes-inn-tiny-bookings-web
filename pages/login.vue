<template>
  <div class="frame flex items-center justify-center">
    <LoginFormCtrl @[SUCCESS]="onLoginSuccess" />
  </div>
</template>

<script>
import { EVENTS } from "~/db";
const { SUCCESS } = EVENTS.LOGIN;
import { useAuthStore } from "~/stores/auth";

export default {
  setup(props, { root }) {
    // auth store
    const authStore = useAuthStore();
    const { authenticate } = authStore;

    function onLoginSuccess(authData) {
      console.log("(login) onLoginSuccess");
      // console.log(authData);
      authenticate(authData);
    }

    return {
      SUCCESS,
      onLoginSuccess,
    };
  },
};
</script>
