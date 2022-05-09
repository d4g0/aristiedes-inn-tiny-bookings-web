<template>
  <div class="frame">
    <h1 class="text-4xl font-bold">Admin Home</h1>
    <AuthData :auth="{ user, token, token_created_at }" />
  </div>
</template>

<script>
import AuthData from "~/components/test/AuthData.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";
export default {
  layout: "admin",
  components: { AuthData },
  setup() {
    const authStore = useAuthStore();
    const { user, token, token_created_at } = storeToRefs(authStore);
    // console.log(user);
    return {
      user,
      token,
      token_created_at,
    };
  },
};
</script>

<style>
</style>