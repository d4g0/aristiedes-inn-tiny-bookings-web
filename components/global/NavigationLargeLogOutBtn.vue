<template>
  <div class="transition-all relative py-2">
    <button
      class="
        block
        font-medium
        text-opacity-80 text-gray-600 text-md
        hover:text-opacity-100 hover:bg-gray-200
        dark:hover:bg-gray-500
        px-2
        py-1
        rounded-xl
        focus-styles
      "
      @click="onLogout"
    >
      {{ $t(btn.i18nPath) || btn.body }}
    </button>
  </div>
</template>

<script>
import { useAuthStore } from "~/stores/auth";
export default {
  props: {
    btn: {
      type: Object,
      default: () => ({
        body: "super btn",
        i18nPath: "i18 values goes here",
      }),
    },
  },

  setup(props, { emit }) {
    // ---------------
    // Logout handling
    // ---------------
    const authStore = useAuthStore();
    const { deauthenticate } = authStore;
    function onLogout() {
      console.log("(logout-btn) on logout");
      deauthenticate();
    }

    return {
      onLogout,
    };
  },
};
</script>


