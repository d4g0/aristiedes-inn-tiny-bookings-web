<template>
  <div class="px-10 py-10">
    <h1 class="text-2xl font-semibold">Clients</h1>

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
    <ul v-else-if="clients.length" class="space-y-3">
      <li>
        <p>Total: {{ clientsCount }}</p>
      </li>
      <li
        v-for="client in clients"
        :key="client.id"
        class="block border rounded-xl p-3"
      >
        <h3 class="text-lg">
          {{ client.client_name }}
        </h3>
        <p class="text-sm font-medium">
          {{ client.id }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from "vue-demi";
import { useAuthQuery, useQuery } from "~/composables/useQuery";
import { gql } from "~/utils";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcl9yb2xlIjoiRlVMTF9BRE1JTiIsImlhdCI6MTY1MTc4MjIxMiwiZXhwIjoxNjUxNzg5NDEyfQ.SyJ0ljGSHbJSfzV7nEQ9sPahcbFymLM9v-tlAE5bjUc";
export default {
  setup() {
    const graphqlError = ref(null);
    const { result, loading, error, refetch } = useAuthQuery(
      gql`
        query getClients($input: PaginationInput!) {
          getClients(input: $input) {
            results {
              id
              client_name
              created_at
            }
            count
          }
        }
      `,
      {
        input: {
          start_date_filter: {
            year: 2022,
            month: 3,
            day: 18,
            hour: 0,
            minute: 0,
          },
          end_date_filter: {
            year: 2022,
            month: 5,
            day: 25,
            hour: 0,
            minute: 0,
          },
          page: 1,
        },
      },
      token
    );
    var clientsCount = ref(0);
    var clients = ref([]);
    watch(result, (n_res, olV) => {
      //   console.log(n_res);
      //   console.log(n_res.data.getClients);

      if (n_res?.data?.getClients) {
        clients.value = n_res.data.getClients;

        clientsCount.value = n_res.data.getClients.count;
        clients.value = n_res.data.getClients.results;
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
      clients,
      clientsCount,
      loading,
      error,
      graphqlError,
      makeRefetch,
    };
  },
};
</script>

<style></style>
