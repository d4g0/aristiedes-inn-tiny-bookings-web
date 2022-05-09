import { storeToRefs } from "pinia";
import { USER_ROLES } from "~/db";
import { useAuthStore } from "~/stores/auth";


export default function ({ redirect, $pinia, localePath }) {

    const authStore = useAuthStore($pinia);
    const { isAuthenticated } = authStore;
    const { user } = storeToRefs(authStore);
    if (!isAuthenticated) {
        return
    }



    // case is not an admin, redirect them to login
    const user_role = user.value?.user_role;
    const isAdmin = [
        USER_ROLES.BASIC_ADMIN, USER_ROLES.FULL_ADMIN
    ].includes(user_role);
    if (!isAdmin) {
        redirect(200, localePath('/login'))
    }
}