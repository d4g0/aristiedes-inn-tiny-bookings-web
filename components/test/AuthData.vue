<template>
  <pre>
<code>
auth: {{ { user, token, token_created_at } }}
</code>
  </pre>
</template>

<script>
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth";
export default {
  setup() {
    const authStore = useAuthStore();
    const { user, token, token_created_at } = storeToRefs(authStore);
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