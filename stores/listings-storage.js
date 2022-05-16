import { defineStore } from 'pinia';
import { ref } from '@nuxtjs/composition-api';

export const useListingsStore = defineStore('LISTINGS_STORE', () => {

    // the listings reference store
    const listings = ref([]);
    // the virtual listings reference (mutable)
    const listingsList = ref([]);

    // expect a spec listings array (room items)
    function populateListings(list = []) {
        listings.value = list;
        listingsList.value = list;
    }

    function removeListing(listingID) {
        remove(listingsList.value, listingID);
    }

    function addListing(listingID){
        // define...
        // listingsList
    }

    // TODO
    /**
     * Define a computed listings variable to use for render, to be sorted, 
     * and modifiable as:
     * 
     ***`In Listins cmp`
     * In listings when user add to order should remove from listings results
     * 
     ***`In Basket`  
     *  When a user remove a offer|listing from the basket should be rendered back to the listings
     * 
     *** Define computed sortedListings(listings, order_by_key, order) for sorting
     * 
     */


    return {
        // data
        listings,
        listingsList,
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