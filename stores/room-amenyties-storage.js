import { defineStore } from 'pinia';
import { ref } from '@nuxtjs/composition-api';
import { search } from '~/utils';

export const useRoomAmenitiesStore = defineStore('ROOM_AMENITIES_STORE', () => {

    const amenities = ref([]);
    const localStorageRoomAmenitiesKey = 'room_amenities_storage';

    function populateRoomAmenities(list = []) {
        amenities.value = list;
        save();
    }


    function getRoomAmenityById(id) {
        const pos = search(amenities.value, id);
        if (pos == -1) {
            return null;
        }

        return amenities.value[pos];
    }


    function save() {
        if (!process.client) {
            return
        }

        localStorage.setItem(localStorageRoomAmenitiesKey, JSON.stringify(amenities));
    }

    function recoverRoomAmenities() {
        if (!process.client) {
            return
        }
        const rtStr = localStorage.getItem(localStorageRoomAmenitiesKey);
        if (rtStr) {
            amenities.value = JSON.parse(rtStr);
        }
    }



    return {
        // data
        amenities,
        // fn
        populateRoomAmenities,
        getRoomAmenityById,
        recoverRoomAmenities,
    }
})



