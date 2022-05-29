<template>
  <div>
    <div class="flex items-center justify-between">
      <SubHeading text="Editar administradores" />
      <button
        aria-label="actualizar listado de hoteles"
        class="
          p-2
          rounded-lg
          hover:bg-gray-200
          focus-styles
          focus-visible:ring-brand
        "
        @click="loadAdmins"
      >
        <ReloadIcon />
      </button>
    </div>
    <ul
      v-if="admins.length"
      class="mt-[30px] space-y-4 md:grid md:grid-cols-2 md:space-y-0 md:gap-4"
    >
      <li v-for="admin in admins" :key="admin.id">
        <AdminListItem :admin="admin" @delete_request="onDellReq" />
      </li>
    </ul>

    <!-- no admins found -->
    <div
      v-else
      class="
        flex flex-col
        items-center
        justify-center
        opacity-60
        text-xl
        font-medium
        text-center
        py-[50px]
      "
    >
      <div v-if="isLoading">
        <p class="animate-pulse">Cargando</p>
      </div>

      <div v-else>
        <p>Todavía no hay administradores que editar.</p>
        <p>Cree uno para empezar.</p>
      </div>
    </div>

    <!-- dell hotel dialog  -->
    <div class="max-w-md">
      <transition name="fade">
        <DellAdminDialog
          v-if="dellDialogNeeded"
          @closeDialog="onHideDellDialogReq"
          :selectedAdminId="selectedAdminId"
        />
      </transition>
    </div>

    <div class="border-b border-gray-200 mt-[50px]"></div>
  </div>
</template>

<script>
import { inject, ref } from "@nuxtjs/composition-api";
import ReloadIcon from "~/components/icons/ReloadIcon.vue";
import SubHeading from "../global/SubHeading.vue";
import AdminListItem from "./AdminListItem.vue";
import DellAdminDialog from "~/components/admin/admin/DellAdminDialog.vue";
export default {
  components: {
    AdminListItem,
    SubHeading,
    ReloadIcon,
    DellAdminDialog,
    SubHeading,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    admins: {
      type: Array,
      default: () => [
        {
          id: 2,
          user_role: "FULL_ADMIN",
          email: "dago@gmail.com",
          admin_name: "dago",
          admin_description: "system creator",
          created_at: "2022-05-06 18:34:14",
        },
      ],
    },
  },

  setup() {
    const loadAdmins = inject("loadAdmins");
    const dellDialogNeeded = ref();
    const selectedAdminId = ref();
    function onHideDellDialogReq() {
      dellDialogNeeded.value = false;
    }

    function onDellReq(id) {
      selectedAdminId.value = id;
      dellDialogNeeded.value = true;
    }
    return {
      loadAdmins,
      dellDialogNeeded,
      onHideDellDialogReq,
      selectedAdminId,
      onDellReq,
    };
  },
};
</script>

<style>
</style>