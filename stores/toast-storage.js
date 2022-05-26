import { defineStore } from 'pinia';
import { ref } from '@nuxtjs/composition-api';

export const useToastStore = defineStore('TOAST_STORE', () => {

    const toastNeeded = ref(false);
    const toastType = ref("");
    const contentPath = ref("");
    const contentText = ref("");

    function showToast(
        toastTypeStr = "",
        contentPathStr = "",
        autohidable = false
    ) {
        console.log(
            "showing Toast",
            "path:",
            contentPathStr,
            "type",
            toastTypeStr
        );
        resetToast()
        toastNeeded.value = false;
        toastType.value = toastTypeStr;
        contentPath.value = contentPathStr;
        toastNeeded.value = true;

        if (autohidable) {
            setTimeout(() => {
                toastNeeded.value = false;
            }, 10 * 1000);
        }
    }

    function showToastWithText(
        toastTypeStr = "",
        contentTextStr = "",
        autohidable = false
    ) {
        console.log(
            "showing Toast",
            "text:",
            contentTextStr,
            "type",
            toastTypeStr
        );

        resetToast();
        toastNeeded.value = false;
        toastType.value = toastTypeStr;
        contentText.value = contentTextStr;
        toastNeeded.value = true;

        if (autohidable) {
            setTimeout(() => {
                toastNeeded.value = false;
            }, 10 * 1000);
        }
    }

    function hideToast() {
        toastNeeded.value = false;
        resetToast()
    }

    function resetToast() {
        toastType.value = "";
        contentPath.value = "";
        contentText.value = ""
    }

    return {
        toastNeeded,
        toastType,
        contentPath,
        showToast,
        hideToast,
        contentText,
        showToastWithText,
    }
})

