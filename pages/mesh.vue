<template>
  <div class="frame-30">
    <MainHeading text="Administradores" class="mt-10" />
    <AdminSec class="mt-[50px]"/>
    <AuthData class="mt-[750px]" />
  </div>
</template>

<script>
import AdminSec from '~/components/admin/admin/AdminSec.vue';
import MainHeading from '~/components/admin/global/MainHeading.vue';
import AuthData from "~/components/test/AuthData.vue";
export default {
  layout: "admin",
  components: {
    // dev only
    AuthData,
    AdminSec,
    MainHeading,
    //
  },

  setup(props, { emit }) {},
};
</script>

<style>
</style>