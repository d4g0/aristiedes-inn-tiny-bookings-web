<template>
  <div class="relative">
    <transition name="fade">
      <div v-if="toastNeeded">
        <Toast
          :type="toastType"
          :contentPath="contentPath"
          @close="hideToast"
        />
      </div>
    </transition>
    <slot></slot>
  </div>
</template>

<script>
import { ref, provide } from "@nuxtjs/composition-api";
import Toast from "~/components/toast/Toast.vue";
export default {
  components: { Toast },
  setup() {
    const toastNeeded = ref(false);
    const toastType = ref("");
    const contentPath = ref("");

    function showToast(
      toastTypeStr = "",
      contentPathStr = "",
      autohidable = false
    ) {
      toastNeeded.value = false;
      toastType.value = toastTypeStr;
      contentPath.value = contentPathStr;
      toastNeeded.value = true;

      if (autohidable) {
        setTimeout(() => {
          toastNeeded.value = false;
        }, 10 * 1000);
      }
    }

    function hideToast() {
      toastNeeded.value = false;
      toastType.value = "";
      contentPath.value = "";
    }

    provide("showToast", showToast);

    // TODO create handle autohidable toast
    // as a extra showToast config param `autohidable`

    return {
      toastNeeded,
      toastType,
      contentPath,
      hideToast,
    };
  },
};
</script>

<style>
</style>