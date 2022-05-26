<template>
  <div class="frame-30 ">
    <h1 class="text-4xl font-bold">Admin Home</h1>
    <AuthData class="" />
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