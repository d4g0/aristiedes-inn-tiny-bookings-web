<template>
  <div class="frame-30">
    <MainHeading text="Hotels" />
    <SubHeading text="Hotels" />
    <AuthData class="mt-[50px]" />
  </div>
</template>

<script>
import MainHeading from "~/components/admin/global/MainHeading.vue";
import SubHeading from "~/components/admin/global/SubHeading.vue";
import AuthData from "~/components/test/AuthData.vue";
export default {
  layout: "admin",
  components: {
    // dev only
    AuthData,
    //
    MainHeading,
    SubHeading,
  },
};
</script>

<style>
</style>