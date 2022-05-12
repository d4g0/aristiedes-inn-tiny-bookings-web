<template>
  <div class="frame flex items-center justify-center">
    <AdminsLoginFormCtrl @[SUCCESS]="onLoginSuccess" />
  </div>
</template>

<script>
import AdminsLoginFormCtrl from "~/components/login/AdminsLoginFormCtrl.vue";
import { EVENTS } from "~/db";
const { SUCCESS } = EVENTS.LOGIN;
import { useAuthStore } from "~/stores/auth";

export default {
  components: { AdminsLoginFormCtrl },
  setup(props, { root }) {
    // auth store
    const authStore = useAuthStore();
    const { authenticate } = authStore;

    function onLoginSuccess(authData) {
      console.log("(login) onLoginSuccess");
      // console.log(authData);
      authenticate({
        user: authData.admin,
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
