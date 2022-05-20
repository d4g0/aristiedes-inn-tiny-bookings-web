<template>
  <div class="">
    <h2 class="font-bold text-3xl md:text-5xl">
      {{ $t("home.basket_exp.rooms_key") }}
    </h2>
    <ul class="mt-[20px]">
      <li v-for="item in items" :key="item.id">
        <CheckOutRoomItem :room_item="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useBasketStore } from "~/stores/basket-storage";
import CheckOutRoomItem from "~/components/checkout/CheckOutRoomItem.vue";

export default {
  components: {
    CheckOutRoomItem,
  },
  setup() {
    const basketStore = useBasketStore();
    const { items } = storeToRefs(basketStore);

    return { items };
  },
};
</script>

<style>
</style>