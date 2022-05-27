<template></template>

<script>
import { storeToRefs } from "pinia";
import { useDialogStore } from "~/stores/dialog-storage";

export default {
  setup() {
    const dialogStore = useDialogStore();
    const { action,  } = storeToRefs(dialogStore);

    return {
      dialogNeeded,
    };
  },
};
</script>

<style>
</style>