<template>
  <div class="frame flex items-center justify-center">
    <ClientsLoginFormCtrl @[SUCCESS]="onLoginSuccess" />
  </div>
</template>

<script>
import ClientsLoginFormCtrl from "~/components/login/ClientsLoginFormCtrl.vue";
import { EVENTS } from "~/db";
const { SUCCESS } = EVENTS.LOGIN;
import { useAuthStore } from "~/stores/auth";

export default {
  components: { ClientsLoginFormCtrl },
  setup(props, { root }) {
    // auth store
    const authStore = useAuthStore();
    const { authenticate } = authStore;

    function onLoginSuccess(authData) {
      console.log("(login) onLoginSuccess");
      // console.log(authData);
      authenticate({
        user: authData.client,
        token: authData.token,
        token_created_at: authData.token_created_at,
      });
    }

    return {
      SUCCESS,
      onLoginSuccess,
    };
  },
};
</script>
