<template>
  <div class="p-[20px] rounded-[8px] border border-gray-400">
    <div class="flex flex-col md:flex-row items-start justify-between">
      <!-- info -->
      <div class="w-full">
        <div class="">
          <div v-if="booking.is_cancel" class="mb-[10px] relative -ml-2">
            <span
              class="
                px-2
                py-1
                rounded-xl
                border-slate-400
                bg-slate-200
                font-medium
                text-sm
              "
            >
              Cancelada
            </span>
          </div>

          <h3 class="font-medium">
            <span class="opacity-60"> Id: </span>
            <span>
              {{ booking.id }}
            </span>
          </h3>
        </div>

        <div class="mt-[10px] text-sm flex flex-col gap-2">
          <!-- dates -->
          <div class="">
            <span class="block opacity-60"> Check in: </span>

            <span class="block font-medium capitalize">
              {{ localCheckInDate }}
            </span>
          </div>

          <div class="">
            <span class="block opacity-60"> Check out: </span>

            <span class="block font-medium capitalize">
              {{ localCheckOutDate }}
            </span>
          </div>

          <div class="">
            <span class="block opacity-60"> Cliente: </span>

            <span class="block font-medium capitalize overflow-x-auto">
              {{ booking.client.client_name }}
              {{ booking.client.client_last_name }}
            </span>
          </div>
        </div>

        <!-- details -->
        <div class="mt-[10px] text-sm flex flex-col gap-2" v-if="detailsNeeded">
          <!-- price -->
          <div class="">
            <span class="block opacity-60"> Total: </span>

            <span class="block font-medium capitalize">
              <span> $ </span>
              <span>
                {{ booking.total_price }}
              </span>
            </span>
          </div>
          <!-- rooms -->
          <div class="">
            <span class="block opacity-60"> Habitaciones: </span>
            <ul>
              <li v-for="room in booking.rooms" :key="room.id">
                <span aria-hidden="true"> • </span>
                <span>
                  {{ room.room_name }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- actions -->
      <div class="pt-[20px] md:pt-0 w-full">
        <div class="flex items-center justify-end w-full">
          <div class="flex gap-x-4">
            <button
              class="
                text-sm
                opacity-80
                font-medium
                hover:opacity-100
                focus-styles
              "
              @click="toogleDetails"
            >
              {{ detailsNeeded ? "Ocultar detalles" : "Ver detalles" }}
            </button>
            <button
              class="
                text-sm
                opacity-80
                font-medium
                hover:opacity-100
                focus-styles
              "
              v-if="!booking.is_cancel && cancelOption"
              @click="$emit('cancel_req', { id: booking.id })"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/composition-api";
import { isValidDate } from "~/utils";
import {
  from_utc_sql_fromat_to_local,
  getLocalTimeZone,
} from "~/utils/dateUtils";

export default {
  props: {
    booking: {
      type: Object,
      default: () => ({
        id: 9,
        hotel_id: 1,
        total_price: 200,
        start_date: "2022-06-14 00:00:00",
        end_date: "2022-06-15 00:00:00",
        is_cancel: false,
        created_at: "2022-06-13 03:28:13",
        client: {
          client_name: "Lolo ",
          client_last_name: "Zanchez de la Concepcion",
        },
        rooms: [
          {
            room_name: "Imperial #002",
            night_price: 200,
            capacity: 2,
            number_of_beds: 1,
            room_type_key: "Matrimonial",
          },
        ],
      }),
    },

    cancelOption: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const localTimeZone = getLocalTimeZone();

    const localCheckInDate = computed(() =>
      from_utc_sql_fromat_to_local(props.booking.start_date, localTimeZone)
    );

    const localCheckOutDate = computed(() =>
      from_utc_sql_fromat_to_local(props.booking.end_date, localTimeZone)
    );

    const detailsNeeded = ref(false);
    function toogleDetails() {
      detailsNeeded.value = !detailsNeeded.value;
    }
    return {
      //
      localCheckInDate,
      localCheckOutDate,
      detailsNeeded,
      toogleDetails,
    };
  },
};
</script>

<style>
</style>