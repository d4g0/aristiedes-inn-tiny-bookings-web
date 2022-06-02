<template>
  <div>
    <SubHeading text="Aemnidades" />
    <form @submit.prevent="onFormSubmit" class="mt-[30px]">
      <ul>
        <li v-for="amenity in reactiveAmenities" :key="amenity.id">
          <div class="w-full">
            <input
              :id="`amenity_${amenity.id}`"
              v-model="amenity.checked"
              type="checkbox"
            />
            <label :for="`amenity_${amenity.id}`" class="ml-4">
              {{ amenity.amenity }}
            </label>
          </div>
        </li>
      </ul>

      <!-- submit -->
      <div class="mt-[40px] relative">
        <button
          class="
            rounded-[16px]
            p-3
            bg-black
            dark:bg-type-on-dark
            text-white
            dark:text-type-on-light
            w-full
            font-medium
            focus-styles focus:ring-offset-2
            hover:bg-brand
            dark:hover:bg-brand dark:hover:text-white
            disabled:bg-brand/60 disabled:cursor-not-allowed
          "
          :disabled="isSending"
          :class="{
            'opacity-70': isSending,
          }"
        >
          Actualizar
        </button>

        <!-- spinner -->
        <transition name="fade">
          <div
            v-if="isSending"
            class="
              absolute
              top-0
              left-0
              w-full
              h-full
              flex
              justify-start
              items-center
              pl-4
            "
          >
            <div
              class="
                spinner-border
                animate-spin
                inline-block
                w-8
                h-8
                border-4
                rounded-full
              "
              role="status"
            >
              <span class="sr-only">Cargando</span>
            </div>
          </div>
        </transition>
      </div>
    </form>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useRoomAmenitiesStore } from "~/stores/room-amenyties-storage";
import { inject, ref } from "@nuxtjs/composition-api";
import SubHeading from "../../global/SubHeading.vue";
import { updateARoomIsAmenities } from "~/querys/updateARoomIsAmenities";
import { smartQueryLoader } from "~/composables/useSmartQueryControler";
import { useToastStore } from "~/stores/toast-storage";
import { TOAST_TYPES } from "~/db";
export default {
  components: { SubHeading },
  props: {
    room: {
      type: Object,
      default: () => ({
        id: 0,
        room_amenities: [
          {
            id: 0,
            amenity: "foo",
          },
        ],
      }),
    },
  },

  setup(props) {
    const amenitiesStore = useRoomAmenitiesStore();
    const { amenities } = storeToRefs(amenitiesStore);
    const c1 = ref(false);

    // prepare  amenities to render
    const reactiveAmenities = ref([]);
    amenities.value.forEach((a) => {
      reactiveAmenities.value.push({
        ...a,
        checked: isCurrentlyEnableInRoom(a),
      });
    });
    // select room currents

    function isCurrentlyEnableInRoom(amenity) {
      const currentRoomAmenities = props.room.room_amenities;
      var isPresent = false;
      for (let i = 0; i < currentRoomAmenities.length; i++) {
        if (currentRoomAmenities[i].amenity_id == amenity.id) {
          isPresent = true;
          break;
        }
      }

      return isPresent;
    }

    // toast
    const toastStore = useToastStore();
    const { showToastWithText } = toastStore;

    // parent room load
    const loadRooms = inject("loadRooms");

    // api query
    //
    const {
      load: updateAmenities,
      loading: isSending,
      setVariables,
    } = smartQueryLoader(
      updateARoomIsAmenities,
      (_result) => {
        loadRooms();
        showToastWithText(TOAST_TYPES.success, "Amenidades actualizadas", true);
      },
      "updateARoomIsAmenities"
    );

    function onFormSubmit() {
      // console.log("onSubmit", "rams: ", reactiveAmenities.value);

      // hit api
      try {
        const variables = {
          input: {
            room_id: props.room.id,
            amenities_ids: reactiveAmenities.value
              .filter((a) => a.checked)
              .map((a) => a.id),
          },
        };
        setVariables(variables);
        updateAmenities();
      } catch (error) {
        console.log(error);
      }
    }

    return {
      c1,
      amenities,
      onFormSubmit,
      isSending,
      reactiveAmenities,
    };
  },
};
</script>

<style>
</style>