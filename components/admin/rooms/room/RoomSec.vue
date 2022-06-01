<template>
  <div>
    <p>room sec</p>
    <pre>
      <code>
       isLoadingDeps: {{isLoadingDeps}}
      </code>
    </pre>
    <button @click="loadRoomDependencies">reload</button>
  </div>
</template>

<script>
import { inject } from "@nuxtjs/composition-api";
import { useLoadRoomDeps } from "~/composables/useLoadRoomDeps";
export default {
  // props: {
  //   isLoadingDeps: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },

  setup(props) {
    const {
      roomTypes,
      amenities,
      hotels,
      loadRoomDependencies,
      isLoadingDeps,
    } = useLoadRoomDeps();

    return {
      loadRoomDependencies,
      isLoadingDeps,
    };
  },
};
</script>

<style>
</style>