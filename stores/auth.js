import { defineStore } from 'pinia';
import { ref } from '@nuxtjs/composition-api';
import { AUTH_STORAGE_KEY } from '~/db';
import { USER_ROLES } from "~/db";

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

        // handle redirections
        handleLoginRedirections(this.$nuxt)
    }


    function deauthenticate() {
        user.value = null;
        token.value = null;
        token_created_at.value = null;

        // wipe up localstorage
        localStorage.removeItem(AUTH_STORAGE_KEY);

        handleLogOutRedirections(this.$nuxt);
    }

    // in tab session only
    function authenticateLocal(auth = {
        user,
        token,
        token_created_at
    }) {

        user.value = auth.user;
        token.value = auth.token;
        token_created_at.value = auth.token_created_at;

        handleLoginRedirections(this.$nuxt);

    }

    function deauthenticateLocal() {
        user.value = null;
        token.value = null;
        token_created_at.value = null;

        handleLogOutRedirections(this.$nuxt);
    }

    /**
     * Assumes a user is authenticated
     */
    function handleLoginRedirections(nuxt) {
        console.log('hanling reirect login')
        // console.log(nuxt)
        // case is admin
        const user_role = user.value?.user_role;
        if ([USER_ROLES.BASIC_ADMIN, USER_ROLES.FULL_ADMIN].includes(user_role)) {
            console.log('(auth) admin detected redirecting to /admin')
            nuxt.redirect(200, nuxt.localePath("/admin"));
        } else if (user_role == USER_ROLES.CLIENT) {
            console.log('(auth) client detected redirecting to /')
            nuxt.redirect(200, nuxt.localePath("/"));
        }
    }


    function handleLogOutRedirections(nuxt) {
        console.log('hanling reirect logut')
        // always send to home
        nuxt.redirect(200, nuxt.localePath("/"));

    }


    function isAdmin() {
        // case no user
        if(!user.value){
            return false
        }
        // case user
        const user_role = user.value.user_role;
        const isAdmin = [
            USER_ROLES.BASIC_ADMIN, USER_ROLES.FULL_ADMIN
        ].includes(user_role);

        return isAdmin
    }


    function isClient() {
        // case no user
        if(!user.value){
            return false
        }
        // case user
        const user_role = user?.value.user_role;
        const isClient = USER_ROLES.CLIENT == user_role;

        return isClient;
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
        deauthenticateLocal,
        authenticateLocal,
        isAdmin,
        isClient
    }
})
