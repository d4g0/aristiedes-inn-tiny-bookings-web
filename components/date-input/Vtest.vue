<template>
  <v-date-picker
    v-model="range"
    is-range
    :update-on-input="false"
    :min-date="today"
  >
    <template v-slot="{ inputValue, inputEvents }">
      <div class="flex justify-center items-center gap-8">
        <!-- check in -->
        <div class="border border-gray-300 rounded-[14px] p-3">
          <label for="check-in" class="block text-lg font-medium"
            >Check in</label
          >
          <input
            :value="inputValue.start"
            v-on="inputEvents.start"
            name="check-in"
            class="mt-2 block border px-2 py-1 w-32 rounded focus-styles"
          />
        </div>

        <!-- check out -->
        <div class="border border-gray-300 rounded-[14px] p-3">
          <label for="check-out" class="block text-lg font-medium"
            >Check out</label
          >
          <input
            :value="inputValue.end"
            v-on="inputEvents.end"
            name="check-out"
            class="mt-2 block border px-2 py-1 w-32 rounded focus-styles"
          />
        </div>
      </div>
    </template>
  </v-date-picker>
</template>

<script>
import { getDatesRange } from "~/utils";

export default {
  data() {
    const { today, nextDay } = getDatesRange(3);
    return {
      range: {
        start: today,
        end: nextDay,
      },
      date: today,
      today,
    };
  },
};
</script>

<style>
</style>