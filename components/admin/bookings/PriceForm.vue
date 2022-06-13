<template>
  <div>
    <SubHeading text="Precio total" />
    <div class="pl-2 mt-[30px] w-full max-w-[200px] overflow-x-auto">
      <div class="flex items-center justify-between">
        <span> Noches: </span>
        <span class="font-medium">
          {{ nights }}
        </span>
      </div>
      <ul class="mt-2">
        <li
          v-for="room in rooms"
          :key="room.id"
          class="flex items-center justify-between"
        >
          <span> {{ room.room_name }} : </span>
          <span class="font-medium"> $ {{ room.night_price }} </span>
        </li>
      </ul>
    </div>
    <form @submit.prevent="onSubmit" class="mt-[30px]">
      <!-- name -->
      <div class="mt-4">
        <label
          for="total_price"
          class="label pl-2"
          :class="{
            'opacity-60': isSending,
            'text-red-700': priceError,
          }"
        >
          Precio Total
        </label>
        <input
          type="number"
          inputmode="numeric"
          id="total_price"
          class="
            input-field
            focus-effect
            border-gray-800/40 border
            focus:ring-brand
          "
          :disabled="isSending"
          :class="{
            'opacity-60': isSending,
            'text-red-700 border-red-700 focus:ring-red-700': priceError,
          }"
          v-model="v.price.$model"
        />
        <transition name="fade">
          <div class="pl-2 mt-1 text-red-700 text-sm" v-if="priceError">
            <span aria-hidden="true">*</span>
            <span class="">
              Por favor introduzca un precio válido, al menos 1
            </span>
          </div>
        </transition>
      </div>

      <SubmitBtn class="mt-[30px]" submitText="Seleccionar" />
    </form>
  </div>
</template>

<script>
import { required, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { computed, ref, watch } from "@nuxtjs/composition-api";
import SubHeading from "../global/SubHeading.vue";
import SubmitBtn from "../global/SubmitBtn.vue";
export default {
  components: { SubHeading, SubmitBtn },
  props: {
    isSending: {
      type: Boolean,
      default: false,
    },
    basePrice: {
      type: Number,
      default: 1,
    },
    nights: {
      type: Number,
      default: 1,
    },
    rooms: {
      type: Array,
      default: () => [{ id: 0, night_price: 0, room_name: "foo" }],
    },
  },
  setup(props, { emit }) {
    const price = ref(props.basePrice);
    const utts = ref(false);

    const rules = {
      price: {
        required,
        minLengminValueth: minValue(1),
      },
    };
    const v = useVuelidate(rules, {
      price,
    });

    const priceError = computed(() => utts.value && v.value.price.$invalid);

    function onSubmit() {
      if (!utts.value) {
        utts.value = true;
      }

      if (!v.value.$invalid) {
        emit("submit", { price: price.value });
      }
    }

    watch(props, (nProps) => {
      price.value = props.basePrice;
    });

    return {
      onSubmit,
      priceError,
      v,
    };
  },
};
</script>

<style>
</style>