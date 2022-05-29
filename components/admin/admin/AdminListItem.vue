<template>
  <div
    class="h-full border-2 border-gray-400 p-[20px] sm:p-[30px] rounded-[16px]"
  >
    <!-- body -->
    <div class="flex items-center justify-between">
      <!-- data  -->
      <div>
        <!-- name -->
        <h3 class="font-bold text-lg">
          {{ admin.admin_name }}
        </h3>
        <!-- admin type -->
        <div class="text-sm mt-2">
          <span class="block">
            {{ admin.user_role }}
          </span>

          <!-- email -->
          <span class="block">
            {{ admin.email }}
          </span>
        </div>
      </div>

      <!-- actions -->
      <div>
        <!-- dell -->
        <button>
          <span class="border-b border-gray-400"> Eliminar </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    admin: {
      type: Object,
      default: () => ({
        id: 2,
        user_role: "FULL_ADMIN",
        email: "dago@gmail.com",
        admin_name: "dago",
        admin_description: "system creator",
        created_at: "2022-05-06 18:34:14",
      }),
    },
  },
};
</script>

<style>
</style>