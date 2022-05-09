<template>
  <button
    class="
      hover:bg-gray-300
      dark:hover:bg-gray-600
      transition-all
      font-medium
      box-border
      rounded-lg
      p-4
      flex
      items-center
      justify-start
      space-x-3
      focus-styles
      w-full
    "
    @click="onLogout"
  >
    <span>
      {{ $t(btn.i18nPath) || btn.body }}
    </span>
  </button>
</template>

<script>
import { useAuthStore } from "~/stores/auth";
import { useContext } from "@nuxtjs/composition-api";
export default {
  props: {
    btn: {
      type: Object,
      default: () => ({
        body: "super btn",
      }),
    },
  },

  setup(props, { emit }) {
    // ---------------
    // Logout handling
    // ---------------
    const authStore = useAuthStore();
    const { deauthenticate } = authStore;
    const ctx = useContext();
    function onLogout() {
      console.log("(logout-btn) on logout");
      deauthenticate();
      emit("activation");
    }

    return {
      onLogout,
    };
  },
};
</script>

<style>
</style>