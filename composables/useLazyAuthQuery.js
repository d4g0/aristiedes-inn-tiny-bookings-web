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
    var token = '';

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
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ query, variables: queryVariables }),
                    mode: 'cors'
                }
            );


            if (!res.ok) {
                console.log(res)
                if (res.status == 400) {
                    throw new BadInputError('Bad Input')
                }
                throw new Error('Fetch Error');
            }
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

    function setToken(t) {
        // console.log('setting token with: ' + t)
        token = t
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


const BAD_INPUT_CODE = 'BAD_INPUT';

class BadInputError extends Error {
    constructor(message) {
        super(message);
        this.code = BAD_INPUT_CODE;
    }
}