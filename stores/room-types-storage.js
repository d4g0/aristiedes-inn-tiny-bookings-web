import { defineStore } from 'pinia';
import { ref } from '@nuxtjs/composition-api';
import { search } from '~/utils';

export const useRoomTypesStore = defineStore('ROOM_TYPES_STORE', () => {

    const roomTypes = ref([]);
    const localStorageRoomTypesKey = 'room_types_storage';

    function populateRoomTypes(list = []) {
        roomTypes.value = list;
        save();
    }


    function getRoomTypeById(id) {
        const pos = search(roomTypes.value, id);
        if (pos == -1) {
            return null;
        }

        return roomTypes.value[pos];
    }


    function save() {
        if (!process.client) {
            return
        }

        localStorage.setItem(localStorageRoomTypesKey, JSON.stringify(roomTypes));
    }

    function recoverRoomTypes() {
        if (!process.client) {
            return
        }
        const rtStr = localStorage.getItem(localStorageRoomTypesKey);
        if (rtStr) {
            roomTypes.value = JSON.parse(rtStr);
        }
    }



    return {
        // data
        roomTypes,
        // fn
        populateRoomTypes,
        getRoomTypeById,
        recoverRoomTypes,
    }
})



