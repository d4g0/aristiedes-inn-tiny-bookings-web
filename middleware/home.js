import { useAuthStore } from "~/stores/auth";

export default function ({ redirect, $pinia, localePath }) {

    const authStore = useAuthStore($pinia);
    const { isAdmin } = authStore;
    if (isAdmin()) {
        redirect(200, localePath('/admin'))
    }

}