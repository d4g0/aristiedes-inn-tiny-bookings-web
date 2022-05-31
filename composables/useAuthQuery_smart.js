// asyncData({ $pinia }) {
//     const store = useStore($pinia)
//   },

import { useAuthStore } from '~/stores/auth';
import { storeToRefs } from 'pinia'

export const useQuery = (pinia) => (query) => {

    const authStore = useAuthStore(pinia);
    const { token } = storeToRefs(authStore);

    var _queryToken;

    /**
     * Executes the query
     */
    function load() {
        if (!_queryToken) {
            _queryToken = token.value;
        }


        console.log({ _queryToken })
    }

    return {
        load
    }
}