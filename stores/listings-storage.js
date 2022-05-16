import { defineStore } from 'pinia';
import { ref } from '@nuxtjs/composition-api';

export const useListingsStore = defineStore('LISTINGS_STORE', () => {

    // the listings store
    const listings = ref([]);

    // expect a spec listings array (room items)
    function populateListings(list = []) {
        listings.value = list;
    }

    function removeListing(listingID) {
        remove(listings.value, listingID);
    }



    return {
        // data
        listings,
        // fn
        populateListings,
        removeListing,
    }
})



function search(collection = [{ id: 0 }], id) {
    var pos = -1;

    for (let i = 0; i < collection.length; i++) {
        if (collection[i].id == id) {
            pos = i;
            break;
        }
    }

    return pos;
}

function remove(collection = [], id) {
    const pos = search(persons, id);

    // not found
    if (pos == -1) {
        return
    }
    collection.splice(pos, 1);
}