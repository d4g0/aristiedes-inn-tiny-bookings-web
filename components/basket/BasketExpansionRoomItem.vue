<template>
  <div class="py-[8px] flex items-center justify-between">
    <!-- data -->
    <div class="flex items-center justify-between">
      <!-- pic -->
      <div
        class="
          h-[80px]
          w-[80px]
          bg-gray-200
          dark:bg-black
          rounded-[16px]
          overflow-hidden
          relative
        "
      >
        <LazyImage
          v-if="firstPicSrc.length"
          :src="mapedPictureSrc(firstPicSrc)"
          alt=""
          class="
            absolute
            top-0
            left-0
            w-full
            h-full
            object-cover
            rounded-[16px]
          "
          aria-hidden="true"
        />
        <div v-else class="w-full h-full flex items-center justify-center text-center">
          <p class="text-xs ">Imagen no disponible</p>
        </div>
      </div>
      <!-- info -->
      <div class="pl-[12px] sm:pl-[32px]">
        <h3 class="text-lg font-medium">
          {{ room_item.room_name }}
        </h3>
        <p class="text-sm font-medium">
          {{ nightPrice }}
        </p>
      </div>
    </div>

    <!-- remove btn -->
    <div>
      <button
        @click="$emit(REMOVAL_REQUEST, room_item.id)"
        class="opacity-70 focus:opacity-100 hover:opacity-100 focus-styles"
      >
        <span class="border-b border-gray-400"
          >{{ $t("home.basket_exp.room_item.removeBtn") }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { computed, useContext } from "@nuxtjs/composition-api";
import { EVENTS } from "~/db/index";
import LazyImage from "../global/LazyImage.vue";
export default {
  components: { LazyImage },
  props: {
    room_item: {
      type: Object,
      default: () => ({
        id: 1,
        hotel_id: 1,
        room_name: "Imperial #001",
        night_price: 200,
        capacity: 2,
        number_of_beds: 1,
        room_type_id: 1,
        room_type_key: "Matrimonial",
        room_pictures: [
          {
            room_picture_id: 1,
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

    const REMOVAL_REQUEST =
      EVENTS.CLIENT.BASKET.BASKET_EXPANSION.ROOM_ITEM.REMOVAL_REQUEST;
    // pictures
    function mapedPictureSrc(filename) {
      return `/${API_CONTENT_PATH}/img/${filename}`;
    }
    const firstPicSrc = computed(
      () => props?.room_item?.room_pictures[0]?.filename || ""
    );
    //

    // night price
    const nightPrice = computed(() =>
      formatNightPrice(props.room_item.night_price)
    );

    function formatNightPrice(price) {
      return `$ ${price} / night`;
    }
    //

    return {
      firstPicSrc,
      nightPrice,
      mapedPictureSrc,
      REMOVAL_REQUEST,
    };
  },
};
</script>

<style>
</style>