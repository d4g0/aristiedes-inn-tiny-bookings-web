import { ref } from "@nuxtjs/composition-api";

/**
 * Sets up a lazy graphql query call
 * @param {String} query 
 * @param {Object} variables 
 * @returns 
 */
export function useLazyQuery(query, variables = {}) {
    var loading = ref(false);
    var result = ref(null);
    var error = ref(null)
    var queryVariables = variables;

    async function load() {
        loading.value = true;
        try {
            var res = await fetch(
                process.env.API_URL,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ query, variables: queryVariables })
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

    function refetch() {
        loading.value = true;
        result.value = null;
        error.value = null;
        load()
    }

    function setVariables(variables) {
        queryVariables = variables;
    }
    return {
        // state
        loading,
        // data
        result,
        error,
        // fn
        refetch,
        load,
        setVariables,
    }

}