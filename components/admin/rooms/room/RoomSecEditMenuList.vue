<template>
  <div>
    <!-- list -->
    <ul v-if="rooms.length" class="mt-[30px] grid gap-[20px] md:grid-cols-2">
      <li v-for="room in rooms" :key="room.id">
        <RoomSecEditMenuListItem
          :room="room"
          @editReq="onEditReq"
          @delReq="onDelReq"
        />
      </li>
    </ul>

    <!-- empty or loading -->
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
        <p>Todavía no hay habitaciones .</p>
        <p>Cree una para empezar.</p>
      </div>
    </div>

    <!-- edit -->
    <div class="max-w-md">
      <transition name="fade">
        <RoomSecEditMenuEditDialog
          v-if="editDialogNeeded"
          :room="selectedRoom"
        />
      </transition>
    </div>

    <!-- dell -->

    <!-- dell -->
    <div class="max-w-md">
      <transition name="fade">
        <RoomSecEditMenuDellDialog
          v-if="dellDialogNeeded"
          :room="selectedRoom"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { computed, provide, ref } from "@nuxtjs/composition-api";
import RoomSecEditMenuListItem from "./RoomSecEditMenuListItem.vue";
import useBobyOverflow from "~/composables/useBodyOverflow";
import RoomSecEditMenuEditDialog from "./RoomSecEditMenuEditDialog.vue";
import RoomSecEditMenuDellDialog from "./RoomSecEditMenuDellDialog.vue";
import { search } from "~/utils";
export default {
  components: {
    RoomSecEditMenuListItem,
    RoomSecEditMenuEditDialog,
    RoomSecEditMenuDellDialog,
  },
  props: {
    rooms: {
      type: Array,
      default: () => [
        {
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
        },
      ],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const selectedRoomId = ref();
    const selectedRoom = computed(() => getRoomById(selectedRoomId.value));
    const editDialogNeeded = ref(false);
    const dellDialogNeeded = ref(false);

    // dom overflow
    const { hideOverflow, showOverflow } = useBobyOverflow();

    // dialogs
    function onEditReq({ id }) {
      selectedRoomId.value = id;
      hideOverflow();
      editDialogNeeded.value = true;
    }
    function onDelReq({ id }) {
      selectedRoomId.value = id;
      hideOverflow();
      dellDialogNeeded.value = true;
    }

    function hideEditDialog() {
      showOverflow();
      editDialogNeeded.value = false;
    }
    function hideDelDialog() {
      showOverflow();
      dellDialogNeeded.value = false;
    }

    provide("hideEditDialog", hideEditDialog);
    provide("hideDelDialog", hideDelDialog);

    function getRoomById(id) {
      const pos = search(props.rooms, id);
      if (pos == -1) {
        return null;
      }

      return props.rooms[pos];
    }

    return {
      onEditReq,
      onDelReq,
      selectedRoomId,
      editDialogNeeded,
      dellDialogNeeded,
      selectedRoom,
    };
  },
};
</script>

<style>
</style>