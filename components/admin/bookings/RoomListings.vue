<template>
  <div>
    <form @submit.prevent="onSubmit">
      <fieldset>
        <legend>Selecione las habitaciones a incluir:</legend>
        <div class="mt-[20px] grid gap-[20px] md:grid-cols-2 lg:grid-cols-3">
          <label
            v-for="room in reactiveRooms"
            :key="room.id"
            class="
              w-full
              border border-gray-400
              p-[20px]
              rounded-[16px]
              flex
              items-baseline
              justify-start
            "
          >
            <input
              type="checkbox"
              :id="`rooms_selector:${room.id}`"
              class="hover:cursor-pointer"
              v-model="room.checked"
            />

            <div class="ml-4">
              <span>
                {{ room.room_name }}
              </span>
              <div class="mt-[10px] text-sm">
                <p class="block border-b border-gray-200 py-2">
                  Camas: {{ room.number_of_beds }}
                </p>
                <p class="block border-b border-gray-200 py-2">
                  Capacidad: {{ room.capacity }}
                </p>
                <p class="block border-b border-gray-200 py-2">
                  Precio: {{ room.night_price }}
                </p>
              </div>
            </div>
          </label>
        </div>
      </fieldset>
      <div class="max-w-md">
        <submit-btn
          submitText="Seleccionar"
          v-if="reactiveRooms.length"
          class="mt-[30px]"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@nuxtjs/composition-api";
import SubmitBtn from "../global/SubmitBtn.vue";
import { useToastStore } from "~/stores/toast-storage";
import { TOAST_TYPES } from "~/db";
export default {
  components: { SubmitBtn },
  props: {
    rooms: {
      type: Array,
      default: () => [
        {
          id: 1,
          hotel_id: 1,
          room_name: "Imperial #001",
          night_price: 200,
          capacity: 2,
          number_of_beds: 1,
          room_type_id: 1,
          room_type_key: "Matrimonial",
        },
      ],
    },
  },

  setup(props, { emit }) {
    const reactiveRooms = ref([]);
    onMounted(() => {
      props.rooms.forEach((r) => {
        reactiveRooms.value.push({
          ...r,
          checked: false,
        });
      });
    });

    const selectedRooms = computed(() =>
      reactiveRooms.value.filter((r) => r.checked)
    );

    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;

    function onSubmit() {
      if (!selectedRooms.value.length) {
        return showToastWithText(
          TOAST_TYPES.error,
          "Error: debe seleccionar alguna habitación ",
          true
        );
      }
      // console.log("Selected Rooms: ", selectedRooms.value);
      emit("rooms_selected", selectedRooms.value);
    }

    return {
      reactiveRooms,
      onSubmit,
    };
  },
};
</script>

<style>
</style>