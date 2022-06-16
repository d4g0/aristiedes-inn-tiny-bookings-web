<template>
  <div class="">
    <div class="flex items-center justify-between">
      <SubHeading text="Calendario por habitación" />

      <button
        aria-label="actualizar calendario"
        class="
          p-2
          rounded-lg
          hover:bg-gray-200
          focus-styles
          focus-visible:ring-brand
        "
        @click="onLoadReq"
      >
        <ReloadIcon />
      </button>
    </div>

    <!-- loading -->
    <div
      v-if="isLoadingRoomLocks"
      class="flex items-center justify-center pb-5"
    >
      <p class="animate-pulse text-lg text-center">Cargando calendario</p>
    </div>

    <!-- room selector -->
    <div class="flex items-center gap-4 mt-[50px]">
      <label for="room_selector">Viendo habitación: </label>
      <select name="" id="room_selector" class="" v-model="selectedRoomId">
        <option disabled>Por favor seleccione</option>
        <option v-for="room in rooms" :key="room.id" :value="room.id">
          <span> {{ room.room_name }} </span>
          <!-- (id: {{ room.id }}) -->
        </option>
      </select>
    </div>

    <div
      class="
        mt-[30px]
        w-full
        lg:max-w-screen-xl
        min-h-[600px]
        h-[90vh]
        mx-auto
        flex flex-col
        items-center
      "
    >
      <TimeLine
        :roomLocks="currentRoomLocks"
        :selectedHotel="selectedHotel"
        v-if="isClient"
        @period_change="onPeriodChange"
      />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@nuxtjs/composition-api";
import SubHeading from "../global/SubHeading.vue";
import ReloadIcon from "~/components/icons/ReloadIcon.vue";
import { getAllRoomLocks } from "~/querys/getAllRoomLocks";
import { smartQueryLoader } from "~/composables/smartQueryLoader";

export default {
  components: {
    SubHeading,
    TimeLine: () => import("~/components-lazy/TimeLine.vue"),
    ReloadIcon,
  },
  props: {
    selectedHotel: {
      type: Object,
      default: () => ({
        id: 1,
        hotel_name: "Sloppy Joes Grand Hotel",
        maximun_free_calendar_days: 30,
        check_in_hour_time: "13:34:00",
        check_out_hour_time: "12:33:00",
        iana_time_zone: "America/Lima",
      }),
    },
    rooms: {
      type: Array,
      default: () => [
        {
          id: 0,
        },
      ],
    },
  },

  setup(props) {
    // const rlBR = arrangeByRoom(rls);

    const roomLocks = ref([]);
    const isClient = ref(false);

    const start_date_filter = ref("");
    const end_date_filter = ref("");

    const selectedRoomId = ref(null);

    const currentRoomLocks = computed(
      () => roomLocks.value[selectedRoomId.value] || []
    );

    onMounted(() => {
      if (process.client) {
        isClient.value = true;
        // console.log({ rlBR });
      }
    });

    //

    // query
    const {
      load: fetchRoomLocks,
      loading: isLoadingRoomLocks,
      setVariables,
    } = smartQueryLoader(
      getAllRoomLocks,
      (_rawRoomLocks) => {
        // console.log({
        //   byRoom: arrangeByRoom(_rawRoomLocks),
        //   mrg: mergeWithRoomsOulets(props.rooms, arrangeByRoom(_rawRoomLocks)),
        // });
        roomLocks.value = mergeWithRoomsOulets(
          props.rooms,
          arrangeByRoom(_rawRoomLocks)
        );

        // console.log('_raw load')
      },
      "getAllRoomLocks"
    );

    function onLoadReq() {
      // console.log("onLoadReq");

      const variables = {
        input: {
          start_date_filter: start_date_filter.value,
          end_date_filter: end_date_filter.value,
          hotel_id: props.selectedHotel.id,
        },
      };

      setVariables(variables);
      fetchRoomLocks();
    }
    //

    function onPeriodChange(payload) {
      // console.log("onPeriodChange");
      start_date_filter.value = hourTruncFormater(payload.periodStart);
      end_date_filter.value = hourTruncFormater(payload.periodEnd);
      onLoadReq();
    }

    return {
      roomLocks,
      isClient,
      onLoadReq,
      onPeriodChange,
      start_date_filter,
      end_date_filter,
      currentRoomLocks,
      isLoadingRoomLocks,
      selectedRoomId,
    };
  },
};

// helpers
function mergeWithRoomsOulets(rooms, roomLocksByRoom) {
  const merged = {};
  rooms.forEach((r) => {
    if (roomLocksByRoom[r.id]) {
      // use roomLocks if are any of that room
      merged[r.id] = roomLocksByRoom[r.id];
    } else {
      // use a empty page array if not
      merged[r.id] = [];
    }
  });

  return merged;
}

function arrangeByRoom(rl) {
  const rLByRoom = {};

  rl.forEach((rl) => {
    // init
    if (!rLByRoom[rl.room_id]) {
      rLByRoom[rl.room_id] = [];
    }

    rLByRoom[rl.room_id].push(rl);
  });

  return rLByRoom;
}

function hourTruncFormater(date = new Date()) {
  const datePart = date.toISOString().split("T")[0];
  const timePart = "00:00:00";
  return `${datePart} ${timePart}`;
}
</script>

<style>
</style>