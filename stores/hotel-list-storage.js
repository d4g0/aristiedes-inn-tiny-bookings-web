import { defineStore } from 'pinia';
import { ref } from '@nuxtjs/composition-api';
import { search } from '~/utils';

export const useHotelListStore = defineStore('HOTELS_LIST_STORE', () => {

    const hotels = ref([]);


    function populateHotels(list = []) {
        hotels.value = list;
    }


    function getHotelById(id) {
        const pos = search(hotels.value, id);
        if (pos == -1) {
            return null;
        }

        return hotels.value[pos];
    }





    return {
        // data
        hotels,
        // fn
        populateHotels,
        getHotelById,
    }
})



