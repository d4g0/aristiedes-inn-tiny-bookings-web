import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { provideApolloClient } from "@vue/apollo-composable";
import fetch from 'cross-fetch';
// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:3010/graphql',
    fetch
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})



// nuxt plugin
export default function (ctx, inject) {
    // Doing something with nuxtApp
    provideApolloClient(apolloClient);
}
