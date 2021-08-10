import { ApolloClient, InMemoryCache } from "@apollo/client";

// export const client = new ApolloClient({
//     uri: 'http://localhost:4000',
//     cache: new InMemoryCache()
// });

export const client = new ApolloClient({
    uri: 'http://18.207.230.12:4000',
    cache: new InMemoryCache()
});