import { useAuthStore } from "~/stores/auth";

export default function ({ redirect, $pinia, localePath }) {

    const authStore = useAuthStore($pinia);
    const { isAdmin } = authStore;
    if (isAdmin()) {
        // case client
        if(process.client){

            redirect(200, localePath('/admin'))
        }else{
            redirect(200, localePath('/admin_login'))
        }
    }

}