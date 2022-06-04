<template>
  <form>
    <!-- user role -->
    <div class="mt-4">
      <label for="hotel_selector" class="label pl-2">
        Trabajando en el hotel:
      </label>
      <select
        name="hotel_selector"
        id="hotel_selector"
        class="
          w-full
          input-field
          focus-effect
          border-gray-800/40 border
          focus:ring-brand
        "
        @change="onChange"
      >
        <option value="" disabled selected>Por favor seleccione</option>
        <option
          v-for="hotel in hotels"
          :key="hotel.id"
          :value="hotel.id"
          :id="`hotel_selector_option_${hotel.id}`"
          :selected="selectedHotelId === +hotel.id"
        >
          {{ hotel.hotel_name }} ( Id: {{hotel.id}})
        </option>
      </select>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    hotels: {
      type: Array,
      default: () => [
        {
          id: 0,
        },
      ],
    },
    selectedHotelId: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    function onChange(evt) {
      emit("hotel_seleted", { id: +evt.target.value });
    }

    // // select first as default
    // async function selectFirst() {
    //   // let fetch happen
    //   await wait(0.3);
    //   const firstHotel = props.hotels.length ? props.hotels[0] : null;
    //   if (!firstHotel) {
    //     return;
    //   }
    //   const optionId = `hotel_selector_option_${firstHotel.id}`;
    //   const option = document.getElementById(optionId);
    //   option.selected = true;
    // }

    // function mountSec() {
    //   if (!process.client) {
    //     return;
    //   }

    //   //   selectFirst();
    // }

    // onMounted(mountSec);

    return {
      onChange,
    };
  },
};
</script>

<style>
</style>