<template>
  <div>
    <div class="flex items-center justify-between">
      <SubHeading text="Edite las habitaciones" />
      <button
        aria-label="actualizar informacion"
        class="
          p-2
          rounded-lg
          hover:bg-gray-200
          focus-styles
          focus-visible:ring-brand
        "
        @click="loadRooms"
      >
        <ReloadIcon />
      </button>
    </div>

    <!-- list -->
    <RoomSecEditMenuList :rooms="rooms" :isLoading="loadingRooms" />
    
    <EndSecLine />
  </div>
</template>

<script>
import { onMounted, provide, ref, watch } from "@nuxtjs/composition-api";
import EndSecLine from "../../global/EndSecLine.vue";
import SubHeading from "../../global/SubHeading.vue";
import { smartQueryLoader } from "~/composables/useSmartQueryControler";
import { genRoomsQuery } from "~/querys/rooms";
import { wait } from "~/utils";
import RoomSecEditMenuList from "./RoomSecEditMenuList.vue";
import ReloadIcon from "~/components/icons/ReloadIcon.vue";
export default {
  components: { SubHeading, EndSecLine, RoomSecEditMenuList, ReloadIcon },
  props: {
    hotelId: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    //   rooms
    const rooms = ref([]);
    var roomsQuery = "";
    const {
      load: loadRooms,
      loading: loadingRooms,
      setQuery,
    } = smartQueryLoader(
      // graphql query
      roomsQuery,
      // result proccessing fn
      (_rooms) => {
        rooms.value = _rooms;
      },
      // graphql response result key
      "rooms"
    );
    provide("loadRooms", loadRooms);
    const hasLoadedFirstTime = ref(false);
    watch(props, (newProps) => {
      const newHotelId = newProps.hotelId;
      // let first load to mountSec fn
      if (!hasLoadedFirstTime.value) {
        return;
      }
      if (newHotelId || newHotelId === 0) {
        const newRoomsQuery = genRoomsQuery(newHotelId);
        setQuery(newRoomsQuery);
        loadRooms();
        console.log("rooms load hit on watcher");
      }
    });

    async function mountSec() {
      // make sure hotelId props is usefull
      if (props.hotelId || props.hotelId === 0) {
        const newRoomsQuery = genRoomsQuery(props.hotelId);
        setQuery(newRoomsQuery);
      } else {
        console.log("scheduling a wating");
        await wait(1);
        return mountSec();
      }

      // finally load
      hasLoadedFirstTime.value = true;
      loadRooms();
    }
    onMounted(mountSec);

    return {
      rooms,
      loadingRooms,
      loadRooms,
    };
  },
};
</script>

<style>
</style>