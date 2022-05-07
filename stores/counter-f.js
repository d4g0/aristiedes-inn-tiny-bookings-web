import { defineStore } from 'pinia'
import { ref } from '@nuxtjs/composition-api'

export const useCounterStoreF = defineStore('counter_f', () => {
    const count = ref(0)
    function increment() {
        count.value++
    }

    return { count, increment }
})
