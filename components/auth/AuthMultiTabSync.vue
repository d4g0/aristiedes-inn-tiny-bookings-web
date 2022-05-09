<script>
import { useEventListener } from "@vueuse/core";
import { onMounted } from "@nuxtjs/composition-api";
import { useAuthStore } from "~/stores/auth";
import { AUTH_STORAGE_KEY } from "~/db";
export default {
  setup() {
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
      console.log("(multitab-sync) syncStorage");
      console.log({ authSessionData });
      // case logout
      if (!authSessionData) {
        console.log("(multitab-sync) logout assumed");

        deauthenticateLocal();
      }
      //   case login
      else {
        console.log("(multitab-sync) login assumed");
        authenticateLocal(authSessionData);
      }
    }
  },
};
</script>

<template></template>