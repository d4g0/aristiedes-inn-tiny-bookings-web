<template>
  <div class="px-10 py-10">
    <h1 class="text-2xl font-semibold">Hotels</h1>
    <div class="mt-5 mb-5">
      <button
        @click="makeRefetch"
        class="p-2 bg-gray-200 rounded-xl hover:gray-300 active:gray-300"
      >
        Refetch
      </button>
    </div>

    <div v-if="loading">loading</div>
    <div v-else-if="error">
      <pre>
        {{ error }}
      </pre>
    </div>
    <div v-else-if="graphqlError">
      <pre>
        {{ graphqlError }}
      </pre>
    </div>
    <ul v-else-if="hotels.length">
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
import { ref, watch } from "vue-demi";
import { useQuery } from "~/composables/useQuery.js";
import { gql } from "~/utils";
export default {
  setup() {
    const graphqlError = ref(null);
    const { result, loading, error, refetch } = useQuery(gql`
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
      if (n_res?.errors) {
        graphqlError.value = n_res.errors[0];
      }
    });

    function makeRefetch() {
      graphqlError.value = null;
      refetch();
    }

    return {
      hotels,
      loading,
      error,
      graphqlError,
      makeRefetch,
    };
  },
};
</script>
