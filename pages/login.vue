<template>
  <div class="frame flex items-center justify-center">
    <LoginFormCtrl @[SUCCESS]="onLoginSuccess" />
  </div>
</template>

<script>
import { EVENTS, USER_ROLES } from "~/db";
const { SUCCESS } = EVENTS.LOGIN;
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";
import { onMounted, useContext } from "@nuxtjs/composition-api";

export default {
  setup(props, { root }) {
    const ctx = useContext();
    // if (process.client) {
    //   // console.log(ctx.localePath("/client/"));
    //   console.log(ctx);
    // }

    // auth store
    const authStore = useAuthStore();
    // authenticate & redirect
    const { authenticate } = authStore;
    const { user } = storeToRefs(authStore);

    // handle case a prev session was found in browser
    //
    function hanlePrevSessionIfAny() {
      if (user.value != null) {
        handleRedirect(user.value);
      }
    }

    onMounted(hanlePrevSessionIfAny);

    function onLoginSuccess(authData) {
      console.log("onLoginSuccess");
      console.log(authData);
      authenticate(authData);
      handleRedirect(authData.user);
    }

    function handleRedirect(user) {
      if (
        user.user_role == USER_ROLES.FULL_ADMIN ||
        user.user_role == USER_ROLES.BASIC_ADMIN
      ) {
        console.log("Found Admin");
        // redirect to admin dashboard
        return ctx.redirect(200, ctx.localePath("/admin"));
      }

      if (user.user_role == USER_ROLES.CLIENT) {
        console.log("Found Client");
        // redirect to client private home
        return ctx.redirect(200, ctx.localePath("/"));
      }

      console.log("Unknow user is user role dude", user);
    }

    return {
      SUCCESS,
      onLoginSuccess,
      user,
    };
  },
};
</script>
