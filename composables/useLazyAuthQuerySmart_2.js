import { ref, useContext } from "@nuxtjs/composition-api";
import { useAuthStore } from '~/stores/auth';
import { storeToRefs } from 'pinia'


/**
 * Sets up a lazy graphql query call
 * @param {Object} pinia 
 * @returns  The auth session aware query configurator function 
 */
export const useLazyQuery = (query, variables = {}) => {

    const ctx = useContext();
    const pinia = ctx.$pinia;

    // token auth
    const authStore = useAuthStore(pinia);
    const { token } = storeToRefs(authStore);

    // 
    var loading = ref(false);
    var result = ref(null);
    var error = ref(null)
    var queryVariables = variables;

    async function load() {
        loading.value = true;
        result.value = null;
        error.value = null;

        try {

            // fetch
            var res = await fetch(
                process.env.API_URL,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token.value}`
                    },
                    body: JSON.stringify({ query, variables: queryVariables }),
                    mode: 'cors'
                }
            );

            // error check
            if (!res.ok) {
                // console.log(res)
                if (res.status == 400) {
                    throw new BadInputError('Bad Input')
                }
                throw new Error('Bad Input');
            }

            // success
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

    return {
        // state
        loading,
        // data
        result,
        error,
        // fn
        load,
        setVariables,
    }

}


const BAD_INPUT_CODE = 'BAD_INPUT';

class BadInputError extends Error {
    constructor(message) {
        super(message);
        this.code = BAD_INPUT_CODE;
    }
}