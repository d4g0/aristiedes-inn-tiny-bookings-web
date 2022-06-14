<template>
  <div>
    <!-- <v-date-picker :update-on-input="false"> </v-date-picker> -->
    <v-date-picker
      v-model="date"
      locale="es"
      mode="dateTime"
      color="gray"
      is24hr
      @input="onDateSelection"
      :minute-increment="5"
      :update-on-input="false"
    >
      <template v-slot="{ inputValue, inputEvents }">
        <input
          :value="inputValue"
          v-on="inputEvents"
          class="
            mt-2
            block
            border
            border-gray-400
            dark:border-opacity-20
            px-2
            py-1
            w-full
            rounded-[8px]
            focus-styles
            font-medium
            
            bg-surface-light
            dark:bg-surface-dark
          "
          :class="inputClasses"
        />
      </template>
    </v-date-picker>
  </div>
</template>

<script>
import { ref } from "@nuxtjs/composition-api";

export default {
  props: {
    calendarLength: {
      type: Number,
      default: 90,
    },
    initialDate: {
      type: Date,
      default: () => new Date(),
    },
    inputClasses: {
      type: String,
      default: "",
    },
  },

  setup(props, { emit }) {
    const date = ref(props.initialDate);

    function onDateSelection() {
      emit("DATES_SELECTED", {
        date: date.value,
      });
    }

    return {
      date,
      onDateSelection,
    };
  },
};
</script>

<style>
</style>