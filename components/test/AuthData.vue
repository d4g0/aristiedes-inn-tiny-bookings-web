<template>
  <div class="overflow-x-auto bg-gray-200 px-4 py-4 rounded-3xl">
    <pre>
<span class="font-bold">Auth Data</span>
<code>
auth: {{ { user, token, token_created_at } }}
</code>
  </pre>
  </div>
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