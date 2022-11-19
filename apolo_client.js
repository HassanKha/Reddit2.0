
// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:5001/api/xrayed-crocodile",
    headers :{
        Authorization: `apikey ${process.env.STEPZEN_APIKEY}`
    } ,
    cache: new InMemoryCache(),
});

export default client;