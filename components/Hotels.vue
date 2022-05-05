<template>
  <div>
    <h1>Hotels</h1>
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
import { gql } from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { computed, onMounted } from 'vue-demi';
export default {
  setup() {
    const { result, loading, error, refetch } = useQuery(gql`
      query hotels {
        hotels {
          id
          hotel_name
        }
      }
    `);

    const hotels = computed(() => result.value?.hotels);

    onMounted(() => {
      console.log("On Mounted");
      setTimeout(() => {
        console.log({
          hLength: hotels.value.length,
          hotels: hotels.value,
        });
      }, 1 * 1000);
    });

    return {
      hotels,
    };
  },
};
</script>
