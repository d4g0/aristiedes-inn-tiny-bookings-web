import { useAuthStore } from "~/stores/auth";


export default function ({ redirect, $pinia, localePath }) {

    const authStore = useAuthStore($pinia);
    const { isFullAdmin } = authStore;

    if (!isFullAdmin()) {
        redirect(200, localePath('/admin'))
    }
}