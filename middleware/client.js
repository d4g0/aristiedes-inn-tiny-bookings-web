import { storeToRefs } from "pinia";
import { USER_ROLES } from "~/db";
import { useAuthStore } from "~/stores/auth";


export default function ({ redirect, $pinia, localePath }) {
    // console.log('im a home middleware')
    // console.log(`localePath found: ${localePath}`)
    // console.log(localePath('/admin'))

    const authStore = useAuthStore($pinia);
    const { authenticate, deauthenticate, isAuthenticated } = authStore;
    const { user } = storeToRefs(authStore);
    if (!isAuthenticated) {
        return redirect(200, localePath('/login'))
    }

    // case authclient ignore


    // case admin, redirect them to his home dash
    const user_role = user.value?.user_role;
    const isClient = USER_ROLES.CLIENT == user_role;
    if (!isClient) {
        return redirect(200, localePath('/login'))
    }

}