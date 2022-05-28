import { defineStore } from 'pinia';
import { ref } from '@nuxtjs/composition-api';

export const useCurrentHotelStore = defineStore('CURRENT_HOTEL_STORE', () => {

    const currentHotel = ref(null);
    const currentHotelLocalStorageKey = 'current_hotel_store'

    function selectHotel(hotel) {
        currentHotel.value = hotel;
        save()
    }


    function save() {
        if (!process.client) {
            return
        }
        localStorage.setItem(currentHotelLocalStorageKey, JSON.stringify(currentHotel.value));
    }

    function recoverCurrentHotelSession() {
        if (!process.client) {
            return
        }

        const rawData = localStorage.getItem(currentHotelLocalStorageKey);
        const hotel = JSON.parse(rawData);

        if (hotel?.id || hotel?.id === 0) {

            currentHotel.value = hotel;
        }
    }





    return {
        // data
        currentHotel,
        // fn
        selectHotel,
        recoverCurrentHotelSession,
    }
})



