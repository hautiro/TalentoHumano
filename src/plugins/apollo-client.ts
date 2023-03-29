import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  from,
  HttpLink,
  DefaultOptions,
} from "@apollo/client/core";
import { get_token } from "../utils/local-data";

const additiveLink = from([
  new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }: any) => ({
      headers: {
        ...headers,
        authorization: get_token() ? `Bearer ${get_token()}` : null,
      },
    }));
    return forward(operation); // Go to the next link in the chain. Similar to `next` in Express.js middleware.
  }),
  new HttpLink({ uri: "http://10.0.5.2:3000/graphql" }),
]);

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

export const apolloClient = new ApolloClient({
  link: additiveLink,
  cache: new InMemoryCache(),
  defaultOptions,
});
