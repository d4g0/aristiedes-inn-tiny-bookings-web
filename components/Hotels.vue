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
import { computed, onMounted } from "vue-demi";
import { useQuery } from "~/composables/useQuery.js";

export default {
  setup() {
    const { result, loading } = useQuery(gql`
      query {
        hotels {
          id
          hotel_name
        }
      }
    `);

    onMounted(() => {
      console.log("On Mounted");
      setTimeout(() => {
        console.log({
          hLength: hotels.value.length,
          hotels: hotels.value,
        });
      }, 1 * 1000);
    });
  },
};
</script>
