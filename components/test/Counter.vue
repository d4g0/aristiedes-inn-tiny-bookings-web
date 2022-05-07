<template>
  <div>
    <h2 class="mt-10 text-lg font-medium">Base Counter</h2>
    <div class="mt-2 border py-8 rounded-lg">
      <div class="bg-gray-200 p-4 flex items-center justify-center">
        {{ counter.count }}
      </div>
      <div class="flex items-center justify-center">
        <button @click="increment1" class="mt-2 p-2 border rounded-lg">
          inc
        </button>
      </div>
    </div>

    <h2 class="mt-10 text-lg font-medium">Functional Counter</h2>
    <div class="mt-2 border py-8 rounded-lg">
      <div class="bg-gray-200 p-4 flex items-center justify-center">
        {{ count }}
      </div>
      <div class="flex items-center justify-center">
        <button @click="increment" class="mt-2 p-2 border rounded-lg">
          inc
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCounterStore } from "@/stores/counter";
import { useCounterStoreF } from "@/stores/counter-f";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const counter = useCounterStore();

    // counter.count++;
    // with autocompletion ✨
    // counter.$patch({ count: counter.count + 1 });
    // or using an action instead
    function increment1() {
      counter.increment();
    }

    const counterF = useCounterStoreF();
    const { increment } = counterF;
    const { count } = storeToRefs(counterF);
    return {
      counter,
      increment1,
      //
      counterF,
      count,
      increment,
    };
  },
};
</script>

<style></style>
