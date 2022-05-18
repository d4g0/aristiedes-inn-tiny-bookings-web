<template>
  <article class="h-full px-[30px] py-[24px] rounded-[16px] max-w-xl relative">
    <!-- pics border-->
    <div
      class="
        h-[200px]
        sm:h-[360px]
        lg:h-[260px]
        bg-gray-200
        dark:bg-black
        w-full
        rounded-[16px]
        overflow-hidden
        relative
      "
    >
      <LazyImage
        :src="mapedPictureSrc(firstPicSrc)"
        alt=""
        class="absolute top-0 left-0 w-full h-full object-cover"
        aria-hidden="true"
      />
    </div>

    <!-- listing details -->
    <div class="mt-[30px] pb-[60px]">
      <!-- title & price -->
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-xl">
          {{ listing.room_name }}
        </h2>
        <span class="font-medium">
          {{ nightPrice }}
        </span>
      </div>

      <!-- main info -->
      <div class="mt-[30px]">
        <h2 class="font-bold">
          {{ listing.room_type_key }}
        </h2>
        <ul class="mt-[18px] list-disc pl-[20px]">
          <li>{{ beds }}</li>
          <li>{{ capacity }}</li>
        </ul>
      </div>

      <!-- details expansion btn -->
      <div class="mt-[30px]">
        <button
          @click="toogleDetailsNeeded"
          class="opacity-70 focus:opacity-100 focus-styles"
        >
          <span class="border-b border-gray-400">
            {{
              detailsNeeded
                ? $t("home.listings.listing_unit.details.expanded")
                : $t("home.listings.listing_unit.details.not_expanded")
            }}
          </span>
        </button>
      </div>

      <!-- amenities info -->
      <transition name="fade">
        <div class="mt-[30px]" v-if="detailsNeeded">
          <h2 class="font-bold">Amenities</h2>
          <ul
            class="
              mt-[18px]
              list-disc
              pl-[20px]
              grid grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-2
              gap-x-2
            "
          >
            <li v-for="amenity in amenities" :key="amenity.id">
              {{ amenity.amenity }}
            </li>
          </ul>
        </div>
      </transition>
    </div>

    <!-- add to basket btn -->
    <div
      class="
        absolute
        bottom-0
        left-0
        w-full
        flex
        items-center
        justify-center
        px-[30px]
      "
    >
      <button
        class="
          rounded-[16px]
          p-3
          w-full
          font-medium
          focus-styles
          bg-black
          dark:bg-type-on-dark
          text-white
          dark:text-type-on-light
          focus-styles focus:ring-offset-2
          hover:bg-brand
          dark:hover:bg-brand dark:hover:text-white
        "
        @click="addRequest"
      >
        {{ $t("home.listings.listing_unit.addToBookingBtn") }}
      </button>
    </div>
  </article>
</template>

<script>
import { computed, ref, useContext } from "@nuxtjs/composition-api";
import { useListingsStore } from "~/stores/listings-storage";
import { useBasketStore } from "~/stores/basket-storage";
import LazyImage from "../global/LazyImage.vue";

export default {
  components: { LazyImage },
  props: {
    listing: {
      type: Object,
      default: () => ({
        id: 2,
        hotel_id: 1,
        room_name: "Imperial #002",
        night_price: 200,
        capacity: 2,
        number_of_beds: 1,
        room_type_id: 1,
        room_type_key: "Matrimonial",
        room_pictures: [
          {
            room_picture_id: 2,
            filename: "28.jpg",
          },
        ],
        room_amenities: [
          {
            amenity_id: 1,
            amenity: "TV",
          },
          {
            amenity_id: 2,
            amenity: "Aire Aconicionado",
          },
        ],
      }),
    },
  },

  setup(props) {
    const ctx = useContext();
    const API_CONTENT_PATH = ctx.env.API_CONTENT_PATH;

    // pictures
    function mapedPictureSrc(filename) {
      return `/${API_CONTENT_PATH}/img/${filename}`;
    }
    const firstPicSrc = computed(
      () => props?.listing?.room_pictures[0].filename
    );
    //

    // night price
    const nightPrice = computed(() =>
      formatNightPrice(props.listing.night_price)
    );

    function formatNightPrice(price) {
      return `$ ${price} / night`;
    }
    //

    // beds
    const beds = computed(() => formatBeds(props.listing.number_of_beds));

    function formatBeds(beds) {
      var baseStr = "bed";
      if (beds > 1) {
        baseStr = baseStr.concat("s");
      }

      return `${beds} ${baseStr}`;
    }

    //

    // capacity
    const capacity = computed(() => formatCapacity(props.listing.capacity));
    function formatCapacity(capacity) {
      var baseStr = "guest";
      if (capacity > 1) {
        baseStr = baseStr.concat("s");
      }

      return `${capacity} ${baseStr}`;
    }

    // expansion details
    const detailsNeeded = ref(false);
    function toogleDetailsNeeded() {
      detailsNeeded.value = !detailsNeeded.value;
    }
    //

    // amenities
    const amenities = computed(() => props.listing.room_amenities);
    //

    // mutations
    // listings deps
    const listingsStore = useListingsStore();
    const { removeListing } = listingsStore;

    const basketStore = useBasketStore();
    const { addToBasket } = basketStore;
    // addRequest
    function addRequest() {
      // console.log("(addRequest) room id: " + props.listing.id);
      removeListing(props.listing.id);
      addToBasket(props.listing);
    }

    //

    return {
      // state
      detailsNeeded,
      // computed
      firstPicSrc,
      mapedPictureSrc,
      nightPrice,
      beds,
      capacity,
      amenities,
      // actions
      toogleDetailsNeeded,
      addRequest,
    };
  },
};
</script>

<style>
</style>