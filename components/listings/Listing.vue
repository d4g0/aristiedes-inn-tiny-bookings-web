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
        v-if="hasPicture"
        :src="pictureSrc"
        alt=""
        class="absolute top-0 left-0 w-full h-full object-cover rounded-[16px]"
        aria-hidden="true"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <p>Imagen no disponible</p>
      </div>
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
          <!-- list-disc -->
          <ul
            class="
              mt-[18px]
              grid grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-2
              gap-y-4
              gap-x-6
            "
          >
            <li v-for="amenity in amenities" :key="amenity.id" class="flex  items-start text-sm">
              <span aria-hidden="true"> • </span>
              <span class="ml-2 flex-shrink-0 w-full">
                {{ amenity.amenity }}
              </span>
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

  setup(props, rawCtx) {
    const ctx = useContext();
    const API_CONTENT_PATH = ctx.env.API_CONTENT_PATH;
    const { root } = rawCtx;

    // $t fn
    // console.log(ctx.root.$i18n.t);
    const nightStr = computed(() =>
      root.$i18n.t("home.listings.listing_unit.night")
    );

    const bedStr = computed(() =>
      root.$i18n.t("home.listings.listing_unit.bed")
    );

    const guestStr = computed(() =>
      root.$i18n.t("home.listings.listing_unit.guest")
    );

    // pictures
    const firstPicSrc = computed(
      () => props.listing?.room_pictures[0]?.filename || ""
    );

    function mapedPictureSrc(filename) {
      return `/${API_CONTENT_PATH}/img/${filename}`;
    }

    const pictureSrc = computed(() => mapedPictureSrc(firstPicSrc.value));

    const hasPicture = computed(() =>
      firstPicSrc.value.length ? true : false
    );

    //

    // night price
    const nightPrice = computed(() =>
      formatNightPrice(props.listing.night_price)
    );

    function formatNightPrice(price) {
      return `$ ${price} / ${nightStr.value}`;
    }
    //

    // beds
    const beds = computed(() => formatBeds(props.listing.number_of_beds));

    function formatBeds(beds) {
      var baseStr = bedStr.value;
      if (beds > 1) {
        baseStr = baseStr.concat("s");
      }

      return `${beds} ${baseStr}`;
    }

    //

    // capacity
    const capacity = computed(() => formatCapacity(props.listing.capacity));
    function formatCapacity(capacity) {
      var baseStr = guestStr.value;
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
      hasPicture,
      firstPicSrc,
      pictureSrc,
      nightPrice,
      beds,
      capacity,
      amenities,
      nightStr,
      // actions
      toogleDetailsNeeded,
      addRequest,
    };
  },
};
</script>

<style>
</style>