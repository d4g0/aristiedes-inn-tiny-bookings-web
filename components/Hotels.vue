<template>
  <div>
    <h1>Hotels</h1>
    <div v-if="loading">loading</div>
    <div v-if="error">
      {{ error }}
    </div>
    <ul>
      <li v-for="hotel in hotels" :key="hotel.id">
        <h3>
          {{ hotel.hotel_name }}
        </h3>
        <p>
          {{ hotel.id }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
// import { gql } from "graphql-tag";
import { onMounted, ref, watch } from "vue-demi";
import { useQuery, useQueryp } from "~/composables/useQuery.js";
const gql = String.raw;
export default {
  setup() {
    const { result, loading, error } = useQueryp(gql`
      query {
        hotels {
          id
          hotel_name
        }
      }
    `);
    var hotels = ref([]);
    watch(result, (n_res, olV) => {
      if (n_res?.data?.hotels) {
        hotels.value = n_res?.data?.hotels;
      }
    });

    onMounted(() => {
      // setTimeout(() => {
      //   console.log("On Mounted");
      //   console.log(result.value);
      //   console.log(hotels.value);
      // }, 2 * 1000);
    });

    return {
      hotels,
      loading,
      error,
    };
  },
};
</script>
