import { ApolloClient, InMemoryCache } from "@apollo/client";

// export const client = new ApolloClient({
//     uri: 'http://localhost:4000',
//     cache: new InMemoryCache()
// });

export const client = new ApolloClient({
    uri: 'http://34.204.82.162:4000',
    cache: new InMemoryCache()
});