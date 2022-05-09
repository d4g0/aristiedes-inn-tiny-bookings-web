import { defineStore } from 'pinia';
import { ref } from '@nuxtjs/composition-api';
import { AUTH_STORAGE_KEY } from '~/db';

export const useAuthStore = defineStore(AUTH_STORAGE_KEY, () => {
    const user = ref(null);
    const token = ref(null);
    const token_created_at = ref(null);



    function isAuthenticated() {
        return user.value != null
    }

    function authenticate(auth = {
        user,
        token,
        token_created_at
    }) {

        user.value = auth.user;
        token.value = auth.token;
        token_created_at.value = auth.token_created_at;

        // persist
        localStorage.setItem(
            AUTH_STORAGE_KEY,
            JSON.stringify({
                user: user.value,
                token: token.value,
                token_created_at: token_created_at.value
            })
        )

    }

    function deauthenticate() {
        user.value = null;
        token.value = null;
        token_created_at.value = null;

        // wipe up localstorage
        localStorage.removeItem(AUTH_STORAGE_KEY)
    }


    return {
        // state
        user,
        token,
        token_created_at,
        // fn
        isAuthenticated,
        authenticate,
        deauthenticate,
    }
})
