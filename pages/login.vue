<template>
  <div class="frame flex items-center justify-center">
    <LoginFormCtrl @[SUCCESS]="onLoginSuccess" />
  </div>
</template>

<script>
import { EVENTS } from "~/db";
const { SUCCESS } = EVENTS.LOGIN;

export default {
  setup() {
    function onLoginSuccess(authData) {
      console.log("onLoginSuccess");
      console.log(authData);
    }
    return {
      SUCCESS,
      onLoginSuccess,
    };
  },
};
</script>
