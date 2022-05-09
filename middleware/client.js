import { useAuthStore } from "~/stores/auth";


export default function ({ redirect, $pinia, localePath }) {
    const authStore = useAuthStore($pinia);
    const { isClient } = authStore;
    if (!isClient()) {
        return redirect(200, localePath('/login'))
    }

}