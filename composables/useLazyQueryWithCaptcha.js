import { ref } from "@nuxtjs/composition-api";

/**
 * Sets up a lazy graphql query call
 * @param {String} query 
 * @param {Object} variables 
 * @returns 
 */
export function useLazyQuery(query) {
    var loading = ref(false);
    var result = ref(null);
    var error = ref(null)
    var captchaResToken = ref('')
    var queryVariables = {};




    async function load() {

        loading.value = true;
        result.value = null;
        error.value = null;
        try {
            var res = await fetch(
                process.env.API_URL,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "X-Captcha": captchaResToken.value
                    },
                    body: JSON.stringify({ query, variables: queryVariables }),
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


    function setVariables(variables) {
        queryVariables = variables;
    }

    function setToken(token = '') {
        captchaResToken.value = token;
    }

    return {
        // state
        loading,
        // data
        result,
        error,
        // fn
        load,
        setVariables,
        setToken,
    }

}
