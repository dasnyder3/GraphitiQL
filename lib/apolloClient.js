import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink, concat } from '@apollo/client';

let apolloClient;

function createApolloClient() {
  
  const httpLink = new HttpLink({ uri: 'https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/giraffeql-uzcoz/graphql' });

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
      headers: {
        // apiKey: 'pT04Iw08eVTqIVMFKR8WdmRgntnceIUCiRjVBgIL2rp9bFSxLFhCx1pflNoxUgNy',
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWFzX2Rld…zcyJ9.P_JCmVQRZhwnV6v4eEN-UiMxjXnHBjB5quiilui-ou0'
      }
    });

    return forward(operation);
  })

  return new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}