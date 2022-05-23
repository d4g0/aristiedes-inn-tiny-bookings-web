<template>
  <div class="">
    <h2 class="font-bold text-3xl md:text-5xl">
      {{ $t("home.basket_exp.rooms_key") }}
    </h2>
    <ul class="mt-[20px]">
      <li v-for="item in items" :key="item.id">
        <CheckOutRoomItem
          :room_item="item"
          @[REMOVAL_REQUEST]="onRemovalRequest"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useBasketStore } from "~/stores/basket-storage";
import CheckOutRoomItem from "~/components/checkout/CheckOutRoomItem.vue";
import { EVENTS } from "~/db/index";
import { useListingsStore } from "~/stores/listings-storage";

export default {
  components: {
    CheckOutRoomItem,
  },
  setup() {
    const basketStore = useBasketStore();
    const { items } = storeToRefs(basketStore);
    const { removeFromBasket, getItemByID } = basketStore;
    const REMOVAL_REQUEST =
      EVENTS.CLIENT.BASKET.BASKET_EXPANSION.ROOM_ITEM.REMOVAL_REQUEST;

    //

    const listingsStore = useListingsStore();
    const { addListing } = listingsStore;

    // mutations
    function onRemovalRequest(id) {
      const tempListing = getItemByID(id);
      addListing(tempListing);
      removeFromBasket(id);
    }
    //
    return { items, REMOVAL_REQUEST, onRemovalRequest };
  },
};
</script>

<style>
</style>