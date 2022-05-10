<template>
  <section>
    <div class="mt-6">
      <div
        class="
          min-h-[74px] min-w-[300px]
          w-full
          mx-auto
          rounded-md
          overflow-hidden
          bg-gray-300
        "
        ref="gc_container"
        :class="isCapthcaLoading ? ' animate-pulse' : 'bg-white'"
      ></div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "@nuxtjs/composition-api";
import { wait } from "~/utils";
import { EVENTS } from "~/db";
export default {
  setup(props, { emit, root }) {
    const i18n = root.context.i18n;
    const env = root.context.env;
    const sitekey = env.CAPTCHA_SITE_KEY;
    // refs
    const gc_container = ref(null);
    var grecaptcha = "nullish";
    const isCapthcaLoading = ref(true);

    // evnets
    const events = {
      completion: EVENTS.CAPTCHA.COMPLETION,
      error: EVENTS.CAPTCHA.ERROR,
      expired: EVENTS.CAPTCHA.EXPIRED,
    };

    onMounted(doOnMounted);

    async function doOnMounted() {
      initCaptcha();
    }

    async function initCaptcha() {
      if (!process.client) {
        return;
      }
      if (
        window?.grecaptcha &&
        typeof window?.grecaptcha?.render == "function"
      ) {
        console.log("gc script loaded");
        onGCaptchaReady();
      } else {
        await wait(1);
        doOnMounted();
      }
    }

    async function onGCaptchaReady() {
      grecaptcha = window.grecaptcha;
      if (!gc_container.value) {
        await wait(1);
        return onGCaptchaReady();
      }

      grecaptcha.render(gc_container.value, {
        sitekey: sitekey,
        callback: onCaptchaCompletion,
        hl: i18n.localeProperties.code,
        "expired-callback": onExpired,
        "error-callback": onCaptchaError,
      });

      isCapthcaLoading.value = false;
    }

    function onCaptchaCompletion(res) {
      var token = res;
      emit(events.completion, token);
      console.log(events.completion);
    }

    function onExpired() {
      console.log(events.expired);
      emit(events.expired);
    }

    function onCaptchaError() {
      console.log(events.error);
      emit(events.error);
    }

    return {
      // ref
      gc_container,
      // state
      isCapthcaLoading,
    };
  },
};
</script>

<style>
</style>