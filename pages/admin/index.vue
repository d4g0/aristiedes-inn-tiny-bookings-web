<template>
  <div class="frame">
    <h1 class="text-4xl font-bold">Admin Home</h1>
    <AuthData />
  </div>
</template>

<script>
import AuthData from "~/components/test/AuthData.vue";
export default {
  layout: "admin",
  middleware: "admin",
  components: { AuthData },
};
</script>

<style>
</style>