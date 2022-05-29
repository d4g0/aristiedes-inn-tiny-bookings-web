<template>
  <div class="frame-30 ">
    <MainHeading text="Administradores" class="mt-10" />
    <AdminSec class="mt-[50px]"/>

  </div>
</template>

<script>
import AdminSec from '~/components/admin/admin/AdminSec.vue';
import MainHeading from '~/components/admin/global/MainHeading.vue';
export default {
  layout: "admin",
  middleware: ['isFullAdmin'],
  components: {MainHeading, AdminSec},
};
</script>

<style>
</style>