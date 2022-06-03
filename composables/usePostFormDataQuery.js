import { ref } from "@nuxtjs/composition-api";

/**
 * Sets up a lazy graphql query call
 * @param {String} query 
 * @returns 
 */
export function usePostFormDataQuery(url) {
    var loading = ref(false);
    var result = ref(null);
    var error = ref(null)
    var queryFormData = null;

    async function load() {
        loading.value = true;
        result.value = null;
        error.value = null;
        try {
            var res = await fetch(
                url,
                {
                    method: 'POST',
                    body: queryFormData,
                    mode: 'cors'
                }
            );

            var data = await res.json();

            result.value = data;
            loading.value = false;

        } catch (e) {
            loading.value = false;
            error.value = e;
        }
    }


    function setFormData(formData) {
        queryFormData = formData;
    }
    return {
        // state
        loading,
        // data
        result,
        error,
        // fn
        load,
        setFormData,
    }

}
