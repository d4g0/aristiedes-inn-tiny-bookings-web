<template>
  <div>
    <transition name="fade">
      <div v-if="dialogNeeded">
        <Dialog
          :contentPath="contentPath"
          :contentText="contentText"
          @close="hideToast"
          class=""
        />
      </div>
    </transition>
  </div>
</template>

<script>
import Dialog from "~/components/admin/global/Dialog.vue";
import { storeToRefs } from "pinia";
import { useDialogStore } from "~/stores/dialog-storage";
export default {
  components: {
    Dialog,
  },

  setup() {
    const dialogStore = useDialogStore();
    const { dialogNeeded } = storeToRefs(dialogStore);

    return{
      dialogNeeded
    }
  },
};
</script>