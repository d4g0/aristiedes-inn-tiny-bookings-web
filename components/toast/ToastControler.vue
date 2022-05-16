<template>
  <div class="fixed w-full h-0 left-0 bottom-0  z-10">
    <transition name="fade">
      <div v-if="toastNeeded">
        <Toast
          :type="toastType"
          :contentPath="contentPath"
          @close="hideToast"
          class="mb-20"
        />
      </div>
    </transition>
    <slot></slot>
  </div>
</template>

<script>
import { ref, provide } from "@nuxtjs/composition-api";
import Toast from "~/components/toast/Toast.vue";
import { useToastStore } from "~/stores/toast-storage.js";
import { storeToRefs } from "pinia";
export default {
  components: { Toast },
  setup() {
    const toastStore = useToastStore();
    const { showToast, hideToast } = toastStore;
    const { toastNeeded, toastType, contentPath } = storeToRefs(toastStore);

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