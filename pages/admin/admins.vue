<template>
  <div class="frame-30 ">
    <h1 class="text-4xl font-bold">Admins</h1>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: ['isFullAdmin'],
  components: {},
};
</script>

<style>
</style>