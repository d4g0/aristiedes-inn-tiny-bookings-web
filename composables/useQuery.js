import { ref } from "vue-demi";

export function useQuery(query, variables = {}) {
    var loading = ref(true);
    var result = ref(null);
    var error = ref(null)

    hit();

    function hit() {
        fetch(
            process.env.API_URL,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query, variables })
            }
        ).then(res => {

            // console.log(res);
            
            return res.json();

        }).then(data => {

            result.value = data;
            loading.value = false;

        }).catch(e => {
            loading.value = false;
            error.value = e;
        })
    }

    function refetch() {
        loading.value = true;
        result.value = null;
        error.value = null;
        hit()
    }
    return {
        loading,
        result,
        error,
        refetch
    }

}