<template>
  <div class="w-full min-h-screen" ref="shell">
    <Navigation />
    <AuthCtrl />
    <AuthMultiTabSync />
    <ToastControler />
    <main class="pt-nav-h">
      <Nuxt />
      <LangMenuOptions
        @close="onCloseLangOptions"
        :langMenuNeeded="langOptionsNeeded"
      />
    </main>

    <Footer class="mt-44" />
  </div>
</template>

<script>
import { ref, provide, watch } from "@vue/composition-api";
import { useElementSize } from "@vueuse/core";
import LangMenuOptions from "~/components/global/LangMenuOptions.vue";
import useBodOverflow from "~/composables/useBodyOverflow.js";
import AuthCtrl from "~/components/auth/AuthCtrl.vue";
import AuthMultiTabSync from "~/components/auth/AuthMultiTabSync.vue";
import ToastControler from '~/components/toast/ToastControler.vue';
import Footer from '~/components/global/Footer.vue';
import Navigation from '~/components/global/Navigation.vue';

export default {
  components: {
    LangMenuOptions,
    AuthCtrl,
    AuthMultiTabSync,
    ToastControler,
    Footer,
    Navigation,
  },
  setup() {
    // reactive $width spred
    const shell = ref(null);
    const { width, height } = useElementSize(shell);
    provide("width", width);

    // reactive $navHided spread
    const navHided = ref(false);
    function toogleNavHided() {
      navHided.value = !navHided.value;
    }
    provide("navHided", navHided);
    provide("toogleNavHided", toogleNavHided);

    // lang
    const langOptionsNeeded = ref(false);
    function tooglelangOptionsNeeded() {
      langOptionsNeeded.value = !langOptionsNeeded.value;
    }
    provide("tooglelangOptionsNeeded", tooglelangOptionsNeeded);

    function onCloseLangOptions() {
      console.log("onCloseLangOptions hit");
      langOptionsNeeded.value = false;
    }

    const { hideOverflow, showOverflow } = useBodOverflow();
    watch(langOptionsNeeded, (value) => {
      if (value) {
        hideOverflow();
      } else {
        showOverflow();
      }
    });

    return {
      // refs
      shell,
      // state
      width,
      height,
      navHided,
      langOptionsNeeded,
      // fn
      onCloseLangOptions,
    };
  },
};
</script>

<style>
</style>
