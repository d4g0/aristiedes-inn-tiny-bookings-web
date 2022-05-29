<template>
  <div>
    <!-- create  -->
    <CreateAdmin class="mt-[50px]" />
    <!-- admin list -->
    <AdminList :admins="admins" :isLoading="isLoading" class="mt-[50px]" />
  </div>
</template>

<script>
import { onMounted, provide, ref, watch } from "@nuxtjs/composition-api";
import { useLazyQuery } from "~/composables/useLazyAuthQuery";
import { getAdmins } from "~/querys/getAdmins";
import { useToastStore } from "~/stores/toast-storage";
import { API_ERRORS, TOAST_TYPES } from "~/db";
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";
import AdminList from "./AdminList.vue";
import CreateAdmin from "./CreateAdmin.vue";

const UNAUTHENTICATED = API_ERRORS.UNAUTHENTICATED;
const FORBIDDEN = API_ERRORS.FORBIDDEN;

export default {
  components: { AdminList, CreateAdmin },
  setup() {
    const admins = ref([]);
    // const isLoading = ref(false);

    const {
      loading: isLoading,
      result,
      error,
      load,
      setToken,
    } = useLazyQuery(getAdmins);

    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;

    // auth store
    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);

    // result
    watch(result, (newR) => {
      // console.log("(watch/result change)");
      // console.log({ result: result.value });
      if (newR?.data?.admins) {
        // success
        // console.log("admins loaded");
        // console.log(newR?.data?.admins);

        admins.value = newR?.data?.admins.map((a) =>
          Object.assign({}, a, { id: +a.id })
        );
        return;
      }

      // const temp_err = '';
      if (newR?.errors) {
        console.log("Api error");
        var error = newR.errors[0];
        console.log(error);
        // UNAUTHENTICATED
        if (error?.extensions?.code == UNAUTHENTICATED) {
          showToastWithText(
            TOAST_TYPES.error,
            "Su sessión ha expirado, vaya a login",
            true
          );
        }

        // FORBIDDEN
        // Duplicated
        if (error?.extensions?.code == FORBIDDEN) {
          showToastWithText(
            TOAST_TYPES.error,
            "No tiene permiso para realizar esta operación",
            true
          );
        }

        // errors
        return;
      }
    });
    // error
    watch(error, (newE) => {
      if (newE) {
        console.log("fetch error");
        console.log(newE);
        showToastWithText(
          TOAST_TYPES.error,
          "Fallo al contactar con el API",
          true
        );
      }
    });

    function loadAdmins() {
      setToken(token.value);
      load();
    }

    function mountedSec() {
      loadAdmins();
    }

    provide("loadAdmins", loadAdmins);

    onMounted(mountedSec);

    return {
      isLoading,
      admins,
    };
  },
};
</script>

<style>
</style>