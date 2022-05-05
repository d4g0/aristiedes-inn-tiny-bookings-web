import { ref } from "vue-demi";

export default async function useQuery(query, variables = {}) {
    var loading = ref(false);
    var result = ref();

    try {

        var res = await fetch(
            process.env.API_URL,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application-json",
                },
                body: JSON.stringify({ query, variables })
            }
        );

        result.value = await res.json();
        loading.value = false;

    } catch (c_error) {
        loading.value = false;
        throw c_error;
    }
}