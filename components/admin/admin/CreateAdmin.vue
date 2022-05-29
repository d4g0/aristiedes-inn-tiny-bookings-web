<template>
  <div>
    <SubHeading text="Crear un administrador" />
    <div class="w-full max-w-md">
      <CreateAdminForm
        @[CREATE_ADMIN]="onCreateReq"
        class="mt-[30px]"
        :roles="roles"
      />
      <div class="border-b border-gray-200 mt-[50px]"></div>
    </div>
  </div>
</template>

<script>
import SubHeading from "../global/SubHeading.vue";
import CreateAdminForm from "./CreateAdminForm.vue";
import { onMounted, ref, watch } from "@nuxtjs/composition-api";
import { createAdminQuery } from "~/querys/createAdmin";
import { useLazyQuery } from "~/composables/useLazyAuthQuery";
import { API_ERRORS, EVENTS, TOAST_TYPES } from "~/db";
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";
import { useToastStore } from "~/stores/toast-storage";
import { getUserRolesQuery } from "~/querys/getUserRolesQuery";
const UNAUTHENTICATED = API_ERRORS.UNAUTHENTICATED;
const DB_UNIQUE_CONSTRAINT_ERROR = API_ERRORS.DB_UNIQUE_CONSTRAINT_ERROR;
const FORBIDDEN = API_ERRORS.FORBIDDEN;
const CREATE_ADMIN = EVENTS.ADMIN.ADMINS.CREATE_ADMIN;

export default {
  components: { SubHeading, CreateAdminForm },
  setup() {
    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;
    //

    // roles
    const roles = ref([]);
    const {
      result: user_roles_result,
      error: user_roles_error,
      setToken: setToken_in_user_role,
      load: loadUserRoles,
    } = useLazyQuery(getUserRolesQuery);

    //

    function mountSec() {
      setToken_in_user_role(token.value);
      loadUserRoles();
    }

    onMounted(mountSec);

    // result
    watch(user_roles_result, (newR) => {
      // console.log("(watch/result change)");
      // console.log({ result: result.value });
      if (newR?.data?.getUserRoles) {
        // success
        roles.value = newR?.data?.getUserRoles;
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
            "No tiene permiso para realizar esta operación",
            true
          );
        }

        // Duplicated
        if (error?.extensions?.exception?.code == DB_UNIQUE_CONSTRAINT_ERROR) {
          showToastWithText(
            TOAST_TYPES.error,
            "Fallo al crear el admin porque ya existe uno con ese nombre o email",
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
    watch(user_roles_error, (newE) => {
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

    //

    // admin

    // auth store
    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);
    //
    // api call
    const { loading, result, error, load, setVariables, setToken } =
      useLazyQuery(createAdminQuery);
    // creation
    // result
    watch(result, (newR) => {
      // console.log("(watch/result change)");
      // console.log({ result: result.value });
      if (newR?.data?.createAdmin) {
        // success
        console.log("Admin Created");
        // console.log(newR?.data?.createHotel);
        showToastWithText(
          TOAST_TYPES.success,
          `El admin: ${newR?.data?.createAdmin.admin_name} ha sido creado`,
          true
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
            "No tiene permiso para realizar esta operación",
            true
          );
        }

        // Duplicated
        if (error?.extensions?.exception?.code == DB_UNIQUE_CONSTRAINT_ERROR) {
          showToastWithText(
            TOAST_TYPES.error,
            "Fallo al crear el admin porque ya existe uno con ese nombre o correo",
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

    function onCreateReq(data) {
      console.log("attempting to create admin");
      console.log(data);

      var variables = {
        input: data,
      };
      setToken(token.value);
      setVariables(variables);
      load();
    }
    return {
      CREATE_ADMIN,
      loading,
      onCreateReq,
      roles,
    };
  },
};
</script>

<style>
</style>