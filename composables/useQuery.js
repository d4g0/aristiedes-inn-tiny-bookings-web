import { ref } from "vue-demi";

export async function useQuery(query, variables = {}) {

    console.log('API_URL: ', process.env.API_URL)
    console.log('Query: ', query)


    var result = null;

    try {

        var res = await fetch(
            process.env.API_URL,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query, variables })
            }
        );

        result = await res.json();
        loading.value = false;

    } catch (c_error) {
        loading.value = false;
        throw c_error;
    }


}

export function useQueryp(query, variables = {}) {
    var loading = ref(true);
    var result = ref(null);
    var error = ref(null)

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
        
        
        if (!res.ok) {
            throw new Error('Unable to fetch')
        }
        return res.json();

    }).then(data => {

        result.value = data;
        loading.value = false;
        
    }).catch(e => {
        loading.value = false;
        error.value = e;
    })

    return {
        loading,
        result,
        error
    }

}