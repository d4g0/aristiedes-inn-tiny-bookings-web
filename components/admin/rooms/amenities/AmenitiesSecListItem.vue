<template>
  <div
    class="h-full border-2 border-gray-400 p-[20px] sm:p-[30px] rounded-[16px]"
  >
    <div class="h-full flex items-center justify-between">
      <!-- data -->
      <div class="max-w-[130px]">
        <h3 class="font-bold">
          {{ amenity.amenity }}
        </h3>
      </div>

      <!-- actions -->
      <div class="space-x-5">
        <button
          class="opacity-70 focus:opacity-100 focus-styles"
          @click="editReq"
        >
          <span class="border-b border-gray-400"> Editar </span>
        </button>
        <button
          class="opacity-70 focus:opacity-100 focus-styles"
          @click="delReq"
        >
          <span class="border-b border-gray-400"> Eliminar </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    amenity: {
      type: Object,
      default: () => ({
        id: 0,
        amenity: "",
      }),
    },
  },

  setup(props, { emit }) {
    function editReq() {
      emit("editReq", { id: props.amenity.id });
    }
    function delReq() {
      emit("delReq", { id: props.amenity.id });
    }

    return {
      editReq,
      delReq,
    };
  },
};
</script>

<style>
</style>