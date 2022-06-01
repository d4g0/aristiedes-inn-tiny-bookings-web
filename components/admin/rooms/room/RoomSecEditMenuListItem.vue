<template>
  <div
    class="h-full border-2 border-gray-400 p-[20px] sm:p-[30px] rounded-[16px]"
  >
    <div class="h-full flex items-center justify-between">
      <!-- data -->
      <div class="max-w-[130px]">
        <h3 class="font-bold">
          {{ room.room_name }}
        </h3>

        <div class="text-xs mt-2">
          <span class="block border-b border-gray-200 py-2">
            <span class="opacity-50"> Id: </span>
            <span>
              {{ room.id }}
            </span>
          </span>

          <p
            v-if="room.room_type_key"
            class="block border-b border-gray-200 py-2"
          >
            <span class="opacity-50"> Tipo: </span>

            <span>
              {{ room.room_type_key }}
            </span>
          </p>
        </div>
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
    room: {
      type: Object,
      default: () => ({
        id: 1,
        hotel_id: 1,
        room_name: "room foo",
        night_price: 100,
        capacity: 2,
        number_of_beds: 1,
        created_at: '"2022-05-06 18:35:45"',
        room_type_id: 1,
        room_type_key: "foo-room-type",
        room_pictures: [
          {
            room_picture_id: 1,
            filename: "pic.jpg",
          },
        ],
        room_amenities: [
          {
            amenity_id: 1,
            amenity: "foo-amenity",
          },
        ],
      }),
    },
  },
  setup(props, { emit }) {
    function editReq() {
      emit("editReq", { id: props.room.id });
    }
    function delReq() {
      emit("delReq", { id: props.room.id });
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