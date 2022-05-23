<template>
  <div class="frame flex items-center justify-center">
    <!-- todo uncomment cloader for production  -->
    <CaptchaLoader />
    <SingUpCtrl />
  </div>
</template>

<script>
import CaptchaLoader from "~/components/captcha/CaptchaLoader.vue";
import SingUpCtrl from "~/components/singup/SingUpCtrl.vue";
export default {
  components: {
    CaptchaLoader,
    SingUpCtrl,
  },
};
</script>

<style>
</style>