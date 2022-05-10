

<script>
import { onBeforeUnmount, onMounted } from "@nuxtjs/composition-api";
import { wait } from "~/utils";
// load captcha script when mouted if missing and offload when unmounted
export default {
  setup() {
    onMounted(mountSec);
    onBeforeUnmount(onUnMounSec);

    // load
    async function mountSec() {
      if (!process.client) {
        return;
      }
      if (!isCaptchaScriptPresent()) {
        // litle delay to leave network to load the page quick
        await wait(3);
        loadScript();
        console.log("(captcha loader) gc loaded");
      }
    }

    // script outlet;
    var script;
    const CAPTCHA_SCRIPT_SOURCE = "https://www.google.com/recaptcha/api.js";

    function loadScript() {
      if (!process.client) {
        return;
      }
      script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.src = CAPTCHA_SCRIPT_SOURCE;
      document.head.appendChild(script);

      console.log(script);
    }

    // offload
    function onUnMounSec() {
      if (!process.client) {
        return;
      }
      if (isCaptchaScriptPresent()) {
        offloadScript();
        console.log("(captcha loader) gc offloaded");
      }
    }
    function offloadScript() {
      //   console.log(script);
      if (script) {
        document.head.removeChild(script);
      }
    }

    function isCaptchaScriptPresent() {
      var isPresent = false;
      var rawScripts = document.querySelectorAll("script");
      var scripts = Array.from(rawScripts);
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src == CAPTCHA_SCRIPT_SOURCE) {
          isPresent = true;
          break;
        }
      }
      return isPresent;
    }
  },
};
</script>

<template></template>
