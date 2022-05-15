import { defineStore } from 'pinia';
import { ref } from '@nuxtjs/composition-api';

export const useToastStore = defineStore('TOAST_STORE', () => {

    const toastNeeded = ref(false);
    const toastType = ref("");
    const contentPath = ref("");

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

    function hideToast() {
        toastNeeded.value = false;
        toastType.value = "";
        contentPath.value = "";
    }


    return {
        toastNeeded,
        toastType,
        contentPath,
        showToast,
        hideToast,
    }
})

