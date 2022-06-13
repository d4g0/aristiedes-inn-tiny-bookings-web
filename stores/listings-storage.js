import { defineStore } from "pinia";
import { ref } from "@nuxtjs/composition-api";
import { remove, search } from "~/utils";

export const useListingsStore = defineStore("LISTINGS_STORE", () => {
  // the listings reference store
  const listings = ref([]);
  // the virtual listings reference (mutable)
  // const listingsList = ref([]);

  // expect a spec listings array (room items)
  function populateListings(list = []) {
    listings.value = list;
  }

  function removeListing(listingID) {
    remove(listings.value, listingID);
  }

  function addListing(listing) {
    // define...
    // listingsList
    listings.value.push(listing);
  }

  function getListingById(roomId) {
    const pos = search(listings.value, roomId);
    if (pos == -1) {
      return null;
    }
    return listings.value[pos];
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
    // fn
    populateListings,
    addListing,
    removeListing,
    getListingById,
  };
});
