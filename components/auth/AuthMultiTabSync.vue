<script>
import { useEventListener } from "@vueuse/core";
import { onMounted, useContext } from "@nuxtjs/composition-api";
import { useAuthStore } from "~/stores/auth";
import { AUTH_STORAGE_KEY } from "~/db";
export default {
  setup() {
    const ctx = useContext();
    onMounted(mountedSecuence);
    const authStore = useAuthStore();
    // authenticate & redirect
    const { deauthenticateLocal, authenticateLocal } = authStore;

    function mountedSecuence() {
      if (!process.client) {
        return;
      }
      useEventListener("storage", onStorageChange);
    }

    function onStorageChange() {
      //   console.log("Storage Change Hit");
      syncStorage();
    }

    function syncStorage() {
      var rawSessionData = localStorage.getItem(AUTH_STORAGE_KEY);
      var authSessionData = rawSessionData ? JSON.parse(rawSessionData) : null;
      console.log("syncStorage");
      console.log({ authSessionData });
      // case logout
      if (!authSessionData) {
        console.log("logout assumed");

        deauthenticateLocal();
        // send to home since there is the best place to go for clients
        ctx.redirect(200, ctx.localePath("/"));
      }
      //   case login
      else {
        console.log("login assumed");
        authenticateLocal(authSessionData);
        // send to login since there is wireup to next redirect based on user type
        ctx.redirect(200, ctx.localePath("/login"));
      }
    }
  },
};
</script>

<template></template>