import { defineStore } from 'pinia';
import { ref } from '@nuxtjs/composition-api';

export const useDialogStore = defineStore('DIALOG_STORE', () => {

    const dialogNeeded = ref(false);
    const contentPath = ref("");
    const contentText = ref("");
    const action = ref(() => { });

    function showDialog(
        contentPathStr = "",
        actionFn,
        autohidable = false,
    ) {
        console.log(
            "showing Toast",
            "path:",
            contentPathStr,
            "type",
        );
        resetDialog();
        action.value = actionFn;
        dialogNeeded.value = false;
        contentPath.value = contentPathStr;
        dialogNeeded.value = true;

        if (autohidable) {
            setTimeout(() => {
                dialogNeeded.value = false;
            }, 10 * 1000);
        }
    }

    function showDialogWithText(
        contentTextStr = "",
        actionFn,
        autohidable = false
    ) {
        console.log(
            "showing Toast",
            "text:",
            contentTextStr,
            "type",
        );

        resetDialog();
        action.value = actionFn;
        dialogNeeded.value = false;
        contentText.value = contentTextStr;
        dialogNeeded.value = true;

        if (autohidable) {
            setTimeout(() => {
                dialogNeeded.value = false;
            }, 10 * 1000);
        }
    }

    function hideDialog() {
        dialogNeeded.value = false;
        resetDialog()
    }

    function resetDialog() {
        action.value = () => { };
        contentPath.value = "";
        contentText.value = ""
    }

    return {
        dialogNeeded,
        action,
        contentPath,
        showDialog,
        hideDialog,
        contentText,
        showDialogWithText,
    }
})

