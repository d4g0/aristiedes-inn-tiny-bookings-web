<template>
  <div></div>
</template>

<script>
import { onMounted } from "@nuxtjs/composition-api";
import { API_TOKEN_LIVE_HOURS, AUTH_STORAGE_KEY } from "~/db";
import { useAuthStore } from "~/stores/auth";
export default {
  setup() {
    const authStore = useAuthStore();
    const { authenticateLocal, deauthenticateLocal, isAuthenticated } = authStore;
    onMounted(syncAuth);

    function syncAuth() {
      // case is Authenticated: ignore
      if (isAuthenticated()) {
        return;
      }
      console.log("syncing auth...");

      var rawSessionData = localStorage.getItem(AUTH_STORAGE_KEY);
      var authSessionData = rawSessionData ? JSON.parse(rawSessionData) : null;

      if (!authSessionData) {
        return;
      }
      const token_created_at = authSessionData?.token_created_at;

      //  evaluate created time
      if (!token_created_at) {
        return;
      }

      const isNowBefore = isNowBeforeThen(
        token_created_at,
        API_TOKEN_LIVE_HOURS
      );

      if (isNowBefore) {
        // authenticate
        authenticateLocal(authSessionData);
      } else {
        // deauthenticate
        deauthenticateLocal();
      }

      function isNowBeforeThen(dateStr, hoursOffset = 0) {
        try {
          var now = new Date();
          var ms = hoursOffset * 60 * 60 * 1000;
          var baseDate = new Date(dateStr).valueOf() + ms;
          return now < baseDate;
        } catch (error) {
          console.log(error);
          return true;
        }
      }
    }
  },
};
</script>
