<template>
  <div class="frame">
    <h1 class="text-4xl font-bold">Client Home</h1>
    <UserData :user="user" />
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import UserData from "~/components/test/UserData.vue";
import { useAuthStore } from "~/stores/auth";
export default {
  components: { UserData },
  setup() {
    const authStore = useAuthStore();
    const { user } = storeToRefs(authStore);
    // console.log(user)
    return {
      user,
    };
  },
};
</script>

<style>
</style>