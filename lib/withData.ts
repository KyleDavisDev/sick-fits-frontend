import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import { endpoint } from "../config";
import { LOCAL_STATE_QUERY } from "../components/Cart/Cart";

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? endpoint : endpoint,
    request: async operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    },
    // local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            // read the cartOpen value from the cache
            const { cartOpen } = cache.readQuery({ query: LOCAL_STATE_QUERY });

            // flip cart state
            const data = {
              data: { cartOpen: !cartOpen }
            };

            // write to cache
            cache.writeData(data);

            return data;
          }
        },
        Query: {}
      },
      defaults: { cartOpen: false }
    }
  });
}

export default withApollo(createClient);
