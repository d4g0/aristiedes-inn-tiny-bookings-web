<template>
  <div>
    <ul v-if="admins.length">
      <li v-for="admin in admins" :key="admin.id">
        <AdminListItem :admin="admin" />
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
  </div>
</template>

<script>
import AdminListItem from "./AdminListItem.vue";
export default {
  components: { AdminListItem },
  props: {
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
};
</script>

<style>
</style>